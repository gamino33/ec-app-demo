import {signInAction} from "./actions";
import {push} from "connected-react-router";

export const signIn = () => {
    return async (dispatch, getState) =>{
        const state = getState();
        const isSignedIn = state.users.inSignedIn;

        if(!isSignedIn){
            const url = "https://api.github.com/users/gamino33";
            const response = await fetch(url)
                                    .then(res => res.json())
                                    .catch(() => null)

            const username = response.login
            dispatch(signInAction({
                isSignedIn: true,
                uid: "000001",
                username: username
            }));
            dispatch(push("/"));

        }
    }
}
