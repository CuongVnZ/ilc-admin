import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getMemberStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMemberSuccess: (state, action) => {
      state.isFetching = false;
      state.members = action.payload;
    },
    getMemberFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE
    deleteMemberStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteMemberSuccess: (state, action) => {
      state.isFetching = false;
      state.members.splice(
        state.members.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteMemberFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE
    updateMemberStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateMemberSuccess: (state, action) => {
      var member = action.payload.member
      var _id = action.payload.id
      state.isFetching = false;
      var index = state.members.findIndex((item) => item._id === _id)
      for (const property in member) {
        state.members[index][property] = member[property];
      }
    },
    updateMemberFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    
    //UPDATE
    addMemberStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addMemberSuccess: (state, action) => {
      state.isFetching = false;
      state.members.push(action.payload);
    },
    addMemberFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMemberStart,
  getMemberSuccess,
  getMemberFailure,
  deleteMemberStart,
  deleteMemberSuccess,
  deleteMemberFailure,
  updateMemberStart,
  updateMemberSuccess,
  updateMemberFailure,
  addMemberStart,
  addMemberSuccess,
  addMemberFailure,
} = memberSlice.actions;

export default memberSlice.reducer;