const sendSuccessMsg = (res: any, params: any, opt?: any) => {
  let msg = {
    success: true,
    msg: params?.msg,
    data: params?.data,
  };

  if (opt?.addonInfo) {
    msg = Object.assign(opt?.addonInfo ?? {}, msg);
  }
  return res.status(200).json(msg);
};

const sendErrorMsg = (res: any, params: any, opt?: any) => {
  let msg = {
    success: false,
    msg: params?.msg,
    error: params?.error,
    data: null,
  };

  if (opt?.addonInfo) {
    msg = Object.assign(opt?.addonInfo ?? {}, msg);
  }
  return res.status(opt?.errorCode ?? 400).json(msg);
};

export { sendSuccessMsg, sendErrorMsg };
