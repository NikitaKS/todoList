import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props){
        super(props);
        this.newTaskTitleRef = React.createRef();
        // setTimeout(()=>{
        //     let newTask = {text: '111', Done: false, priority: 'low'};
        //     let newtask = [...this.state.t, newTask];
        //     this.setState({
        //         t:newtask
        //     })
        // },2000);
    }
    state = {
        t : [
            {text: 'aaa', Done: true, priority: 'low'},
            {text: 'bbb', Done: true, priority: 'medium'},
            {text: 'ccc', Done: false, priority: 'high'},
            {text: 'fff', Done: false, priority: 'low'},
            {text: 'ggg', Done: true, priority: 'low'},
        ],
        filter : 'all'
    };
     onAddTaskClick = ()=>{
         // let newText = this.newTaskTitleRef.current.value;
         let newTask = {text: this.newTaskTitleRef.current.value, Done: false, priority: 'low'};
         this.newTaskTitleRef.current.value = '';
         let newtask = [...this.state.t, newTask];
         this.setState({
             t:newtask
         })
     };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskClick}>Add</button>
                        </div>
                    </div>
                    {/*<TodoListHeader/>*/}
                    <TodoListTasks tt={this.state.t}/>
                    <TodoListFooter filter={this.state.filter}/>
                </div>
            </div>
        );
    }
}

export default App;

