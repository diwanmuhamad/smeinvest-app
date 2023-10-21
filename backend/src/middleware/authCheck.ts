import { sendErrorMsg } from "../commons/response";
import axios from "axios";

const authCheck = async (req: any, res: any, next: any) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined") {
    console.log("authCheck:undefined bearer");
    return sendErrorMsg(
      res,
      { msg: "Unauthorized", error: "Unauthorized" },
      { errorCode: 401 }
    );
  }
  const token = bearerHeader.split(" ")[1];
  let user = null;

  // get user's wallet
  await axios
    .get(`${process.env.ALBY_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Response:", response?.data);
      user = response?.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return sendErrorMsg(
        res,
        { msg: "Unauthorized", error: "Unauthorized" },
        { errorCode: 401 }
      );
    });

  req.token = token
  req.user = user;
  return next();
};

export { authCheck };
