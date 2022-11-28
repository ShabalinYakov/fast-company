import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);

    return <h1>Loading...</h1>;
};

export default LogOut;
