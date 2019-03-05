import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import simpleReducer from './reducers/simpleReducer';


export default function configureStore(initialState={}) {
 return createStore(
   simpleReducer,
   initialState,
   applyMiddleware(thunk)
 );
}
