import React, { useState, useEffect } from "react";
import UserCard from "../../ui/userCard";
import PropTypes from "prop-types";
import api from "../../../api";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                    </div>
                    <div className="col-md-8">Comments</div>
                </div>
            </div>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
