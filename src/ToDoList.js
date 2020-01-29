import React from 'react';
import './App.css';
import ToDoListTitle from "./ToDoListTitle";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC, changeTaskAC, deleteListTC,
    deleteTaskTC, getTasksTC, updateListTitleTC, updateTaskTC
} from "./Store";
import {api} from "./dal/api";

class ToDoList extends React.Component {

    componentDidMount() {
        this.props.setTasks(this.props.id);
    }

    state = {
        filter: 'all'
    };

    onAddTask = (newText) => {
        this.props.AddTask(this.props.id, newText)
    };

    changeFilterValue = (newFilterValue) => {
        this.setState({
            filter: newFilterValue
        });
    };

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find(item => item.id === taskId);
        // let updatedTask = {...task, ...obj};
        this.props.changeTask(this.props.id, taskId, obj);
        // api.changeTask(this.props.id, taskId, updatedTask).then(data => {
        //     this.props.changeTask(data.item.todoListId, data.item.id, data.item);
        // });
    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTaskTitle = (taskId, text) => {
        this.changeTask(taskId, {title: text});

    };
    changeListTitle = (newTitle) => {
        this.props.updateList(this.props.id, newTitle);
    };

    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id);
    };
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    };
    render = () => {
        const getFilteredTasks = (tasks, filter) => {
            return tasks.filter(item => {
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

const mapDispatchToProps = (dispatch) => {
    return {
        AddTask: (toDoListId, newText) => {
            let thunk = addTaskTC(toDoListId, newText);
            dispatch(thunk);
        },
        setTasks: (todolistId) => {
            let thunk = getTasksTC(todolistId);
            dispatch(thunk);
        },
        changeTask: (toDoListId, taskId, obj) => {
            let thunk = updateTaskTC(toDoListId, taskId, obj);
            dispatch(thunk);
            // dispatch(changeTaskAC(toDoListId, taskId, obj))
        },
        deleteToDoList: (toDoListId) => {
            let thunk = deleteListTC(toDoListId);
            dispatch(thunk);
        },
        deleteTask: (taskId, toDoListId) => {
            let thunk = deleteTaskTC(taskId, toDoListId);
            dispatch(thunk);
        },
        updateList: (todolistId, newTitle) => {
            const thunk = updateListTitleTC(todolistId, newTitle);
            dispatch(thunk)
        }
    }
};

export default connect(null, mapDispatchToProps)(ToDoList);


