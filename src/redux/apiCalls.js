import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getMemberFailure,
  getMemberStart,
  getMemberSuccess,
  deleteMemberFailure,
  deleteMemberStart,
  deleteMemberSuccess,
  updateMemberFailure,
  updateMemberStart,
  updateMemberSuccess,
  addMemberFailure,
  addMemberStart,
  addMemberSuccess,
} from "./memberRedux";
import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
} from "./orderRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(loginFailure());
  }
};

// PRODUCT API
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/` + id, product);
    var _id = res.data.documentId
    console.log({_id, product})
    dispatch(updateProductSuccess({_id, product}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//MEMBER API

export const getMembers = async (dispatch) => {
  dispatch(getMemberStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getMemberSuccess(res.data));
  } catch (err) {
    dispatch(getMemberFailure());
  }
};

export const deleteMember = async (id, dispatch) => {
  dispatch(deleteMemberStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteMemberSuccess(id));
  } catch (err) {
    dispatch(deleteMemberFailure());
  }
};

export const updateMember = async (id, product, dispatch) => {
  dispatch(updateMemberStart());
  try {
    // update
    dispatch(updateMemberSuccess({ id, product }));
  } catch (err) {
    dispatch(updateMemberFailure());
  }
};
export const addMember = async (product, dispatch) => {
  dispatch(addMemberStart());
  try {
    const res = await userRequest.post(`/users`, product);
    dispatch(addMemberSuccess(res.data));
  } catch (err) {
    dispatch(addMemberFailure());
  }
};


//ORDER API

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, product, dispatch) => {
  dispatch(updateOrderStart());
  try {
    // update
    dispatch(updateOrderSuccess({ id, product }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
export const addOrder = async (product, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/orders`, product);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};

