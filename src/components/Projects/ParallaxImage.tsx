"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxImage({ children }: any) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <div ref={ref} className="overflow-hidden rounded-3xl">
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}