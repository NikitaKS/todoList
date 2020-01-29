import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, addTodoListTC, setTodolistsAC, setTodoListsTC} from "./Store";
import {api} from "./dal/api";

class App extends React.Component {

    componentDidMount() {
        this.props.setTodoLists();
    }

    addTodoList = (title) => {
            this.props.addNewToDoList(title)
    };
    render = () => {
        let todolists = this.props.toDoLists.map(item => {
            return <ToDoList key={item.id} id={item.id} title={item.title} tasks={item.tasks}/>
        });
        return (
            <div className="App">
                <div>
                    <AddNewItemForm onAddItem={this.addTodoList}/>
                </div>
                <div className='todoLists-wrapper'>
                    {todolists}
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        toDoLists: state.toDoLists
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addNewToDoList: (title) => {
           let thunk = addTodoListTC(title);
           dispatch(thunk)
        },
        setTodoLists() {
            let thunk = setTodoListsTC();
            dispatch(thunk)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

