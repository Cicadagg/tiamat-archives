import {applyMiddleware,legacy_createStore as createStore} from "redux";
import { rootReducer } from "./reducers/root-reducer";
import thunk from "redux-thunk"
export const store = createStore(rootReducer,applyMiddleware(thunk))