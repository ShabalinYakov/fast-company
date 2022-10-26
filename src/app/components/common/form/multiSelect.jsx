import React from "react";
import Select from "react-select";
import { PropTypes } from "prop-types";

const MultiSelect = ({ label, options, onChange, name, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                name={name}
                options={optionsArray}
                onChange={handleChange}
                classNamePrefix="select"
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                className="basic-multi-select"
            />
        </div>
    );
};
MultiSelect.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelect;
