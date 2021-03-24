export const generateHeadersWithAccessToken = () => ({
  headers: {
    Authorization: `Baerer ${localStorage.getItem("access_token")}`,
  },
});
