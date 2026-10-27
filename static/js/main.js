/* Com1 — mobile nav, sticky header, scroll reveal, live product filter. */
(function () {
  "use strict";

  /* ------------------------------- mobile nav ---------------------------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------ sticky header -------------------------- */
  var header = document.getElementById("siteHeader");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------- reveal on scroll ------------------------ */
  function watchReveals(nodes) {
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-in"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    nodes.forEach(function (node) { observer.observe(node); });
  }

  watchReveals(Array.prototype.slice.call(document.querySelectorAll(".reveal")));

  /* ------------------------------ live filter ---------------------------- */
  var search = document.getElementById("productSearch");
  var grid = document.getElementById("productGrid");
  var countLabel = document.getElementById("resultCount");
  var emptyState = document.getElementById("emptyState");

  if (search && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var total = cards.length;

    var apply = function () {
      var term = search.value.trim().toLowerCase();
      var shown = 0;

      cards.forEach(function (card) {
        var haystack = (card.textContent + " " + (card.getAttribute("href") || "")).toLowerCase();
        var match = !term || haystack.indexOf(term) !== -1;
        card.style.display = match ? "" : "none";
        if (match) shown += 1;
      });

      if (countLabel) {
        countLabel.textContent =
          shown === total
            ? total + (total === 1 ? " product" : " products")
            : shown + " of " + total + " products";
      }

      if (emptyState) emptyState.hidden = shown !== 0;
    };

    search.addEventListener("input", apply);

    /* "/" focuses the filter, Escape clears it */
    document.addEventListener("keydown", function (event) {
      if (event.key === "/" && document.activeElement !== search) {
        event.preventDefault();
        search.focus();
      }
      if (event.key === "Escape" && document.activeElement === search) {
        search.value = "";
        apply();
        search.blur();
      }
    });
  }

  /* -------------------------------- sorting ------------------------------ */
  var sortSelect = document.getElementById("sortSelect");

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      var url = new URL(window.location.href);
      if (sortSelect.value) {
        url.searchParams.set("sort", sortSelect.value);
      } else {
        url.searchParams.delete("sort");
      }
      window.location.href = url.toString();
    });
  }

  /* --------------------- graceful product image fallback ----------------- */
  Array.prototype.slice
    .call(document.querySelectorAll(".media img"))
    .forEach(function (image) {
      image.addEventListener("error", function () {
        image.style.display = "none";
      });
      if (image.complete && image.naturalWidth === 0) {
        image.style.display = "none";
      }
    });
})();
