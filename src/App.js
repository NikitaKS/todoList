import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    nextTaskId = 0;
    state = {
        t: [],
        filter: 'all',
    };

    saveState = () => {
        let saveAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', saveAsString)
    };
    restoreState = () => {
        let state = {
            t: [],
            filter: 'all',
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            state.t.forEach(item => {
                if (item.id >= this.nextTaskId) {
                    this.nextTaskId = item.id + 1;
                }
            })
        });

        // if (state.t.length){
        //     let id = state.t.reduce(function (p, v) {
        //         return ( p > v.id ? p : v.id );
        //     });
        //     this.nextTaskId = id+1;
        // }
    };
    onAddTask = (newText, pr) => {
        let newTask = {id: this.nextTaskId, text: newText, Done: false, priority: pr};
        this.nextTaskId++;
        let newtask = [...this.state.t, newTask];
        this.setState({
            t: newtask,
        }, () => {
            this.saveState()
        });
    };
    changeFilterValue = (newFilterValue) => {
        this.setState({
            filter: newFilterValue
        }, () => {
            this.saveState()
        })
    };
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {Done: status})
    };
    changeTaskTitle = (taskId, text) => {
        this.changeTask(taskId, {text: text});

    };
    changeTask = (taskId, obj) => {
        let newTasks = this.state.t.map(item => {
            if (item.id !== taskId) {
                return item;
            } else return {...item, ...obj};
        });
        this.setState({
            t: newTasks
        }, () => {
            this.saveState()
        })
    };
    deleteTask = (taskId) => {
        let newTasks = this.state.t.filter(item => {
            if (item.id !== taskId) return item;
        });
        this.nextTaskId = 0;
        newTasks.map((item, index) => {
            item.id = index;
            this.nextTaskId = index + 1;
        });
        this.setState({
            t: newTasks
        }, () => {
            this.saveState()
        });

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
                    <TodoListTasks changeTaskTitle={this.changeTaskTitle} deleteTask={this.deleteTask}
                                   changeStatus={this.changeStatus}
                                   tt={getFilteredTasks(this.state.t, this.state.filter)}/>
                    <TodoListFooter changeFilterValue={this.changeFilterValue} filter={this.state.filter}/>
                </div>
            </div>
        );
    }
}

export default App;

