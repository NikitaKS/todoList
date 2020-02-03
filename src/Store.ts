import {applyMiddleware, combineReducers, createStore} from "redux";
import  {ThunkMiddleware} from 'redux-thunk';
import reducer from "./redux/reducer";
import {ActionsTypes} from "./types/actionsTypes";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    todolists: reducer
});
export type AppState = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, ActionsTypes>));



export default store;