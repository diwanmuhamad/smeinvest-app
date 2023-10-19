import styles from "../style";
import { scrollvariants, slideIn } from "../const";
import { robot, chain1, chain2, chain3 } from "../assets";
import Button from "./Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaBolt } from "react-icons/fa6";

const FirstSection = () => {
  return (
    <section id="home" className={`flex sm:py-6 py-6 `}>
      <motion.div
        variants={slideIn("left", "spring", 0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-col justify-between items-center w-full">
          <h1 className="text-center font-poppins font-semibold sm:text-[80px] text-[35px] text-[#797472] sm:leading-[100.8px] leading-[50px]">
            SMEs Investment Platform <br className="sm:block hidden" /> with{" "}
            <span className="text-[#B67465]">
              <TypeAnimation
                sequence={["Easy", 1000, "Fast", 1000, "Secure", 1000]}
                speed={50}
                repeat={Infinity}
                style={{ fontSize: "" }}
                cursor={false}
              />
            </span>{" "}
            Payment
          </h1>
          <div className="flex">
            <h3 className="sm:text-[32px] text-[20px] mt-5 font-poppins font-semibold text-center text-[#797472]">
              Powered by{" "}
              <span className="text-[#DEB50D]">Lightning Network</span>
            </h3>
            <FaBolt className="text-[#DEB50D] mt-3 text-[28px]" />
          </div>
        </div>
        <Link
          to={{
            pathname: `/${"smelist"}`,
          }}
          className="mx-auto appearance-none"
        >
          <Button styles="ml-auto sm:mt-6 mt-6" text={"Get Started"} />
        </Link>
      </motion.div>
    </section>
  );
};

export default FirstSection;
