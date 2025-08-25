import axios from "axios";

// Change the baseURL to your backend API address when deployed
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const api = axios.create({
  baseURL: "http://127.0.0.1:5001/api",
});

export default api;
