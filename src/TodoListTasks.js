import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let element = this.props.tt.map(item =>{
           return <TodoListTask text={item.text} Done={item.Done} pr={item.priority} />
        });
        return (
            <div className="todoList-tasks">
                {element}
            </div>
        );
    }
}

export default TodoListTasks;

