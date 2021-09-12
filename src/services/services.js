import axios from "axios";

const API_ENDPOINT = "http://localhost:8080";

export async function get(req) {
  const { data } = await axios.get(`${API_ENDPOINT}/${req}`);
  return data;
}
