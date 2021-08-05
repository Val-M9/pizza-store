import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(function Categories({ activeCategory, items, onClickItem }) {
  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? "active" : ""} onClick={() => onClickItem(null)}>
          Все
        </li>
        {items &&
          items.map((item, index) => (
            <li
              key={`${item}_${index}`}
              className={activeCategory === index ? "active" : ""}
              onClick={() => onClickItem(index)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.oneOfType([PropTypes.number, () => null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
