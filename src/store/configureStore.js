import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import allReducers from '../features/index';


export default function configureStore(initialState) {
  const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  if (isDev){
	return createStore(
		allReducers,
		initialState,
		compose(
		  applyMiddleware(thunk),
		 (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
		)
	);
  } else {
	return createStore(
		allReducers,
		initialState,
		applyMiddleware(thunk)
		);
  }

}
