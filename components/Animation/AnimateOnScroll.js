"use client";
import { useEffect, useRef } from "react";

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  threshold = 0.1,
  delay = 500,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      },
      {
        threshold,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-animation ${animation}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
