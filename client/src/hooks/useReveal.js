import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = el.querySelectorAll ? el.querySelectorAll('.reveal') : [];
    // Also observe el itself if it has reveal class
    if (el.classList.contains('reveal')) observer.observe(el);
    targets.forEach(t => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}
