import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': 'a1408a51-e2c8-48b4-9b0f-06ce8121bd8d'}
});

export const api = {
    getTodoLists() {
        return instance.get('').then(res => {
            return res.data;
        });
    },
    getTasks(listId) {
        return instance.get(`/${listId}/tasks`).then(res => {
            return res.data;
        })
    },
    addTodoList(title) {
        return instance.post('', {title: title}).then(res => {
            return res.data.data;
        });
    },
    addTask(listId, newText) {
        return instance.post(`/${listId}/tasks`, {title: newText}).then(res => {
            return res.data.data
        });
    },
    deleteList(listId) {
        return instance.delete(`/${listId}`);
    },
    deleteTask(listId, taskId) {
        return instance.delete(`/${listId}/tasks/${taskId}`);
    },
    changeTask(listId, taskId, updatedTask) {
        return instance.put(`/${listId}/tasks/${taskId}`, {...updatedTask}).then(res=>{
            return res.data.data
        });
    },
    changeListTitle(todoListId, newText) {
        return instance.put(`/${todoListId}`, {title: newText});
    }
};