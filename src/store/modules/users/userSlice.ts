import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import User from "../../../config/interfaces/user";
import { ApiRequest } from "../../../services/api/api";

// const initialState: User[] = [];

const userAdapter = createEntityAdapter<User>({
	selectId: (user) => user.email,
});

export const { selectAll: selectUsers, selectById: selectUserByEmail } =
	userAdapter.getSelectors((state: RootState) => state.users);

export const getUsersAPI = createAsyncThunk("users/getUsers", async () => {
	const responseApi = await ApiRequest.get("/users");

	const dataParsed = JSON.parse(responseApi.data);

	return dataParsed;
});

export const addUserAPI = createAsyncThunk(
	"users/addUsers",
	async (newUser: User) => {
		const responseApi = await ApiRequest.post(
			"/users",
			JSON.stringify(newUser)
		);

		const dataParsed = JSON.parse(responseApi.data);

		return dataParsed;
	}
);

const userSlice = createSlice({
	name: "users",
	initialState: userAdapter.getInitialState({
		ok: false,
		message: "",
	}),
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getUsersAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			userAdapter.setAll(state, action.payload.data);
		});

		builder.addCase(addUserAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			userAdapter.addOne(state, action.payload.data);
		});
	},
});

export default userSlice.reducer;
