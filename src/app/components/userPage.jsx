import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <div className="m-3">
                    <h1>{user.name}</h1>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div>
                        <QualitiesList qualities={user.qualities} />
                    </div>
                    <div className="mt-1">
                        Встретился, раз: {user.completedMeetings}
                    </div>
                    <div className="mt-1">Оценка: {user.rate}</div>
                </div>
                <button
                    className="btn btn-primary ms-2 mt-2"
                    onClick={handleAllUsers}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
