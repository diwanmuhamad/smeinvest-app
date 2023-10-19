import styles from "../style";
import { cblogo, lumi } from "../assets";
import { footerLinks, socialMedia } from "../const";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-[#FAFAF8]">
        Copyright Ⓒ 2023 LUMI. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        <img src={lumi} height="70px" width="70px"></img>
      </div>
    </div>
  </section>
);

export default Footer;
