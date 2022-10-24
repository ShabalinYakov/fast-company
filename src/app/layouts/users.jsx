import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const id = params.userId;
    return <>{id ? <UserPage id={id} /> : <UsersListPage />}</>;
};

export default Users;
