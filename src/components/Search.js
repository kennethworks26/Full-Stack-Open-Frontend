import React from "react";

const Search = ({ handleSearchChange }) => {
  return (
    <div>
      <h2>Search</h2>
      <div>
        filter shown with <input onChange={handleSearchChange} />
      </div>
    </div>
  );
};
export default Search;
