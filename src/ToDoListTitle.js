import React from 'react';
import './App.css';

class ToDoListTitle extends React.Component {

    render = () => {
        return (
            <div className='todolist-title-in'>
                <h3 className="todoList-header__title"> {this.props.title}</h3>
                <button onClick={this.props.delete}>X</button>
            </div>

        );
    }
}

export default ToDoListTitle;

