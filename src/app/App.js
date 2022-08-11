import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./components/users";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    );
}

export default App;
