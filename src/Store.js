import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {api} from "./dal/api";

export const ADD_TODOLIST = 'TodoList/reducer/ADD-TODOLIST';
export const ADD_TASK = 'TodoList/reducer/ADD-TASK';
export const CHANGE_TASK = 'TodoList/reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/reducer/DELETE-TASK';
export const SET_TODOLISTS = 'TodoList/reducer/SET_TODOLISTS';
export const SET_TASKS = 'TodoList/reducer/SET_TASKS';
export const UPDATE_LIST = 'TodoList/reducer/UPDATE_LIST';

let initialState = {
    toDoLists: [
        // {
        //     title: 'What to do?', id: 0, tasks: [
        //         {id: 0, title: "aaaaaaaaa", isDone: false, priority: "low"},
        //         {id: 1, title: "bbbbbbbbb", isDone: false, priority: "low"}
        //     ]
        // },
        // {
        //     title: 'What to do1?', id: 1, tasks: [
        //         {id: 0, title: "1111111111", isDone: false, priority: "low"},
        //         {id: 1, title: "22222222222", isDone: false, priority: "low"}
        //     ]
        // },
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return {...state, toDoLists: action.todolists.map(tl => ({...tl, tasks: []}))}
        }
        case SET_TASKS: {
            return {
                ...state, toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            }
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                toDoLists: [...state.toDoLists, {...action.newToDoLists, tasks: []}]
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
        case UPDATE_LIST:
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, title: action.newTitle}
                    } else {
                        return tl
                    }
                })
            };
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

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const addTodolistAC = (newToDoLists) => ({type: ADD_TODOLIST, newToDoLists: newToDoLists});

const addTaskAC = (toDoListId, newTask) => {
    return {type: ADD_TASK, toDoListId, newTask};
};
const changeTaskAC = (toDoListId, taskId, obj) => {
    return {type: CHANGE_TASK, toDoListId, taskId, obj};
};
const deleteTodoListAC = (toDoListId) => {
    return {type: DELETE_TODOLIST, toDoListId};
};
const deleteTaskAC = (taskId, toDoListId) => {
    return {type: DELETE_TASK, taskId, toDoListId};
};
const setTodolistsAC = (todolists) => {
    return {type: SET_TODOLISTS, todolists};
};
const setTasksAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
};
const updateListAC = (todolistId, newTitle) => {
    return {type: UPDATE_LIST, todolistId, newTitle}
};

export const setTodoListsTC = () => (dispatch) => {
    api.getTodoLists().then(data => {
        dispatch(setTodolistsAC(data));
    });
};
export const addTodoListTC = (title) => (dispatch) => {
    api.addTodoList(title).then(data => {
        let newTodoList = data.item;
        dispatch(addTodolistAC(newTodoList));
    })
};
export const getTasksTC = (todolistId,) => (dispatch) => {
    api.getTasks(todolistId).then(data => {
        let tasks = data.items;
        dispatch(setTasksAC(tasks, todolistId));
    })
};
export const addTaskTC = (todolistId, newText) => (dispatch) => {
    api.addTask(todolistId, newText).then(data => {
        let newTask = data.item;
        dispatch(addTaskAC(todolistId, newTask));
    })
};
export const deleteListTC = (todolistId) => (dispatch) => {
    api.deleteList(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodoListAC(todolistId));
        } else {
            alert('ERROR');
        }
    })
};
export const deleteTaskTC = (taskId, toDoListId) => (dispatch) => {
    api.deleteTask(toDoListId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC(taskId, toDoListId))
        } else {
            alert(res.data.message);
        }
    })
};
export const updateListTitleTC = (toDoListId, newTitle) => (dispatch) => {
    api.changeListTitle(toDoListId, newTitle).then(res => {
        dispatch(updateListAC(toDoListId, newTitle));
    });
};
export const updateTaskTC = (toDoListId, taskId, obj) => (dispatch, getState) => {
    getState().toDoLists.find(tl => tl.id === toDoListId)
        .tasks.forEach(t => {
        if (t.id === taskId) {
            api.changeTask(toDoListId, taskId, {...t, ...obj}).then(data => {
                dispatch(changeTaskAC(data.item.todoListId, data.item.id, obj));
            });
        }
    })

};

export default store;