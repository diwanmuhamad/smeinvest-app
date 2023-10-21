import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../style";
import { Button, Modal } from "./index";
import { useParams } from "react-router-dom";
import { scrollvariants, slideIn } from "../const";
import axios from "axios";
import { padma, bali } from "../assets";

const FirstDetailSME = () => {
  const { id } = useParams();
  console.log(id);
  const [progress, setProgress] = useState("0%");
  const [showModal, setShowModal] = useState(false);
  const [sme, setSME] = useState(null);
  const [investment, setInvestment] = useState(null);

  const changeModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_BACKEND}/api/smes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setSME(res.data.data);
          axios
            .get(
              `${
                import.meta.env.VITE_REACT_SERVER_BACKEND
              }/api/smes/investment/${id}`
            )
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
                setInvestment(res.data.data);
                let progress =
                  (res.data.data.investments[0].current_investment /
                    res.data.data.investments[0].investment_target) *
                  100;
                setProgress(`${progress}%`);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section id="home" className={`flex sm:py-6 py-6 `}>
      <motion.div
        variants={slideIn("left", "spring", 0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <h1 className={styles.heading}>
          {id === "14" ? "UD Bali Jaya" : "UD Padma Sari"}
        </h1>
        <img
          alt="Placeholder"
          className="mx-auto block h-auto max-h-[300px] w-full max-w-[800px] rounded "
          src={sme && sme.photo}
        />
        <h2 className="mx-auto mt-6 text-gray-500 text-[30px]">
          Industry Type: {id === "14" ? "Otomotive" : "Food Stall"}
        </h2>
        <div className="mx-auto sm:w-2/6 xs:w-3/4 w-full h-[200px] rounded shadow-md mt-8 p-4 font-poppins cursor-auto flex flex-col justify-between bg-[#1D1F33]">
          <div className="text-[#797472]">
            <div className="flex justify-between">
              <h3>Investment</h3>
              <p className="text-[14px]">
                End:{" "}
                {investment &&
                  new Date(investment.investments[0].end_at)
                    .getDate()
                    .toString() +
                    "-" +
                    (
                      new Date(investment.investments[0].end_at).getMonth() + 1
                    ).toString() +
                    "-" +
                    new Date(investment.investments[0].end_at)
                      .getFullYear()
                      .toString()}
              </p>
            </div>

            <p className="text-[14px] mt-2">
              Target:{" "}
              {investment && investment.investments[0].investment_target}{" "}
              Satoshi
            </p>
            <p className="text-[14px]">
              Current:{" "}
              {investment && investment.investments[0].current_investment}{" "}
              Satoshi
            </p>
          </div>
          <div>
            <div className="w-full h-2 bg-[#f2dfd3] rounded-full">
              <div
                className={` h-full bg-[#B67465] rounded-full`}
                style={{ width: progress }}
              ></div>
            </div>
          </div>
          <Button onClick={changeModal} text={"Start Invest"}></Button>
        </div>
      </motion.div>
      {showModal && (
        <Modal setShowModal={setShowModal} wallet={sme && sme.wallet} />
      )}
    </section>
  );
};

export default FirstDetailSME;
