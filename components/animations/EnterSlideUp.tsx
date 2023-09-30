"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  children: any;
}
export default function EnterSlideUp(props: Props) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const { children } = props;
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 200 },
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
