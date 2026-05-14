import { useRef, useState, useEffect } from 'react';

export default function FadeIn({ children, className = '', delay = 0, direction = 'up', style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offsets = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
    none: 'none',
  };

  const delaySec = typeof delay === 'number' && delay > 10 ? delay / 1000 : delay;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : offsets[direction] || offsets.up,
        transition: `opacity 0.8s ease ${delaySec}s, transform 0.8s ease ${delaySec}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
