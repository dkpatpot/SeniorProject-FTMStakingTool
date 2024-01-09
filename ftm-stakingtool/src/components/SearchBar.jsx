import React from "react";
import SearchIcon from '@mui/icons-material/Search';
function SearchBar() {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control "
        placeholder="Search by addresses, transactions, and blocks"
        aria-label="Search by addresses, transactions, and blocks"
        aria-describedby="basic-addon2"
      ></input>
      <div className="input-group-append">
        <button className="btn btn-warning" type="button">
          <SearchIcon/>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
