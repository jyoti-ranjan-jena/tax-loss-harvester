import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap justify-center gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}