import React from 'react'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import chordReducer from './reducers/chord-reducer'
import userAudioReducer from './user_audio/reducers'

import { timerMiddleware } from './timers.js'

require('./css/style.css')

import 'babel-polyfill'

import App from './containers/App'
import ChordDrill from './containers/ChordDrill'
import Splash from './components/Splash'
import Login from './containers/Login'
import MicSetup from './containers/MicSetup'

const sagaMiddleware = createSagaMiddleware()

const middleware = [timerMiddleware, sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    chordDrill: chordReducer,
    routing: routerReducer,
    userAudio: userAudioReducer
  }),
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

import { audioContextSaga } from "./user_audio/saga.js"

sagaMiddleware.run(audioContextSaga)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="mic-setup" component={MicSetup} />
        <Route path="login" component={Login} />
        <Route path="chord-drill/(:filter)" component={ChordDrill} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
