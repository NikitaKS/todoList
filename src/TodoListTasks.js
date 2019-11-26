import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let element = this.props.tt.map(item =>{
           return <TodoListTask deleteTask={this.props.deleteTask} tasks={item} changeStatus={this.props.changeStatus}/>
        });
        return (
            <div className="todoList-tasks">
                {element}
            </div>
        );
    }
}

export default TodoListTasks;

