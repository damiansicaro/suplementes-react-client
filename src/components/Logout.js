import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "../UserContext";

const LogoutPage = () => {

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    setUser(null);
    localStorage.clear();
    setTimeout(navigate('/', 3000))
  }, [navigate, setUser])
  

  return (
    <div style={{ margin: '1em' }}>
      <h2>Hasta Luego</h2>
      <p>Cerraste la sesión con exito. </p><Link to={'/'}>Seguí navegando nuestros productos.</Link>
    </div>
  );
};

export default LogoutPage;