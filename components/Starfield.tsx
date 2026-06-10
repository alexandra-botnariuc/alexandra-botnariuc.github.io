import { useEffect, useRef } from "react";

/**
 * Lightweight animated starfield rendered on a <canvas>.
 * Parallax-drift with subtle twinkle. Respects prefers-reduced-motion.
 */
export function Starfield({ density = 0.00018 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; s: number; tw: number }[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        s: Math.random() * 0.03 + 0.005,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.y += st.s;
        if (st.y > h) st.y = 0;
        const flicker = 0.5 + 0.5 * Math.sin(st.tw + t * 0.02);
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${st.a * flicker})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduce) {
      // Single static frame
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${st.a})`;
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none opacity-70"
    />
  );
}
