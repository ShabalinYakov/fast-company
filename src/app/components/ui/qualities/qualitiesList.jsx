import { useQualities } from "../../../hooks/useQualities";
import PropTypes from "prop-types";
import Quality from "./quality";
import React from "react";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
