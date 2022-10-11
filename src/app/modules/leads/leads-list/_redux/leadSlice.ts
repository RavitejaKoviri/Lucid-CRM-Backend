import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialProductsState = {
  Leads: [],
  Createlead: []
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const LeadSlice = createSlice({
  name: "LeadSlice",
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

    getedAllLeadsDetails: (state, action) => {
      const { data } = action.payload;
      state.Leads = data;
    },
    fetchedLead: (state, action) => {
      const { data } = action.payload;
      state.Createlead = data;
    },
  },
});
