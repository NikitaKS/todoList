import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    t = [
        {text: 'aaa', Done: true, priority: 'low'},
        {text: 'bb', Done: true, priority: 'medium'},
        {text: 'cc', Done: false, priority: 'high'},
        {text: 'fff', Done: false, priority: 'low'},
        {text: 'f1111f', Done: false, priority: 'low'},
    ];
    filter = 'all';
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tt={this.t}/>
                    <TodoListFooter filter={this.filter}/>
                </div>
            </div>
        );
    }
}

export default App;

