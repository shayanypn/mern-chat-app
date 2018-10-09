import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory';

import configureStore from './store/configureStore';
import { createHashHistory } from 'history';

import Main from './Main';

// create history
const history = createHashHistory({
  basname: '',
  hashType: 'slash'
});

const middleware = routerMiddleware(history);

//Include bootstrap's css 
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
//Include bootstrap's js
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';



const store = configureStore({
	loading: {
		isloading: false
	}
});


/**
 * Observer Middleware
 */
const createObserver = store => (selector, callback) => {
    let oldState = {}
    return store.subscribe(() => {
        let selectedState = selector(store.getState())
        Object.entries(selectedState).map(([key, value]) => {
            if (oldState[key] !== value) {
                callback(value, oldState[key])
                oldState[key] = value;
            }
        })
    })
}
const observer = createObserver(store)

render((
	<Provider store={store}>
		<HashRouter>
			<Main observer={observer} />
		</HashRouter>
	</Provider>
), document.getElementById('root'));
