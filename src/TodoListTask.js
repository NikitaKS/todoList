import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state = {
        editTask: false
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
        let status = this.props.tasks.Done ? 'todoList-task done' : 'todoList-task';
        return (
            <div className={status}>
                <button onClick={this.deleteTask}>X</button>
                <input onChange={this.getStatusInput} type="checkbox" checked={this.props.tasks.Done}/>
                {this.state.editTask ?
                    <input onBlur={this.deactivateChangeTask}
                           autoFocus={true}
                           onChange={this.inTitleChange}
                           value={this.props.tasks.text}
                           type="text"/> :
                    <span
                        onClick={this.activeChangeTask}
                        className={prior}>{this.props.tasks.id} - {this.props.tasks.text} </span>}

            </div>
        );
    }
}

export default TodoListTask;

