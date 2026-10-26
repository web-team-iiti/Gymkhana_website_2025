"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Scroll-triggered typing animation.
 *
 * Props:
 *  text            string to type
 *  as              tag to render ("h2", "p", "span", ...)
 *  speed           ms per character
 *  delay           ms to wait after entering the viewport
 *  once            only animate the first time it enters view
 *  amount          how much of the element must be visible (0-1)
 *  cursor          show the blinking caret while typing
 *  cursorClassName caret colour/style
 */
export default function TypeWriter({
  text,
  as: Tag = "span",
  className = "",
  speed = 17,
  delay = 0,
  once = true,
  amount = 0.5,
  cursor = true,
  cursorClassName = "bg-blue-600",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      setShowCursor(false);
      return;
    }
    if (!inView) {
      if (!once) {
        setCount(0);
        setShowCursor(false);
      }
      return;
    }

    let i = 0;
    let interval;
    let hideTimer;

    setCount(0);
    setShowCursor(false);

    const startTimer = setTimeout(() => {
      setShowCursor(true);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          hideTimer = setTimeout(() => setShowCursor(false), 1200);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [inView, text, speed, delay, once, reduceMotion]);

  return (
    <Tag ref={ref} className={className}>
      {/* real text for screen readers / SEO */}
      <span className="sr-only">{text}</span>

      {/* typed part */}
      <span aria-hidden="true">{text.slice(0, count)}</span>

      {/* caret sits at the typing position without taking up width */}
      {cursor && showCursor && (
        <span
          aria-hidden="true"
          className="relative inline-block h-[1em] w-0 align-text-bottom"
        >
          <motion.span
            className={`absolute left-[1px] top-0 h-full w-[2px] rounded-full ${cursorClassName}`}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        </span>
      )}

      {/* untyped part: invisible but still laid out, so nothing reflows */}
      <span aria-hidden="true" className="opacity-0">
        {text.slice(count)}
      </span>
    </Tag>
  );
}
