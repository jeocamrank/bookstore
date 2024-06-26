import axios from "../utils/axios-customize.js";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callFetchListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const callCreateAuser = (fullName, password, email, phone) => {
  return axios.post(`/api/v1/user`, { fullName, password, email, phone });
};

export const callBulkCreateUser = (data) => {
  return axios.post(`/api/v1/user/bulk-create`, data);
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put(`/api/v1/user?`, { _id, fullName, phone });
};

/////////////////////////////////////////////////////////////// BOOK ////////////////////////////////////////////////////////////////

export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
  return axios.post(`/api/v1/book`, { thumbnail, slider, mainText, author, price, sold, quantity, category });
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchCategory = () => {
  return axios.get(`/api/v1/database/category`);
};

export const callUploadBook = () => {
  return axios.post(`/api/v1/file/upload`);
};

export const callFetchBookById = (id) => {
  return axios.get(`/api/v1/book/${id}`);
}

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};
///////////////////////////////////////////////////////

export const callPlaceOrder = (data) => {
  return axios.post('/api/v1/order', {
    ...data
  })
}

export const callFethListHistory = () => {
  return axios.get(`/api/v1/history?`);
}
