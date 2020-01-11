import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    state = {
        isHidden: false
    };
    onAllFilterClick = () => {
        this.props.changeFilterValue('all')
    };
    onCompletedFilterClick = () => {
        this.props.changeFilterValue('completed')
    };
    onActiveFilterClick = () => {
        this.props.changeFilterValue('active')
    };
    onShowFiltersClick = () => {
        this.setState({
            isHidden:true
        })
    };
    onHideFiltersClick = () => {
        this.setState({
            isHidden:false
        })
    };
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
            default:
                filter1 = 'filter-active';
                break;
        }
        return (
            <div className="todoList-footer">
                {!this.state.isHidden === true && <div>
                    <button onClick={this.onAllFilterClick} className={filter1}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={filter2}>Completed</button>
                    <button onClick={this.onActiveFilterClick } className={filter3}>Active</button>
                    {!this.state.isHidden && <button onClick={this.onShowFiltersClick}>hide</button>}

                </div> }
                {this.state.isHidden && <button onClick={this.onHideFiltersClick}>show</button>}


            </div>
        );
    }
}

export default TodoListFooter;

