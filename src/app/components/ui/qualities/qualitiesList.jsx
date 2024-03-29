import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Quality from "./quality";
import React, { useEffect } from "react";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading...";
    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
