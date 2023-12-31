import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
  initial?: object;
  animate?: object;
  transition?: object;
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}: AnimationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
