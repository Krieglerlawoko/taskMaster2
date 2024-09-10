import { createSlice } from "@reduxjs/toolkit";
import { defaultUser } from "../../assets/data"; // Changed variable name

const initialState = {
  currentUser: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : defaultUser,

  sidebarVisible: false, // Changed state name
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCredentials: (state, action) => { // Renamed action
      state.currentUser = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload)); // Changed localStorage key
    },
    signOut: (state) => { // Renamed action
      state.currentUser = null;
      localStorage.removeItem("userDetails"); // Changed localStorage key
    },
    toggleSidebar: (state, action) => { // Renamed action
      state.sidebarVisible = action.payload;
    },
  },
});

export const { updateCredentials, signOut, toggleSidebar } = authReducer.actions;

export default authReducer.reducer;