import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {ITask} from "./types/actionsTypes";

interface IProps {
    changeTaskTitle: (taskId:string, text:string) => void;
    tt: ITask[];
    deleteTask: (taskId:string) => void;
    changeStatus: (taskId:string, status:number) => void;
}

class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let element = this.props.tt.map(item => {
            return <TodoListTask changeTaskTitle={this.props.changeTaskTitle}
                                 deleteTask={this.props.deleteTask}
                                 task={item}
                                 key={item.id}
                                 changeStatus={this.props.changeStatus}/>
        });
        return (
            <div className="todoList-tasks">
                {element}
            </div>
        );
    }
}

export default TodoListTasks;

