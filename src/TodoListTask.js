import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    getStatusInput = (e) =>{
        this.props.changeStatus(this.props.tasks, e.currentTarget.checked);
    };
    render = () => {
        let prior;
        switch (this.props.tasks.priority) {
            case 'low':
                prior ='low';
                break;
            case 'medium':
                prior ='medium';
                break;
            case 'high':
                prior ='high';
                break;
        }
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input onChange={this.getStatusInput} type="checkbox" checked={this.props.tasks.Done}/>
                    <span className={prior}>{this.props.tasks.text} </span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

