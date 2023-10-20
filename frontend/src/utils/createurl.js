import CryptoJS from "crypto-js";

function sha256(buffer) {
  return CryptoJS.SHA256(buffer).toString();
}

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function GeneratePKCE() {
  const verifier = CryptoJS.lib.WordArray.random(32);

  if (verifier) {
    const challenge = base64URLEncode(sha256(verifier));
    return { challenge, verifier };
  }
}

export const createurl = () => {
  const { verifier, challenge } = GeneratePKCE();
  const url = `https://api.zebedee.io/v1/oauth2/authorize?client_id=${
    import.meta.env.VITE_REACT_CLIENT_ID
  }&response_type=code&redirect_uri=${"http://localhost:5173/auth/callback"}&code_challenge_method=S256&code_challenge=${challenge}&scope=user`;

  return url;
};

export const createUrlAlby = () => {
  return `https://getalby.com/oauth?client_id=${
    import.meta.env.VITE_REACT_CLIENT_ID
  }&response_type=code&redirect_uri=${
    import.meta.env.VITE_REACT_DOMAIN
  }/callback/&scope=balance:read%20account:read%20payments:send`;
};
