import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {AppState} from "./Store";
import {addTodoListTC, setTodoListsTC} from "./redux/reducer";
import {ActionsTypes, ITodo} from "./types/actionsTypes";
import {ThunkDispatch} from 'redux-thunk';

interface IMapStateProps {
    toDoLists: ITodo[]
}

interface IMapDispatchProps {
    addNewToDoList: (title: string) => void;
    setTodoLists: () => void;
}

class App extends React.Component<IMapStateProps & IMapDispatchProps> {

    componentDidMount() {
        this.props.setTodoLists();
    }

    addTodoList = (title: string) => {
        this.props.addNewToDoList(title)
    };
    render = () => {
        let todolists = this.props.toDoLists.map((item,index) => {
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

const mapStateToProps = (state: AppState): IMapStateProps => {
    return {
        toDoLists: state.todolists.toDoLists
    }
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsTypes>): IMapDispatchProps => {
    return {
        addNewToDoList: (title: string) => {
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

