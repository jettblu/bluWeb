"use client";

import { useAnimation, useInView, motion } from "framer-motion";
import { useRef, useEffect } from "react";
interface Props {
  children: any;
}
export default function EnterSlideSide(props: Props) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const { children } = props;
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -200 },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    // slide up when in view
    <motion.div
      animate={controls}
      ref={ref}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
