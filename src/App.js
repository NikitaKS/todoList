import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props){
        super(props);
        this.RefInput = React.createRef();
        // setTimeout(()=>{
        //     let newTask= {text: 'oo12o', Done: false, priority: 'high'};
        //     let newtask = [...this.state.t,newTask];
        //     this.setState({
        //         t:newtask
        //     });
        // },2000)
        // let newTask = {text: 'aaa', Done: true, priority: 'low'};
        // let newtask = [...this.state.t, newTask];
        // this.setState({
        //    t:newtask
        // });

    }

    state = {
        t : [
            {text: 'aaa', Done: true, priority: 'low'},
            {text: 'bb', Done: true, priority: 'medium'},
            {text: 'cc', Done: false, priority: 'high'},
            {text: 'fff', Done: false, priority: 'low'},
            {text: 'ooo', Done: false, priority: 'high'},
        ],
        filter : 'all',
    };
    onAddTask = () =>{
        this.RefInput.current.value = this.RefInput.current.value.replace(/^\s+|\s+$/g, '');
        if(this.RefInput.current.value !== ''){
            let newText= this.RefInput.current.value;
            let newTask = {text: newText, Done: true, priority: 'low'};
            this.RefInput.current.value = '';
            let newtask = [...this.state.t, newTask];
            this.setState({
                t:newtask
            });
        } else this.RefInput.current.value = alert('Enter task name');
        this.RefInput.current.value = '';

    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.RefInput} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTask}>Add</button>
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

