import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxMulti from 'redux-multi'
import rootReducer from '../reducers';

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(thunk, reduxMulti))
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}

  return store;
}