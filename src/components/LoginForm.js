import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/accounts';
import UserContext from "../UserContext";

const LoginForm = () => {


    const [enviando, setEnviando] = useState(false)
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext);
      useEffect(()=> {
        if (user !==  null) navigate("/")
      }, [navigate, user])
      
    return (
      <div style={{ margin: '1em' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            setEnviando(true)
            login(values)
              .then(response => {
                setEnviando(false)
                
                if (response.ok && response.status === 200) response.text().then(userInfo => {
                  let u = JSON.parse(userInfo)
                  console.log('userInfo: ', u)
                  setUser(JSON.parse(userInfo))
                  localStorage.setItem('user', userInfo) // almacenar el nombre completo del usuario y el JWT en el local storage para mantener al usuario logueado entre refresco de páginas.  
                  console.log('localStorage set:', localStorage.getItem('user'))
                  navigate("/")
  
                })
  
                if (!response.ok && response.status === 403) alert("Credenciales invalidas")
              })
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required('Es necesario que indiques un password.'),
            email: Yup.string()
              .email('Dirección de email invalida.')
              .required('La dirección de email es obligatoria.'),
          })}
        >
          {(formik, isSubmitting) => (
            <Container>
              {enviando && <Spinner animation='border' />}
              <Row className="justify-content-md-center">
                <Col lg="6">
                  <Form>
  
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      ) : null}
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <Field
                        name="password"
                        type="password"
                        className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'} />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                      ) : null}
                    </div>
  
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Por favor, espera..." : "Enviar"}</button>
                    </div>
  
                  </Form>
                </Col>
              </Row>
            </Container>
          )
          }
        </Formik >
      </div >
    );
  };

  export default LoginForm