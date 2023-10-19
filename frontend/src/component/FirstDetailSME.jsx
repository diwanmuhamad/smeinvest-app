import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../style";
import { Button, Modal } from "./index";
import { scrollvariants, slideIn } from "../const";

const FirstDetailSME = () => {
  const [progress, setProgress] = useState("w-[57.20%]");
  const [showModal, setShowModal] = useState(false);
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

        <div className="sm:w-2/6 xs:w-3/4 w-full h-[200px] rounded shadow-md mt-8 p-4 font-poppins cursor-auto flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <h3>Investment</h3>
              <p className="text-[14px]">End: 20 Oktober 2023</p>
            </div>

            <p className="text-[14px] mt-2">Target: 2000 Satoshi</p>
            <p className="text-[14px]">Current: 1000 Satoshi</p>
          </div>
          <div>
            <div className="w-full h-2 bg-blue-200 rounded-full">
              <div
                className={`${progress} h-full bg-blue-600 rounded-full`}
              ></div>
            </div>
          </div>
          <Button onClick={setShowModal} text={"Start Invest"}></Button>
        </div>
      </motion.div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </section>
  );
};

export default FirstDetailSME;
