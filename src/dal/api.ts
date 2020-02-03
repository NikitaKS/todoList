import axios, {AxiosResponse} from "axios";
import {ITask, ITodo} from "../types/actionsTypes";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': 'a1408a51-e2c8-48b4-9b0f-06ce8121bd8d'}
});

interface IServerTasks {
    items: ITask[];
    totalCount: number;
    error?: string | null

}

export const api = {
    getTodoLists() {
        return instance.get('').then(res => {
            return res.data;
        });
    },
    getTasks(listId: string) {
        return instance.get(`/${listId}/tasks`).then((res) => {
            return res.data.items;
        })
    },
    addTodoList(title: string) {
        return instance.post('', {title: title}).then(res => {
            let newTodo: ITodo = res.data.data.item;
            return newTodo;
        });
    },
    addTask(listId: string, newText: string) {
        return instance.post(`/${listId}/tasks`, {title: newText}).then((res) => {
            return res.data.data.item
        });
    },
    deleteList(listId: string) {
        return instance.delete(`/${listId}`);
    },
    deleteTask(listId: string, taskId: string) {
        return instance.delete(`/${listId}/tasks/${taskId}`);
    },
    changeTask(listId: string, taskId: string, updatedTask: ITask) {
        return instance.put(`/${listId}/tasks/${taskId}`, {...updatedTask}).then(res => {
            return res.data.data
        });
    },
    changeListTitle(todoListId: string, newText: string) {
        return instance.put(`/${todoListId}`, {title: newText});
    }
};