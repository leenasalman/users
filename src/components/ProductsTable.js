import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import * as Icon from "react-bootstrap-icons";
import EntriesFilter from "./EntriesFilter";
import "./UsersTable.css";
import Container from "./Container";

function ProductsTable(props) {
  const [prodData, setProdData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(5);
  const [filter, setFilter] = useState({
    key: "",
    value: "",
  });
  const [viewInput, setViewInput] = useState(false);
  const options = [5, 10, 15, 20];
  let pageCount = Array.from(
    { length: Math.ceil(props.products.length / selectedValue) },
    (_, i) => i + 1
  );
  let category = [];
  props.products.forEach((c) => {
      if (!category.includes(c.category)) {
        category.push(c.category);
      }
  });
  useEffect(() => {
    //fetching selected number of users
    const getProds = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${selectedValue}`
      );
      const data = await res.data.products;
      setProdData(data);
    };
    getProds();

  }, []);


  const fetchProdData = async (currentPage) => {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${selectedValue}&skip=${
        5 * currentPage
      }`
    );
    const data = await res.data.products;
    return data;
  };
  const fetchSelectedFilteredProds = async (filterValue, filterKey) => {
    const res = await axios.get(
      `https://dummyjson.com/products/${filterKey}/${filterValue}`
    );
    const data = await res.data.products;
    setFilter({ key: "", value: "" });
    return data;
  };
  const handleFiltersChange = async (e) => {
    let currentFilterValue = e.target.value;
    let currentFilterKey =
      e.target.options[e.target.selectedIndex].dataset.value;
    const fetchFilteredUsers = await fetchSelectedFilteredProds(
      currentFilterValue,
      currentFilterKey
    );
    setFilter({ key: currentFilterKey, value: currentFilterValue });
    setProdData(fetchFilteredUsers);
  };
  //handling pagination
  const handlePageClick = async (data) => {
    //return page number
    let currentPage = data.selected;
    const fetchNewUsers = await fetchProdData(currentPage);
    setProdData(fetchNewUsers);
  };
  const changeEntry = (entry) => {
    setProdData(entry.products);
    setSelectedValue(entry.length);
    setFilter({key:"", value:""});
  };
  return (
    <>
      <Container>
        <div>
          <p>Home/Products</p>
        </div>
        <div className="filters-area">
          <EntriesFilter
            EntriesOptions={options}
            onEntriesChange={changeEntry}
            Entry={"products"}
          />
          <p> Entries </p>
          <div
            className={
              viewInput ? "filter-area__search show" : "filter-area__search"
            }
          >
            <input
              className={viewInput ? "show" : "hide-input"}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="filter-area__search-icon">
              <button
                className="icon-btn"
                onClick={() => setViewInput(!viewInput)}
              >
                <Icon.Search />
              </button>
            </div>
          </div>
          <select value={filter.value} onChange={handleFiltersChange}>
            <option value="">Category</option>
            {category.map((cat) => (
              <option
                key={cat + "__" + Math.random()}
                value={cat}
                data-value="category"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
        <table className="table-area">
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>brand</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {prodData &&
              prodData
                .filter((prod) => {
                  return searchValue.toLowerCase() === ""
                    ? prod
                    : prod.title.toLowerCase().includes(searchValue) ||
                    prod.brand.toLowerCase().includes(searchValue) ||
                    prod.category.toLowerCase().includes(searchValue);
                })
                .map((prod) => {
                  return (
                    <tr key={prod.id} className="users-values">
                      <td>{prod.id}</td>
                      <td>{prod.title}</td>
                      <td>{prod.brand}</td>
                      <td>{prod.category}</td>
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

export default ProductsTable;
