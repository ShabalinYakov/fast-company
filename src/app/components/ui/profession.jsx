import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
