import styles from "../style";
import {
  Navbar,
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
  Footer,
} from "../component";

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary flex justify-center items-start relative`}>
        <div className={`${styles.boxWidth}`}>
          <FirstSection />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <SecondSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
