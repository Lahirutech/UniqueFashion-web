// Register User
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const addProductdata = (productData, history) => (dispatch) => {
  axios
    .post("/api/admin/addProduct", productData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const updateProductdata = (productData, history) => (dispatch) => {
  axios
    .put("/api/admin/updateProduct", productData)
    .then((res) => history.push("/viewmyproducts"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
