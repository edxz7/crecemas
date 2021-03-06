import axios from "axios";
// let baseURL = "https://crecemass.herokuapp.com";
let baseURL;
baseURL = process.env.ENV === "production"
  ? (baseURL = "https://crecemass.herokuapp.com")
  : (baseURL = "http://localhost:3000");

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get("/");
  },
  signup: async form => {
    return await service.post("/signup", form);
  },
  login: async user => {
    return await service.post("/login", user);
  },
  logout: async () => {
    return await service.post("/logout");
  },
  getUser: async () => {
    return await service.get("/loggedin");
  },
  edit: async () => {
    return await service.post("/edit");
  },
  upload: async (image) => {
    return await service.post("/upload", image);
  },
  uploadProduct: async (products) => {
    return await service.post("/product/create", {products});
  },
  getProducts: async () => {
    return await service.get("/product/get");
  },
  updateProduct: async (id, product) => {
    return await service.post(`/product/edit/${id}`, product);
  },
  deleteProducts: async (id) => {
    return await service.post(`/product/delete/${id}`);
  },
  registerTransaction: async (transaction) => {
    return await service.post("/transaction/create",transaction);
  },
  getTransactions: async (commerce) => {
    return await service.post("/transaction/get",commerce);
  }
};

export default MY_SERVICE;
