import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    render = () => {
        let prior;
        switch (this.props.pr) {
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
                    <input type="checkbox" checked={this.props.Done}/>
                    <span className={prior}>{this.props.text} </span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

