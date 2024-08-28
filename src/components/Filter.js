import React from "react";

function Filter({ category, onCategoryChange }) {
  const filterCallback = e => onCategoryChange(e.target.value);
  return (
    <div className="Filter">
      <select
        name="filter"
        value={category}
        onChange={filterCallback}
      >
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
      <button className="remove" value="All" onClick={filterCallback}>Clear filter</button>
    </div>
  );
}

export default Filter;
