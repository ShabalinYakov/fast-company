import { CommentsProvider } from "../../../hooks/useComments";
import QualitiesCard from "../../ui/qualitiesCard";
import { getUserById } from "../../../store/users";
import MeetingsCard from "../../ui/meetingsCard";
import { useSelector } from "react-redux";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import PropTypes from "prop-types";
import React from "react";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
