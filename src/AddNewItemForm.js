import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {
    state = {
        inputValue: '',
        error: false,
        priority: 'low'
    };
    onAddClick = () => {
        if (this.state.inputValue.replace(/^\s+|\s+$/g, '') === '') {
            this.setState({
                error: true,
            });
        } else {
            this.props.onAddItem(this.state.inputValue, this.state.priority);
            this.setState({
                error: false
            })
        }
        this.setState({inputValue: "",priority: 'low'})
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
                <button onClick={()=>this.setState({priority:'low'})}>low</button>
                <button onClick={()=>this.setState({priority:'high'})}>high</button>
                <button onClick={()=>this.setState({priority:'medium'})}>medium</button>
            </div>

        );
    }
}

export default AddNewItemForm;

