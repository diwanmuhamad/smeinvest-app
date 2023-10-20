import styles from "../style";
import { useEffect, useState } from "react";
import {
  Navbar,
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
  Footer,
} from "../component";
import axios from "axios";

const Home = () => {
  const location = window.location;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("callback")) {
      axios
        .post(
          "https://api.getalby.com/oauth/token",
          {
            code: location.search.replace("?code=", ""),
            grant_type: "authorization_code",
            redirect_uri: `${import.meta.env.REACT_VITE_DOMAIN}/callback/`,
          },
          {
            auth: {
              username: import.meta.env.REACT_VITE_CLIENT_ID,
              password: import.meta.env.REACT_VITE_CLIENT_SECRET,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          setRefresh(true);
          if (response.status === 200) {
            axios
              .get("https://api.getalby.com/user/me", {
                headers: {
                  Authorization: "Bearer " + response.data.access_token,
                },
              })
              .then((response) => {
                let data = JSON.stringify(response.data);
                localStorage.setItem("user", data);
                window.history.replaceState &&
                  window.history.replaceState(
                    null,
                    "",
                    location.pathname +
                      location.search
                        .replace(/[\?&]code=[^&]+/, "")
                        .replace(/^&/, "?")
                  );
                location.pathname = "/";
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          {(!location.pathname.includes("callback") || refresh) && <Navbar />}
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
