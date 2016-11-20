import React from 'react'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import chordReducer from './reducers/chord-reducer'

import { timerMiddleware } from './timers.js'

require('./css/style.css')

import App from './containers/App.jsx'
import ChordDrill from './containers/ChordDrill.jsx'
import Splash from './components/Splash.jsx'
import Login from './containers/Login.jsx'

const middleware = [timerMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    chordDrill: chordReducer,
  }),
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />      
        <Route path="login" component={Login} />
        <Route path="chord-drill/(:filter)" component={ChordDrill} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
