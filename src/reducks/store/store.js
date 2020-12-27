import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { ProductsReducer} from "../products/reducers"
import { UsersReducer } from "../users/reducers";
import thunk from "redux-thunk";

export default function CreateStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            products: ProductsReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
};
