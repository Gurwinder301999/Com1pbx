const BASE_PROFILE = Object.freeze({ rotateX: 0.6, rotateY: -2, intensity: 1 });
const COMPACT_PROFILE = Object.freeze({ rotateX: 0.3, rotateY: -1, intensity: 0.45 });

function profileFor(width) {
  return width < 760 ? COMPACT_PROFILE : BASE_PROFILE;
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function mediaMatcher(environment) {
  if (typeof environment.matchMedia !== 'function') return null;
  return environment.matchMedia.bind(environment);
}

function frameScheduler(environment) {
  const request =
    typeof environment.requestAnimationFrame === 'function'
      ? environment.requestAnimationFrame.bind(environment)
      : null;
  const cancel =
    typeof environment.cancelAnimationFrame === 'function'
      ? environment.cancelAnimationFrame.bind(environment)
      : null;
  return { request, cancel };
}

function defaultProperties(profile) {
  return {
    '--hero-rotate-x': `${profile.rotateX.toFixed(1)}deg`,
    '--hero-rotate-y': `${profile.rotateY.toFixed(1)}deg`,
    '--hero-shift-x': '0px',
    '--hero-shift-y': '0px',
    '--hero-glare-x': '72%',
    '--hero-glare-y': '38%',
  };
}

/**
 * Adds pointer-driven CSS 3D parallax to the hero. The layered CSS scene is
 * already visible without JavaScript; this controller only supplies the tilt.
 */
export function attachHeroDepth(hero, environment = globalThis) {
  if (
    !hero ||
    typeof hero.addEventListener !== 'function' ||
    typeof hero.removeEventListener !== 'function' ||
    typeof hero.getBoundingClientRect !== 'function' ||
    typeof hero.style?.setProperty !== 'function'
  ) {
    return null;
  }

  const matchMedia = mediaMatcher(environment);
  const pointerQuery = matchMedia?.('(pointer: fine)');
  const motionQuery = matchMedia?.('(prefers-reduced-motion: reduce)');
  const { request, cancel } = frameScheduler(environment);

  if (!pointerQuery) return null;

  let frame = null;
  let enabled = false;
  let destroyed = false;

  function currentProfile() {
    return profileFor(hero.getBoundingClientRect().width || Number.POSITIVE_INFINITY);
  }

  function applyDefaults() {
    for (const [name, value] of Object.entries(defaultProperties(currentProfile()))) {
      hero.style.setProperty(name, value);
    }
  }

  function clearFrame() {
    if (frame !== null) {
      cancel?.(frame);
      frame = null;
    }
  }

  function reset() {
    clearFrame();
    applyDefaults();
  }

  function update(event) {
    if (!enabled || destroyed || event?.pointerType === 'touch') return;
    if (!Number.isFinite(event?.clientX) || !Number.isFinite(event?.clientY)) return;

    const bounds = hero.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
    const y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
    const profile = profileFor(bounds.width);

    const apply = () => {
      frame = null;
      if (!enabled || destroyed) return;
      hero.style.setProperty(
        '--hero-rotate-y',
        `${(profile.rotateY + x * 6 * profile.intensity).toFixed(2)}deg`,
      );
      hero.style.setProperty(
        '--hero-rotate-x',
        `${(profile.rotateX - y * 4 * profile.intensity).toFixed(2)}deg`,
      );
      hero.style.setProperty(
        '--hero-shift-x',
        `${(-x * 10 * profile.intensity).toFixed(1)}px`,
      );
      hero.style.setProperty(
        '--hero-shift-y',
        `${(-y * 7 * profile.intensity).toFixed(1)}px`,
      );
      hero.style.setProperty('--hero-glare-x', `${(72 + x * 18).toFixed(1)}%`);
      hero.style.setProperty('--hero-glare-y', `${(38 + y * 18).toFixed(1)}%`);
    };

    clearFrame();
    if (request) {
      frame = request(apply);
    } else {
      apply();
    }
  }

  function enable() {
    if (enabled || destroyed) return;
    enabled = true;
    hero.addEventListener('pointermove', update);
    hero.addEventListener('pointerleave', reset);
    hero.addEventListener('pointercancel', reset);
  }

  function disable() {
    if (!enabled) return;
    enabled = false;
    hero.removeEventListener('pointermove', update);
    hero.removeEventListener('pointerleave', reset);
    hero.removeEventListener('pointercancel', reset);
    reset();
  }

  function handlePreferenceChange() {
    if (destroyed || !pointerQuery.matches || motionQuery?.matches) {
      disable();
      return;
    }
    if (!enabled) applyDefaults();
    enable();
  }

  pointerQuery.addEventListener?.('change', handlePreferenceChange);
  motionQuery?.addEventListener?.('change', handlePreferenceChange);
  applyDefaults();
  handlePreferenceChange();

  return {
    destroy() {
      destroyed = true;
      disable();
      pointerQuery.removeEventListener?.('change', handlePreferenceChange);
      motionQuery?.removeEventListener?.('change', handlePreferenceChange);
    },
  };
}

if (typeof document !== 'undefined') {
  attachHeroDepth(document.querySelector('.hero-3d'));
}
