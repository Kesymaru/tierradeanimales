import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux";

/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
const AuthMiddleware: Middleware = (store: MiddlewareAPI) =>
    (next: Dispatch) =>
        (action: AnyAction) => {
            console.log('AuthMiddleware', action);

            if (!action.delay) {
                return next(action)
            }

            const timeoutId = setTimeout(() => {
                console.log('delayed action', action);

                typeof action.action === 'function'
                    ? next(action.action())
                    : next(action)
            }, action.delay);

            return function cancel() {
                clearTimeout(timeoutId)
            }
        };

export default AuthMiddleware;
