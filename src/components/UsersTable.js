import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import * as Icon from "react-bootstrap-icons";
import EntriesFilter from "./EntriesFilter";
import "./UsersTable.css";
import Container from "./Container";

function UsersTable(props) {
  const [userData, setUserData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(5);
  const [filter, setFilter] = useState({
    key: "",
    value: "",
  });
  const [viewInput, setViewInput] = useState(false);
  const options = [5, 10, 15, 20];
  const genders = ["female", "male"];
  let pageCount = Array.from(
    { length: Math.ceil(props.users.length / selectedValue) },
    (_, i) => i + 1
  );

  useEffect(() => {
    //fetching selected number of users
    const getUsers = async () => {
      const res = await axios.get(
        `https://dummyjson.com/users?limit=${selectedValue}`
      );
      const data = await res.data.users;
      setUserData(data);
    };
    getUsers();
  }, []);

  const fetchUserData = async (currentPage) => {
    const res = await axios.get(
      `https://dummyjson.com/users?limit=${selectedValue}&skip=${
        5 * currentPage
      }`
    );
    const data = await res.data.users;
    return data;
  };
  const fetchSelectedFilteredUsers = async (filterValue, filterKey) => {
    const res = await axios.get(
      `https://dummyjson.com/users/filter?key=${filterKey}&value=${filterValue}`
    );
    const data = await res.data.users;
    setFilter({ key: "", value: "" });
    return data;
  };
  const handleFiltersChange = async (e) => {
    let currentFilterValue = e.target.value;
    let currentFilterKey =
      e.target.options[e.target.selectedIndex].dataset.value;
    const fetchFilteredUsers = await fetchSelectedFilteredUsers(
      currentFilterValue,
      currentFilterKey
    );
    setFilter({ key: currentFilterKey, value: currentFilterValue });
    setUserData(fetchFilteredUsers);
  };
  //handling pagination
  const handlePageClick = async (data) => {
    //return page number
    let currentPage = data.selected;
    const fetchNewUsers = await fetchUserData(currentPage);
    setUserData(fetchNewUsers);
  };
  const changeEntry = (entry) => {
    setUserData(entry.users);
    setSelectedValue(entry.length);
    setFilter({key:"", value:""});
  };
  return (
    <>
      <Container>
        <div>
          <p>Home/Users</p>
        </div>
        <div className="filters-area">
          <EntriesFilter
            EntriesOptions={options}
            onEntriesChange={changeEntry}
            Entry={"users"}
          />
          <p> Entries </p>
          <div className={viewInput ? "filter-area__search show": "filter-area__search"}>
            <input
            className={viewInput? "show": "hide-input"}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="filter-area__search-icon">
              <button className="icon-btn" onClick={()=>setViewInput(!viewInput)}>
                <Icon.Search />
              </button>
            </div>
          </div>

          <select value={filter.value} onChange={handleFiltersChange}>
            <option value="">Name</option>
            {props.users.map((user) => (
              <option
                key={user.id + "__" + Math.random()}
                value={user.firstName}
                data-value="firstName"
              >
                {user.firstName}
              </option>
            ))}
          </select>
          <select value={filter.value} onChange={handleFiltersChange}>
            <option value="">email</option>
            {props.users.map((user) => (
              <option
                key={user.id + "__" + Math.random()}
                value={user.email}
                data-value="email"
              >
                {user.email}
              </option>
            ))}
          </select>
          <select value={filter.value} onChange={handleFiltersChange}>
            <option value="">Birthdate</option>
            {props.users.map((user) => (
              <option
                key={user.id + "__" + Math.random()}
                value={user.birthDate}
                data-value="birthDate"
              >
                {user.birthDate}
              </option>
            ))}
          </select>
          <select value={filter.value} onChange={handleFiltersChange}>
            <option value="">Gender</option>
            {genders.map((gender) => (
              <option
                key={"__" + Math.random()}
                value={gender}
                data-value="gender"
              >
                {gender}
              </option>
            ))}
          </select>
        </div>
        <table className="table-area">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Maiden Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>email</th>
              <th>Username</th>
              <th>Bloodgroup</th>
              <th>Eyecolor</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData
                .filter((user) => {
                  return searchValue.toLowerCase() === ""
                    ? user
                    : user.firstName.toLowerCase().includes(searchValue) ||
                        user.lastName.toLowerCase().includes(searchValue) ||
                        user.maidenName.toLowerCase().includes(searchValue) ||
                        user.age
                          .toString()
                          .toLowerCase()
                          .includes(searchValue) ||
                        user.gender.toLowerCase().includes(searchValue) ||
                        user.email.toLowerCase().includes(searchValue) ||
                        user.username.toLowerCase().includes(searchValue) ||
                        user.bloodGroup.includes(searchValue) ||
                        user.eyeColor.toLowerCase().includes(searchValue);
                })
                .map((user) => {
                  return (
                    <tr key={user.id} className="users-values">
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.maidenName}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.bloodGroup}</td>
                      <td>{user.eyeColor}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={<Icon.ArrowLeft />}
          nextLabel={<Icon.ArrowRight />}
          breakLabel={"..."}
          pageCount={pageCount.length}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
}

export default UsersTable;
