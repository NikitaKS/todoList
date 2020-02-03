import {
    ActionsTypes, ISetTodoListActionTypes, ITodo,
    ISetTasksActionTypes, IAddTodoListActionTypes,
    IAddTaskActionTypes, IChangeTaskActionTypes, IDeleteTodoListActionTypes,
    IDeleteTaskActionTypes, IUpdateListTitleActionTypes
} from "../types/actionsTypes";
import {api} from "../dal/api";
import {ITask} from "../types/actionsTypes";
import {Dispatch} from "redux";

export const ADD_TODOLIST = 'TodoList/reducer/ADD-TODOLIST';
export const ADD_TASK = 'TodoList/reducer/ADD-TASK';
export const CHANGE_TASK = 'TodoList/reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/reducer/DELETE-TASK';
export const SET_TODOLISTS = 'TodoList/reducer/SET_TODOLISTS';
export const SET_TASKS = 'TodoList/reducer/SET_TASKS';
export const UPDATE_LIST = 'TodoList/reducer/UPDATE_LIST';


interface IInitialState {
    toDoLists: ITodo[]
}

let initialState = {
    toDoLists: []
};


const reducer = (state: IInitialState = initialState, action: ActionsTypes): IInitialState => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return {...state, toDoLists: action.todolists.map((tl: ITodo) => ({...tl, tasks: []}))}
        }
        case SET_TASKS: {
            return {
                ...state, toDoLists: state.toDoLists.map((tl: ITodo) => {
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
                toDoLists: state.toDoLists.map((item: ITodo) => {
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
                toDoLists: state.toDoLists.map((item: ITodo) => {
                    if (item.id !== action.toDoListId) {
                        return item;
                    } else {
                        return {
                            ...item,
                            tasks: item.tasks.map((t: ITask) => {
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
                toDoLists: state.toDoLists.map((tl: ITodo) => {
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
                toDoLists: state.toDoLists.filter((item: ITodo) => {
                    if (item.id !== action.toDoListId) {
                        return item
                    }
                })
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                toDoLists: state.toDoLists.map((item: ITodo) => {
                    if (item.id === action.toDoListId) {
                        return {
                            ...item,
                            tasks: item.tasks.filter((task: ITask) => {
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

const addTodolistAC = (newToDoLists: ITodo): IAddTodoListActionTypes => ({
    type: ADD_TODOLIST,
    newToDoLists: newToDoLists
});

const addTaskAC = (toDoListId: string, newTask: ITask): IAddTaskActionTypes => {
    return {type: ADD_TASK, toDoListId, newTask};
};
const changeTaskAC = (toDoListId: string, taskId: string, obj: { title?: string, status?: number }): IChangeTaskActionTypes => {
    return {type: CHANGE_TASK, toDoListId, taskId, obj};
};
const deleteTodoListAC = (toDoListId: string): IDeleteTodoListActionTypes => {
    return {type: DELETE_TODOLIST, toDoListId};
};
const deleteTaskAC = (taskId: string, toDoListId: string): IDeleteTaskActionTypes => {
    return {type: DELETE_TASK, taskId, toDoListId};
};
const setTodolistsAC = (todolists: ITodo[]): ISetTodoListActionTypes => {
    return {type: SET_TODOLISTS, todolists};
};
const setTasksAC = (tasks: ITask[], todolistId: string): ISetTasksActionTypes => {
    return {type: SET_TASKS, tasks, todolistId};
};
const updateListAC = (todolistId: string, newTitle: string): IUpdateListTitleActionTypes => {
    return {type: UPDATE_LIST, todolistId, newTitle}
};

export const setTodoListsTC = () => (dispatch: Dispatch) => {
    api.getTodoLists().then((data: ITodo[]) => {
        dispatch(setTodolistsAC(data));
    });
};
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    api.addTodoList(title).then((newTodoList: ITodo) => {
        dispatch(addTodolistAC(newTodoList));
    })
};
export const getTasksTC = (todolistId: string,) => (dispatch: Dispatch) => {
    api.getTasks(todolistId).then((tasks: ITask[]) => {
        dispatch(setTasksAC(tasks, todolistId));
    })
};
export const addTaskTC = (todolistId: string, newText: string) => (dispatch: Dispatch) => {
    api.addTask(todolistId, newText).then((task: ITask) => {
        dispatch(addTaskAC(todolistId, task));
    })
};
export const deleteListTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.deleteList(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodoListAC(todolistId));
        } else {
            alert('ERROR');
        }
    })
};
export const deleteTaskTC = (taskId: string, toDoListId: string) => (dispatch: Dispatch) => {
    api.deleteTask(toDoListId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC(taskId, toDoListId))
        } else {
            alert(res.data.message);
        }
    })
};
export const updateListTitleTC = (toDoListId: string, newTitle: string) => (dispatch: Dispatch) => {
    api.changeListTitle(toDoListId, newTitle).then(res => {
        dispatch(updateListAC(toDoListId, newTitle));
    });
};
export const updateTaskTC = (toDoListId: string, taskId: string, obj: { title?: string, status?: number }) =>
    (dispatch: Dispatch, getState: Function) => {
    getState().todolists.toDoLists.find((tl: ITodo) => tl.id === toDoListId)
        .tasks.forEach((t: ITask) => {
        if (t.id === taskId) {
            api.changeTask(toDoListId, taskId, {...t, ...obj}).then(data => {
                dispatch(changeTaskAC(data.item.todoListId, data.item.id, obj));
            });
        }
    })
};

export default reducer;