import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.RefInput = React.createRef();
    }

    state = {
        t: [
            {text: 'First Lesson', Done: true, priority: 'low'},
            {text: 'Second Lesson', Done: true, priority: 'medium'},
            {text: 'Third Lesson', Done: true, priority: 'high'},
            {text: '4th Lesson', Done: false, priority: 'low'},
        ],
        filter: 'all',
    };
    onAddTask = (newText) => {
        let newTask = {text: newText, Done: false, priority: 'high'};
        let newtask = [...this.state.t, newTask];
        this.setState({
            t: newtask
        });
    };
    changeFilterValue = (newFilterValue) => {
        this.setState({
            filter: newFilterValue
        })
    };
    changeStatus = (task, status) => {
        let newTasks = this.state.t.map(item => {
            if (item !== task) {
                return item;
            } else return {...item, Done: status};
        });
        this.setState({
            t: newTasks
        })
    };
    render = () => {
        const getFilteredTasks = (tasks, filter) => {
            return tasks.filter(item => {
                switch (filter) {
                    case ('all'):
                        return true;
                    case ('completed'):
                        return item.Done;
                    case ('active'):
                        return !item.Done;
                }
            })
        };
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTask={this.onAddTask} addNewText={this.addNewText}/>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   tt={getFilteredTasks(this.state.t, this.state.filter)}/>
                    <TodoListFooter changeFilterValue={this.changeFilterValue} filter={this.state.filter}/>
                </div>
            </div>
        );
    }
}

export default App;

