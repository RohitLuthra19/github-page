import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import { getProfileWatcherSaga } from "./user/sagas-get-user-profile";
import { getRepositoriesWatcherSaga } from "./user/sagas-get-repositories"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(getProfileWatcherSaga);
sagaMiddleware.run(getRepositoriesWatcherSaga);

export default store;