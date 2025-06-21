import { useEffect } from 'react';

export function LandingEffects() {
  useEffect(() => {
    // Client-side only code
    if (typeof window === 'undefined') return;

    const wrapper = document.getElementById('aurora-wrapper');

    const handleMouseMove = (e: MouseEvent) => {
      if (wrapper) {
        const x = e.clientX;
        const y = e.clientY;
        wrapper.style.setProperty('--mouse-x', `${x}px`);
        wrapper.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    if (wrapper) {
      wrapper.addEventListener('mousemove', handleMouseMove);
    }

    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mousemove', handleMouseMove);
      }
      faders.forEach((fader) => {
        appearOnScroll.unobserve(fader);
      });
    };
  }, []);

  return null;
}
