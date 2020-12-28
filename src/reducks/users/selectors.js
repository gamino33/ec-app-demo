import {createSelector} from "reselect";

const usersSelector = (state) => state.users;

export const getFavoriteProducts = createSelector(
    [usersSelector],
    state => state.favorite
);

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
);

export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
);

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
);
