import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import login from './reducers/login';

export default function configureStore(initialState={}) {
 return createStore(
   login,
   initialState
 );
}
