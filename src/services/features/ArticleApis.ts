import axiosInstance from "../AxiosInstance";

export const getMostPopularArticles = async (period: number) => {
  return (await axiosInstance.get(`/viewed/${period}.json`)).data;
};