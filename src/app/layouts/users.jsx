import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const id = params.userId;
    return <>{id ? <UserPage id={id} /> : <UsersList />}</>;
};

export default Users;
