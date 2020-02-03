import React, {ChangeEvent} from 'react';
import './App.css';

interface IProps {
    onAddItem: (title: string) => void;
}

interface IState {
    inputValue: string;
    error: boolean;
}

class AddNewItemForm extends React.Component<IProps, IState> {
    state = {
        inputValue: '',
        error: false,
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
    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value.trimLeft();
        this.setState({inputValue: inputValue});
        this.setState({
            error: false
        })
    };
    key = (e: React.KeyboardEvent) => {
        let key = (e.key === 'Enter') ? this.onAddClick() : '';
    };
    render = () => {
        let inputError = this.state.error ? 'error' : '';
        return (
            <div className="todoList-header-input">
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.key} className={inputError} onChange={this.onInputChange}
                           type="text"
                           placeholder="New item name"
                           value={this.state.inputValue}
                    />
                    <button onClick={this.onAddClick}>Add</button>

                </div>
                {this.state.error && <span>Enter task name</span>}
            </div>

        );
    }
}

export default AddNewItemForm;

