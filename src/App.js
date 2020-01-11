import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC} from "./Store";

class App extends React.Component {

    // componentDidMount() {
    //     this.app = JSON.parse(localStorage.getItem('todolists'));
    //
    //     if (localStorage.getItem('todolists')) {
    //         this.setState({
    //             toDoLists: this.app.toDoLists
    //         });
    //         this.app.toDoLists.forEach(item => {
    //             if (item.id >= this.id) {
    //                 this.id = item.id + 1
    //             }
    //         })
    //     } else {
    //         this.setState({
    //             toDoLists: [
    //                 {title: 'What to do?', id: this.id},
    //             ]
    //         }, () => this.id = 1)
    //     }
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem('todolists', JSON.stringify(nextState));
    // }

    // state = {
    //     toDoLists: []
    // };
    id = 2;
    addTodoList = (title) => {
        let newToDoList = {title: title, id: this.id, tasks:[]};
        this.id++;
        this.props.addNewToDoList(newToDoList);
        // let newToDoLists = [...this.state.toDoLists, newToDoList];
        // this.setState({
        //     toDoLists: newToDoLists
        // })
    };
    render = () => {
        let todolists = this.props.toDoLists.map(item => {
            return <ToDoList key={item.id} id={item.id} title={item.title} tasks={item.tasks}/>
        });
        return (
            <div>
                <div>
                    <AddNewItemForm onAddItem={this.addTodoList}/>
                </div>
                <div className="App">
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
        addNewToDoList: (newToDoLists) => {
            dispatch(addTodolistAC(newToDoLists))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

