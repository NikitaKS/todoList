import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        inputValue: ''
    };
    // constructor(props) {
    //     super(props);
    //     this.inputRef = React.createRef();
    // }

    // onAddClick = () => {
    //     let newText = this.inputRef.current.value.replace(/^\s+|\s+$/g, '');
    //     if (this.inputRef.current.value !== '') {
    //         this.props.onAddTask(newText);
    //     } else alert('Enter task name');
    //     this.inputRef.current.value = '';
    // };
    onAddClick = () => {
        if (this.state.inputValue === '') {
            alert('Enter task name!');
        } else {
            this.props.onAddTask(this.state.inputValue);
        }
        this.setState({inputValue : ""})
    };

    onInputChange = (e) => {
        let inputValue = e.currentTarget.value.replace(/^\s+|\s+$/g, '');
        this.setState({inputValue: inputValue});

    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input onChange={this.onInputChange}
                           type="text"
                           placeholder="New task name"
                           value={this.state.inputValue}
                    />
                    <button onClick={this.onAddClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

