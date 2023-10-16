import styles from "../style";
import { cblogo } from "../assets";
import { footerLinks, socialMedia } from "../const";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-black-gradient">
        Copyright Ⓒ 2023 casablanca. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        <img src={cblogo} height="50px" width="50px"></img>
      </div>
    </div>
  </section>
);

export default Footer;