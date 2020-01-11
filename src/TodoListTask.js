import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state = {
        editTask: false,
        priority: 'low'
    };

    getStatusInput = (e) => {
        this.props.changeStatus(this.props.tasks.id, e.currentTarget.checked);
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.tasks.id)
    };
    activeChangeTask = () => {
        this.setState({
            editTask: true
        })
    };
    deactivateChangeTask = () => {
        this.setState({
            editTask: false
        })
    };

    inTitleChange = (e) => {
        this.props.changeTaskTitle(this.props.tasks.id, e.currentTarget.value);
    };

    render = () => {
        let prior;
        switch (this.state.priority) {
            case 'low':
                prior = 'low';
                break;
            case 'medium':
                prior = 'medium';
                break;
            case 'high':
                prior = 'high';
                break;
            default:
                prior = 'low';
                break;
        }
        let status = this.props.tasks.isDone ? 'todoList-task done' : 'todoList-task';
        return (
            <div className={status}>
                <button onClick={this.deleteTask}>X</button>
                <input onChange={this.getStatusInput} type="checkbox" checked={this.props.tasks.isDone}/>
                {this.state.editTask ?
                    <input onBlur={this.deactivateChangeTask}
                           autoFocus={true}
                           onChange={this.inTitleChange}
                           value={this.props.tasks.title}
                           type="text"/> :
                    <span
                        onClick={this.activeChangeTask}
                        className={prior}>{this.props.tasks.id} - {this.props.tasks.title} </span>}
                <select>
                    <option>priority</option>
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>
            </div>
        );
    }
}

export default TodoListTask;

