import Users from "./pages/Users";
import AuthContext from "./state/auth-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Products from "./pages/Products";
import './App.css';

function App() {
  // Initialize state to an empty array
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  // Use the useEffect hook to fetch data from the API
  useEffect(() => {
    //get users data from api
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        // Update the state with the fetched data
        setUserData(res.data.users);
      })
      .catch((error) =>
      // handle error
      console.log(error)
      );

    //get products data from api
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        // Update the state with the fetched data
        setProductData(res.data.products);
      })
      .catch((error) =>
        // handle error
        console.log(error)
      );
  }, []);
  return (
    // Wraps the react-router-dom Router
    // component with the Provider to avail all data to paths
    <AuthContext.Provider
      value={{
        users: userData,
        products: productData,
      }}
    >
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
