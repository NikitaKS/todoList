import React from 'react';
import './App.css';
import ToDoListTitle from "./ToDoListTitle";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodoListAC} from "./Store";

class ToDoList extends React.Component {
    // componentDidMount() {
    //     this.restoreState();
    // }

    nextTaskId = 0;
    state = {
        // t: [],
        filter: 'all',
    };

    // saveState = () => {
    //     let saveAsString = JSON.stringify(this.state);
    //     localStorage.setItem('our-state' + this.props.id, saveAsString)
    // };
    // restoreState = () => {
    //     let state = {
    //         t: [],
    //         filter: 'all',
    //     };
    //     let stateAsString = localStorage.getItem('our-state' + this.props.id);
    //     if (stateAsString !== null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state, () => {
    //         this.state.t.forEach(item => {
    //             if (item.id >= this.nextTaskId) {
    //                 this.nextTaskId = item.id + 1;
    //             }
    //         })
    //     });

    // if (state.t.length){
    //     let id = state.t.reduce(function (p, v) {
    //         return ( p > v.id ? p : v.id );
    //     });
    //     this.nextTaskId = id+1;
    // }
    // };
    onAddTask = (newText) => {
        let newTask = {id: this.nextTaskId, title: newText, isDone: false};
        this.nextTaskId++;
        this.props.AddTask(this.props.id, newTask)
        // this.setState({
        //     t: newtask,
        // }, () => {
        //     this.saveState()
        // });
    };
    changeFilterValue = (newFilterValue) => {
        this.setState({
            filter: newFilterValue
        });
    };
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {isDone: status})
    };
    changeTaskTitle = (taskId, text) => {
        this.changeTask(taskId, {title: text});

    };
    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj);
        // let newTasks = this.state.t.map(item => {
        //     if (item.id !== taskId) {
        //         return item;
        //     } else return {...item, ...obj};
        // });
        // this.setState({
        //     t: newTasks
        // }, () => {
        //     this.saveState()
        // })
    };
    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id);
    };
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
        // let newTasks = this.state.t.filter(item => {
        //     if (item.id !== taskId) return item;
        // });
        // this.nextTaskId = 0;
        // newTasks.map((item, index) => {
        //     item.id = index;
        //     this.nextTaskId = index + 1;
        // });
        // this.setState({
        //     t: newTasks
        // }, () => {
        //     this.saveState()
        // });

    };
    render = () => {
        const getFilteredTasks = (tasks, filter) => {
            return tasks.filter(item => {
                switch (filter) {
                    case ('all'):
                        return true;
                    case ('completed'):
                        return item.isDone;
                    case ('active'):
                        return !item.isDone;
                    default:
                        return true;
                }
            })
        };
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <ToDoListTitle delete={this.deleteToDoList} title={this.props.title}/>
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
        AddTask: (toDoListId, newTask) => {
            dispatch(addTaskAC(toDoListId, newTask))
        },
        changeTask: (toDoListId, taskId, obj) => {
            dispatch(changeTaskAC(toDoListId, taskId, obj))
        },
        deleteToDoList: (toDoListId) => {
            dispatch(deleteTodoListAC(toDoListId))
        },
        deleteTask: (taskId, toDoListId) => {
            dispatch(deleteTaskAC(taskId, toDoListId))
        }
    }
};

export default connect(null, mapDispatchToProps)(ToDoList);


