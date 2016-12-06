export const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new Error(res.statusText);
  error.response = res;
  throw error;
};