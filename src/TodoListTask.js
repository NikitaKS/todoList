import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    getStatusInput = (e) => {
        this.props.changeStatus(this.props.tasks, e.currentTarget.checked);
    };
    deleteTask = () => {
        this.props.deleteTask(this.props.tasks)
    };

    render = () => {
        let prior;
        switch (this.props.tasks.priority) {
            case 'low':
                prior = 'low';
                break;
            case 'medium':
                prior = 'medium';
                break;
            case 'high':
                prior = 'high';
                break;
        }
        let status;
        if (this.props.tasks.Done) {
            status =`${'todoList-task'} ${'done'}`;
        } else status = 'todoList-task';
        return (
            <div className={status}>
                <button onClick={this.deleteTask}>X</button>
                <input onChange={this.getStatusInput} type="checkbox" checked={this.props.tasks.Done}/>
                <span className={prior}>{this.props.tasks.text} </span>
            </div>
        );
    }
}

export default TodoListTask;

