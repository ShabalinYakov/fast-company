import ProtectedRoute from "./components/common/protectedRoute";
import { ProfessionProvider } from "./hooks/useProfession";
import { Route, Switch, Redirect } from "react-router-dom";
import { QualitiesProvider } from "./hooks/useQualities";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import LogOut from "./layouts/logOut";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import React from "react";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
