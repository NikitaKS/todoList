import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let element = this.props.tt.map(item =>{
           return <TodoListTask changeTaskTitle={this.props.changeTaskTitle}
                                deleteTask={this.props.deleteTask}
                                tasks={item}
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

