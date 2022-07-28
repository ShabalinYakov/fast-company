import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const renderListFromObject = (items) => {
        return Object.keys(items).map((item) => (
            <li
                key={items[item][valueProperty]}
                className={
                    "list-group-item" +
                    (items[item] === selectedItem ? " active" : "")
                }
                onClick={() => onItemSelect(items[item])}
                role="button"
            >
                {items[item][contentProperty]}
            </li>
        ));
    };

    const renderListFromArray = (items) => {
        return items.map((item) => (
            <li
                key={item[valueProperty]}
                className={
                    "list-group-item" + (item === selectedItem ? " active" : "")
                }
                role="button"
                onClick={() => onItemSelect(item)}
            >
                {item[contentProperty]}
            </li>
        ));
    };
    return (
        <ul className="list-group">
            {Array.isArray(items)
                ? renderListFromArray(items)
                : renderListFromObject(items)}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
export default GroupList;
