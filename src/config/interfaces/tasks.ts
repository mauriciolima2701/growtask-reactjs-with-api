export type status = "arquivado" | "ativo";

interface Task {
	id: string;
	status: status;
	title: string;
	description: string;
}

export interface ICreateTask {
	email: string;
	task: Omit<Task, "id" | "status">;
}

export interface IUpdateTask {
	email: string;
	task: Task;
}

export interface IDeleteTask {
	email: string;
	id: string;
}

export interface IFilterTask {
	email: string;
	title?: string;
	status?: string;
}

export default Task;
