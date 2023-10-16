import React from "react";
import { motion } from "framer-motion";
import styles from "../style";
import { scrollvariants, slideIn } from "../const";

const FirstDetailSME = () => {
  return (
    <section id="home" className={`flex sm:py-6 py-6 `}>
      <motion.div
        variants={slideIn("left", "spring", 0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <h1 className={styles.heading2}>UMKM MAJU JAYA JAYA JAYA</h1>
        <img
          alt="Placeholder"
          class="block h-auto max-h-[300px] w-full rounded"
          src="https://picsum.photos/600/400/?random"
        />
      </motion.div>
    </section>
  );
};

export default FirstDetailSME;
