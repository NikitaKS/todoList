import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    onAddClick = () => {
        let newText = this.inputRef.current.value.replace(/^\s+|\s+$/g, '');
        if (newText !== '') {
            this.props.onAddTask(newText);
        } else alert('Enter task name');
        this.inputRef.current.value = '';
    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref={this.inputRef} type="text" placeholder="New task name"/>
                    <button onClick={this.onAddClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

