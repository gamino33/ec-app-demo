import React from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import  {Header} from "./components/Header"

const App = () => {
    return(
        <>
            <Header />
            <Router />
        </>
    )
};

export default App;
