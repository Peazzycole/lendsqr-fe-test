import { BASE_URL } from "@/utils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


