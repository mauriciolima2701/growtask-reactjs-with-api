import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../config/interfaces/user";

const initialState = "";

const userLoggedSlice = createSlice({
	name: "userLogged",
	initialState,
	reducers: {
		clearUserLogged: (state) => {
			localStorage.clear();
			return initialState;
		},

		setUserLogged: (state, action) => {
			localStorage.setItem("userLogged", action.payload);
			return action.payload;
		},
	},
});

export const { clearUserLogged, setUserLogged } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
