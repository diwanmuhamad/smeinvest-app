import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../style";
import { scrollvariants, slideIn } from "../const";
import { Card } from "./index";
import axios from "axios";

const FirstSME = () => {
  const [listSME, setListSME] = useState([]);
  const [listSMECopy, setListSMECopy] = useState([]);

  const searchSME = (e) => {
    let originalSME = [...listSMECopy];
    originalSME = originalSME.filter((el) =>
      el.smes_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setListSME(originalSME);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_BACKEND}/api/smes`)
      .then((res) => {
        if (res.status === 200) {
          setListSME(res.data.data);
          setListSMECopy(res.data.data);
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
        <h1 className={styles.heading}>Find Your SMEs</h1>
        <div class="mx-auto relative flex items-center w-[30%] min-w-[300px] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            onChange={(e) => searchSME(e)}
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            {listSME.map((el) => {
              return (
                <Card
                  key={el.smes_name}
                  id={el.smes_id}
                  name={el.smes_name}
                  image={el.photo}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FirstSME;
