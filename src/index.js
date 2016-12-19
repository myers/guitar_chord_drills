import 'babel-polyfill'

import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import React from 'react'

import chordReducer from './reducers/chord-reducer'

import userAudioReducer from './user_audio/reducers'
import UserAudioProvider from './user_audio/components'
import UserAudio from './user_audio/user_audio'
import userAudioSaga from './user_audio/saga'

import { timerMiddleware } from './timers.js'

require('./css/style.css')

import App from './containers/App'
import Splash from './components/Splash'
import Login from './containers/Login'
import MicSetup from './containers/MicSetup'
import ChordDrill from './containers/ChordDrill'
import TodaysChords from './components/TodaysChords'

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

const userAudio = new UserAudio()

sagaMiddleware.run(userAudioSaga(userAudio))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <UserAudioProvider userAudio={userAudio}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Splash} />
          <Route path='mic-setup' component={MicSetup} />
          <Route path='login' component={Login} />
          <Route path='todays-chords' component={TodaysChords} />
          <Route path='chord-drill' component={ChordDrill} />
        </Route>
      </Router>
    </UserAudioProvider>
  </Provider>,
  document.getElementById('root')
)
