import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 30 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30 });

  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-app");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,input,[role='button'],label,select,textarea"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("cursor-none-app");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hover ? 64 : 36,
          height: hover ? 64 : 36,
          borderColor: hover ? "var(--primary)" : "rgba(255,255,255,0.6)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hover ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
    </>
  );
}
