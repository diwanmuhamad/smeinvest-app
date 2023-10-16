import { features, scrollvariants, slideIn } from "../const";
import styles, { layout } from "../style";
import Button from "./Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] bg-black-gradient ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const SecondSection = () => (
  <section id="features" className={layout.section}>
    <motion.div
      variants={slideIn("left", "spring", 0, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={layout.sectionInfo}
    >
      <h2 className={styles.heading2}>
        <span className="text-gradient">Grow</span> and{" "}
        <span className="text-gradient">Expand</span>
        <br className="sm:block hidden" /> with Us
      </h2>
      <p className={`${styles.paragraph} sm:max-w-[470px] mt-5`}>
        Empower your small or medium enterprise by start investing in them, and
        start your journey of investing with us
      </p>

      <Link
        to={{
          pathname: `/${localStorage.getItem("token") ? "chat" : "login"}`,
        }}
        className="appearance-none sm:ml-0 mx-auto"
      >
        <Button styles={"mt-10"} text={"Get Started"} />
      </Link>
    </motion.div>

    <motion.div
      variants={slideIn("down", "spring", 0, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`${layout.sectionImg} flex-col`}
    >
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </motion.div>
  </section>
);

export default SecondSection;
