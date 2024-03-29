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

export const updateProduct = async (id, data, dispatch) => {
  dispatch(updateProductStart());
  try {
    console.log(data);
    const res = await userRequest.put(`/products/` + id, data);
    var updatedProduct = res.data
    console.log(updatedProduct)
    dispatch(updateProductSuccess(updatedProduct));
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
    const res = await userRequest.get("/users");
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

export const updateMember = async (id, member, dispatch) => {
  dispatch(updateMemberStart());
  try {
    // update
    const res = await userRequest.put(`/users/` + id, member);
    dispatch(updateMemberSuccess({ id, member }));
  } catch (err) {
    dispatch(updateMemberFailure());
  }
};
export const addMember = async (member, dispatch) => {
  dispatch(addMemberStart());
  try {
    const res = await userRequest.post(`/users`, member);
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
    console.log(res.data)
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

export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/` + id, order);
    var _id = res.data.documentId
    console.log({_id, order})
    dispatch(updateOrderSuccess({ _id, order }));
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

