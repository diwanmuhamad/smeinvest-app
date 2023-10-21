import React from "react";
import styles from "../style";
import { Navbar, FirstDetailSME, Footer } from "../component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailSME = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary flex justify-center items-start relative`}>
        <div className={`${styles.boxWidth}`}>
          <FirstDetailSME />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DetailSME;
