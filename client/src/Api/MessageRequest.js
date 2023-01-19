import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getMessages = (id, header) => API.get(`/message/${id}`, header);

export const addMessage = (data, header) => API.post("/message/", data, header);
