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
                <button onClick={()=>this.props.changeFilterValue('all')} className={filter1}>All</button>
                <button onClick={()=>this.props.changeFilterValue('completed')} className={filter2}>Completed</button>
                <button onClick={()=>this.props.changeFilterValue('active')} className={filter3}>Active</button>
            </div>

        );
    }
}

export default TodoListFooter;

