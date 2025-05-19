"use client";
import { motion } from "framer-motion";

const colors = ["#e01c49", "#f78a0e", "#16b2ec", "#e01c49"];

export const SpinnerOverlay = () => {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{
          rotate: 360,
          borderTopColor: colors,
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          },
          borderTopColor: {
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        style={{
          width: 40,
          height: 40,
          border: "4px solid transparent",
          borderTopColor: colors[0],
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
