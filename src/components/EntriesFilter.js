import React, { useState } from "react";
import axios from "axios";
import "./EntriesFilter.css";

function EntriesFilter(props) {
  const [selectedValue, setSelectedValue] = useState(5);
  let url =
    props.Entry === "users"
      ? "https://dummyjson.com/users?limit="
      : "https://dummyjson.com/products?limit=";
  const fetchSelectedNumberOfUsersData = async (selectedValueOfUsers) => {
    const res = await axios.get(
      `${url}+${selectedValueOfUsers}`
    );
    const data = await res.data;
    return data;
  };
  //handle number of users filter
  const handleChange = async (e) => {
    let currentSelectedValue = e.target.value;
    const fetchSelectedUsers = await fetchSelectedNumberOfUsersData(
      currentSelectedValue
    );
    setSelectedValue(currentSelectedValue);
    props.onEntriesChange(fetchSelectedUsers);
    // setUserData(fetchSelectedUsers);
  };
  return (
    <>
      <select value={selectedValue} onChange={handleChange}>
        {props.EntriesOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default EntriesFilter;
