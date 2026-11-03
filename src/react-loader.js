export function loadWhenNear(element, load, Observer) {
  if (!element) return;

  let started = false;
  let observer;

  function start() {
    if (started) return;
    started = true;
    observer?.disconnect();
    load();
  }

  if (Observer) {
    observer = new Observer(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { rootMargin: '900px 0px' },
    );
    observer.observe(element);
  } else {
    start();
  }
}

if (typeof document !== 'undefined') {
  loadWhenNear(
    document.querySelector('#react-specifications'),
    () => import('../vendor/react-ui.js').catch(() => {}),
    window.IntersectionObserver,
  );
}
