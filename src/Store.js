import {createStore} from "redux";

export const ADD_TODOLIST = 'TodoList/reducer/ADD-TODOLIST';
export const ADD_TASK = 'TodoList/reducer/ADD-TASK';
export const CHANGE_TASK = 'TodoList/reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/reducer/DELETE-TASK';
export const SET_TODOLISTS = 'TodoList/reducer/SET_TODOLISTS';
export const SET_TASKS = 'TodoList/reducer/SET_TASKS';

let initialState = {
    toDoLists: [
        {
            title: 'What to do?', id: 0, tasks: [
                {id: 0, title: "aaaaaaaaa", isDone: false, priority: "low"},
                {id: 1, title: "bbbbbbbbb", isDone: false, priority: "low"}
            ]
        },
        {
            title: 'What to do1?', id: 1, tasks: [
                {id: 0, title: "1111111111", isDone: false, priority: "low"},
                {id: 1, title: "22222222222", isDone: false, priority: "low"}
            ]
        },
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newToDoLists]
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                toDoLists: state.toDoLists.map(item => {
                    if (item.id !== action.toDoListId) {
                        return item;
                    } else {
                        return {
                            ...item,
                            tasks: [...item.tasks, action.newTask]
                        }
                    }
                })
            }
        }
        case CHANGE_TASK: {
            return {
                ...state,
                toDoLists: state.toDoLists.map(item => {
                    if (item.id !== action.toDoListId) {
                        return item;
                    } else {
                        return {
                            ...item,
                            tasks: item.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj}
                                }
                            })
                        }
                    }
                })
            }
        }
        case DELETE_TODOLIST: {
            return {
                ...state,
                toDoLists: state.toDoLists.filter(item => {
                    if (item.id !== action.toDoListId) {
                        return item
                    }
                })
            }
        }
        case DELETE_TASK: {
            debugger
            return {
                ...state,
                toDoLists: state.toDoLists.map(item => {
                    if (item.id === action.toDoListId) {
                        return {
                            ...item,
                            tasks: item.tasks.filter(task => {
                                if (task.id !== action.taskId) return task;
                            })
                        }
                    } else {
                        return item;
                    }
                })
            }
        }
        default:
            return state
    }
};

const store = createStore(reducer);
export const addTodolistAC = (newToDoLists) => ({type: ADD_TODOLIST, newToDoLists: newToDoLists});
export const addTaskAC = (toDoListId, newTask) => {
    return {type: ADD_TASK, toDoListId, newTask};
};
export const changeTaskAC = (toDoListId, taskId, obj) => {
    return {type: CHANGE_TASK, toDoListId, taskId, obj};
};
export const deleteTodoListAC = (toDoListId) => {
    return {type: DELETE_TODOLIST, toDoListId};
};
export const deleteTaskAC = (taskId, toDoListId) => {
    return {type: DELETE_TASK, taskId, toDoListId};
};
export const setTodolistsAC = (todolists) => {
    return {type: SET_TODOLISTS, todolists};
};
export const setTasksAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
};
export default store;