import React from 'react';
import './App.css';
import ToDoListTitle from "./ToDoListTitle";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC, deleteListTC, deleteTaskTC,
    getTasksTC, updateListTitleTC, updateTaskTC
} from "./redux/reducer";
import {ThunkDispatch} from "redux-thunk";
import {ActionsTypes, ITask} from "./types/actionsTypes";


interface IProps {
    id: string;
    title: string;
    tasks: ITask[];
}

interface IMdtp {
    setTasks: (todolistId: string) => void;
    AddTask: (toDoListId: string, newText: string) => void;
    changeTask: (toDoListId: string, taskId: string, obj: {title?:string, status?:number}) => void;
    updateList: (todolistId: string, newTitle: string) => void;
    deleteToDoList: (toDoListId: string) => void;
    deleteTask: (taskId: string, toDoListId: string) => void;
}

interface IState {
    filter: string;
}

class ToDoList extends React.Component<IProps & IMdtp, IState> {

    componentDidMount() {
        this.props.setTasks(this.props.id);
    }

    state: IState = {
        filter: 'all'
    };

    onAddTask = (newText: string) => {
        this.props.AddTask(this.props.id, newText)
    };

    changeFilterValue = (newFilterValue: string) => {
        this.setState({
            filter: newFilterValue
        });
    };

    changeTask = (taskId: string, obj: {title?:string, status?:number}) => {
        // let task = this.props.tasks.find((item: any) => item.id === taskId);
        // let updatedTask = {...task, ...obj};
        this.props.changeTask(this.props.id, taskId, obj);
        // api.changeTask(this.props.id, taskId, updatedTask).then(data => {
        //     this.props.changeTask(data.item.todoListId, data.item.id, data.item);
        // });
    };

    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status: status})
    };

    changeTaskTitle = (taskId: string, text: string) => {
        this.changeTask(taskId, {title: text});
    };
    changeListTitle = (newTitle: string) => {
        this.props.updateList(this.props.id, newTitle);
    };

    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id);
    };
    deleteTask = (taskId: string) => {
        this.props.deleteTask(taskId, this.props.id)
    };
    render = () => {
        const getFilteredTasks = (tasks: ITask[], filter: string) => {
            return tasks.filter((item: ITask) => {
                switch (filter) {
                    case ('all'):
                        return true;
                    case ('completed'):
                        return item.status === 2;
                    case ('active'):
                        return item.status !== 2;
                    default:
                        return true;
                }
            })
        };
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <ToDoListTitle changeListTitle={this.changeListTitle}
                                   delete={this.deleteToDoList}
                                   title={this.props.title}/>
                    <AddNewItemForm onAddItem={this.onAddTask}/>
                </div>
                <TodoListTasks changeTaskTitle={this.changeTaskTitle} deleteTask={this.deleteTask}
                               changeStatus={this.changeStatus}
                               tt={getFilteredTasks(this.props.tasks, this.state.filter)}/>
                <TodoListFooter changeFilterValue={this.changeFilterValue} filter={this.state.filter}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsTypes>): IMdtp => {
    return {
        AddTask: (toDoListId: string, newText: string) => {
            let thunk = addTaskTC(toDoListId, newText);
            dispatch(thunk);
        },
        setTasks: (todolistId: string) => {
            let thunk = getTasksTC(todolistId);
            dispatch(thunk);
        },
        changeTask: (toDoListId: string, taskId: string, obj: {title?:string, status?:number}) => {
            let thunk = updateTaskTC(toDoListId, taskId, obj);
            dispatch(thunk);
            // dispatch(changeTaskAC(toDoListId:string, taskId, obj))
        },
        deleteToDoList: (toDoListId: string) => {
            let thunk = deleteListTC(toDoListId);
            dispatch(thunk);
        },
        deleteTask: (taskId: string, toDoListId: string) => {
            let thunk = deleteTaskTC(taskId, toDoListId);
            dispatch(thunk);
        },
        updateList: (todolistId: string, newTitle: string) => {
            const thunk = updateListTitleTC(todolistId, newTitle);
            dispatch(thunk)
        }
    }
};

export default connect(null, mapDispatchToProps)(ToDoList);


