import React from 'react';
import './App.css';

class ToDoListTitle extends React.Component {
    state = {
        editMode: false,
        inputValue: this.props.title
    };
    onTitleChange = (e) => {
        this.setState({inputValue: e.currentTarget.value})
    };
    activateEditMode = () => {
        this.setState({editMode: true})
    };
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeListTitle(this.state.inputValue)
    };

    render = () => {
        return (
            <div className='todolist-title-in'>
                {
                    this.state.editMode ?
                        <input onBlur={this.deactivateEditMode} onChange={this.onTitleChange}
                               autoFocus={true} type="text" value={this.state.inputValue}/> :
                        <div className='todolist-title-text'>
                            <h2 onClick={this.activateEditMode}
                                className="todoList-header__title"> {this.state.inputValue}</h2>
                            <button onClick={this.props.delete}>X</button>
                        </div>
                }
            </div>

        );
    }
}

export default ToDoListTitle;

