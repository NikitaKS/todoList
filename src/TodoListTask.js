import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state = {
        editTask: false,
        priority: 'low',
        inputValue: this.props.task.title,
        inputError: false
    };

    onTitleChange = (e) => {
        this.setState({
            inputValue: e.currentTarget.value
        });
    };

    getStatusInput = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };
    activeChangeTask = () => {
        this.setState({
            editTask: true
        })
    };
    deactivateChangeTask = () => {
        this.setState({
            editTask: false
        });
        this.props.changeTaskTitle(this.props.task.id, this.state.inputValue);
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
        let isCompletedTask = this.props.task.status === 2;
        let containerCssClass = isCompletedTask ? "todoList-task done" : "todoList-task";
        let priorityTitle = "";
        switch (this.props.task.priority) {
            case 0:
                priorityTitle = "Low";
                break;
            case 1:
                priorityTitle = "Middle";
                break;
            case 2:
                priorityTitle = "High";
                break;
            case 3:
                priorityTitle = "Urgently";
                break;
            case 4:
                priorityTitle = "Later";
                break;
        }
        return (
            <div className={containerCssClass}>
                <button onClick={this.deleteTask}>X</button>
                <input onChange={this.getStatusInput} type="checkbox" checked={isCompletedTask}/>
                {this.state.editTask
                    ?
                    <input onBlur={this.deactivateChangeTask}
                           autoFocus={true}
                           onChange={this.onTitleChange}
                           value={this.state.inputValue}
                           type="text"/>
                    :
                    <span
                        onClick={this.activeChangeTask}
                        className={prior}>{this.state.inputValue} - {priorityTitle}</span>}
            </div>
        );
    }
}

export default TodoListTask;

