import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { formatCurrency } from "../../utils/formatters";

export default function AnimatedNumber({ value, className = "" }) {
  const [isClient, setIsClient] = useState(false);

  // Spring physics for a smooth, premium rolling effect
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => {
    // Round to 2 decimal places to prevent layout jitter during animation
    const rounded = Math.round(current * 100) / 100;
    return formatCurrency(rounded);
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  if (!isClient)
    return <span className={className}>{formatCurrency(value)}</span>;

  return <motion.span className={className}>{display}</motion.span>;
}
