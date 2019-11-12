import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        let filter1, filter2, filter3;
        switch (this.props.filter) {
            case 'all':
                 filter1 = 'filter-active';
                break;
            case 'completed':
                 filter2 = 'filter-active';
                break;
            case 'active':
                 filter3 = 'filter-active';
                break;
        }
        return (
            <div className="todoList-footer">
                <button className={filter1}>All</button>
                <button className={filter2}>Completed</button>
                <button className={filter3}>Active</button>
            </div>

        );
    }
}

export default TodoListFooter;

