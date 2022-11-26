import ProtectedRoute from "./components/common/protectedRoute";
import { ProfessionProvider } from "./hooks/useProfession";
import { Route, Switch, Redirect } from "react-router-dom";
import { loadQualitiesList } from "./store/qualities";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import React, { useEffect } from "react";
import LogOut from "./layouts/logOut";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
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
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
