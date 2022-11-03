import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialProductsState = {
  Users: [],
  UsersById:[],
  Createuser:[]
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const ManageUserSlice = createSlice({
  name: "ManageUserSlice",
  initialState: initialProductsState,

  reducers: {
    catchError: (state: any, action: any) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state: any, action: any) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    getedAllUsersDetails: (state, action) => {
      const { data } = action.payload;
      state.Users = data;
    },
    fetchedAllUsersDetailsById: (state, action) => {
      const { data } = action.payload;
      state.UsersById = data;
    },
    fetchedUser: (state, action) => {
      const { data } = action.payload;
      state.Createuser = data;
    },



  },
});
