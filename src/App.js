
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsCards from "./components/ProductCards";
import RegisterForm from "./components/RegisterForm";
import ProductPage from "./components/ProductPage";
import EditProduct from "./components/EditProduct";
import LogoutPage from "./components/Logout";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Footer from "./components/Footer"

import UserContext from "./UserContext";;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{
        user,
        setUser
      }}>
        <Header />
        <Router>
          <Routes>
            <Route index element={<ProductsCards />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/products/new' element={<EditProduct />} />
            <Route path='/products/:productId' element={<ProductPage />} /> 
            <Route path='/products/edit/:productId' element={<EditProduct />} /> 
          </Routes>
        </Router>
      </UserContext.Provider>
      <Footer />
    </>
  );
}



export default App;
