import { cn } from "../lib/utils";
import { motion } from "motion/react";
import React from "react";

interface SlantedSectionProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  bgClassName?: string;
}

export const SlantedSection = ({
  children,
  className,
  reverse = false,
  bgClassName = "bg-white",
}: SlantedSectionProps) => {
  return (
    <section className={cn("relative py-24 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 z-0",
          bgClassName
        )}
      />
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
};

export const PowerButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-primary text-white font-display font-black uppercase px-5 py-2.5 text-sm rounded-[8px] transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,32,63,1)]",
        className
      )}
      {...props}
    >
      <span className="inline-block">{children}</span>
    </motion.button>
  );
};
