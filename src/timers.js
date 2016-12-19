export const TIMER_START = 'TIMER_START'

export const timerStart = (name, endAction, howLongInSeconds) => ({
  type: TIMER_START,
  payload: {
    name,
    endDate: Date.now() + howLongInSeconds * 1000,
    endAction: endAction
  }
})

export const TIMER_CANCEL = 'TIMER_CANCEL'

export const timerCancel = (name) => ({
  type: TIMER_CANCEL,
  payload: {name}
})

// a timer will dispatch and action at the future date given
export function timerMiddleware ({dispatch, getState}) {
  const timers = {}

  return next => action => {
    if (action.type === TIMER_START) {
      const {name, endAction, endDate} = action.payload

      clearTimeout(timers[name])

      timers[name] = setTimeout(() => {
        dispatch(endAction)
      }, endDate - Date.now())
      return next(action)
    } else if (action.type === TIMER_CANCEL) {
      const {name} = action.payload

      clearTimeout(timers[name])
      return next(action)
    } else {
      return next(action)
    }
  }
}
