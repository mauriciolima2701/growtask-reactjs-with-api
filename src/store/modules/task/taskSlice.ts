import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { url } from "inspector";
import { RootState } from "../..";
import Task, {
	ICreateTask,
	IDeleteTask,
	IFilterTask,
	IUpdateTask,
} from "../../../config/interfaces/tasks";
import { ApiRequest } from "../../../services/api/api";

const adapter = createEntityAdapter<Task>({
	selectId: (taskID) => taskID.id,
});

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
	adapter.getSelectors((state: RootState) => state.tasksUser);

// Pegar todos as tarefas do usuário
export const getTaskUserAPI = createAsyncThunk(
	"task/getAll",
	async (filter: IFilterTask) => {
		let url = `/user/${filter.email}/task`;

		if (filter.title && filter.status) {
			url += `?title=${filter.title}&status=${filter.status}`;
		} else if (filter.title) {
			url += `?title=${filter.title}`;
		} else if (filter.status) {
			url += `?status=${filter.status}`;
		}

		const responseApi = await ApiRequest.get(url);

		const dataParsed = JSON.parse(responseApi.data);

		return dataParsed;
	}
);

// Add tarefas ao usuário
export const addTaskAPI = createAsyncThunk(
	"task/addTask",
	async (infoData: ICreateTask, { dispatch }) => {
		const responseApi = await ApiRequest.post(
			`/user/${infoData.email}/task`,
			JSON.stringify(infoData.task)
		);

		const dataParsed = JSON.parse(responseApi.data);

		return dataParsed;
	}
);

// Atualizar tarefa user
export const updateTaskAPI = createAsyncThunk(
	"task/updateTask",
	async (infoData: IUpdateTask, { dispatch }) => {
		const responseApi = await ApiRequest.put(
			`/user/${infoData.email}/task/${infoData.task.id}`,
			JSON.stringify(infoData.task)
		);

		const dataParsed = JSON.parse(responseApi.data);

		return dataParsed;
	}
);

// Excluir tarefa user
export const deleteTaskAPI = createAsyncThunk(
	"task/deleteTask",
	async (infoData: IDeleteTask) => {
		const responseApi = await ApiRequest.delete(
			`/user/${infoData.email}/task/${infoData.id}`
		);

		const dataParsed = JSON.parse(responseApi.data);
		return dataParsed;
	}
);

const taskSlice = createSlice({
	name: "tasksUser",
	initialState: adapter.getInitialState({
		ok: false,
		message: "",
	}),
	reducers: {
		removeAllTask: adapter.removeAll,
		addAllTask: adapter.setAll,
	},
	extraReducers(builder) {
		builder.addCase(getTaskUserAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			adapter.setAll(state, action.payload.data);
		});

		builder.addCase(addTaskAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			adapter.addOne(state, action.payload.data);
		});

		builder.addCase(deleteTaskAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			adapter.setAll(state, action.payload.data);
		});

		builder.addCase(updateTaskAPI.fulfilled, (state, action) => {
			state.ok = action.payload.ok;
			state.message = action.payload.message;
			adapter.updateOne(state, {
				id: action.payload.data.id,
				changes: action.payload.data,
			});
		});
	},
});

export const { removeAllTask, addAllTask } = taskSlice.actions;

export default taskSlice.reducer;
