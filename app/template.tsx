"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "@/lib/utils";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
      {children}
    </motion.div>
  );
}
