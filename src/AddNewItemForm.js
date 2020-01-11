import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {
    state = {
        inputValue: '',
        error: false
    };
    onAddClick = () => {
        if (this.state.inputValue.replace(/^\s+|\s+$/g, '') === '') {
            this.setState({
                error: true,
            });
        } else {
            this.props.onAddItem(this.state.inputValue);
            this.setState({
                error: false
            })
        }
        this.setState({inputValue: ""})
    };
    onInputChange = (e) => {
        let inputValue = e.currentTarget.value.trimLeft();
        this.setState({inputValue: inputValue});
        this.setState({
            error: false
        })
    };
    key = (e) => {
        let key = (e.key === 'Enter') ? this.onAddClick() : '';
    };
    render = () => {
        let inputError = this.state.error ? 'error' : '';
        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.key} className={inputError} onChange={this.onInputChange}
                           type="text"
                           placeholder="New item name"
                           value={this.state.inputValue}
                    />
                    <button onClick={this.onAddClick}>Add</button>

                </div>
                {this.state.error &&<span>Enter task name</span>}
            </div>

        );
    }
}

export default AddNewItemForm;

