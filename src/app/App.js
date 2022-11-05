import { ProfessionProvider } from "./hooks/useProfession";
import { Route, Switch, Redirect } from "react-router-dom";
import { QualitiesProvider } from "./hooks/useQualities";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import React from "react";

function App() {
    return (
        <div>
            <NavBar />
            <QualitiesProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </QualitiesProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
