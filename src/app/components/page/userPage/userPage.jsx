import React, { useState, useEffect } from "react";
import Qualities from "../../ui/qualities";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <div className="m-3">
                    <h1>{user.name}</h1>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div>
                        <Qualities qualities={user.qualities} />
                    </div>
                    <div className="mt-1">
                        Встретился, раз: {user.completedMeetings}
                    </div>
                    <div className="mt-1">Оценка: {user.rate}</div>
                </div>
                <Link to={`${id}/edit`}>
                    <button className="btn btn-primary ms-2 mt-2">
                        Изменить
                    </button>
                </Link>
            </>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
