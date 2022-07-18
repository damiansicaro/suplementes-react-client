import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { registerAccount } from '../services/accounts';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const RegisterForm = () => {

  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()
  return (
    <div style={{ margin: '1em' }}>
      {enviando && <Spinner animation='border' />}
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(values) =>{
          setEnviando(true)
          registerAccount(values)
            .then((res) => {
              setEnviando(false)             
              if (res.ok) {
                alert("Cuenta Creada");
                navigate("/login")
              }
              if (!res.ok && res.status === 401) {
                alert("El mail ya existe")
              }
            })
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'No puede superar los 15 caracteres')
            .required('El nombre es obligatorio.'),
          email: Yup.string()
            .email('Dirección de email invalida.')
            .required('La dirección de email es obligatoria.'),
          password: Yup.string()
            .required('Es necesario que indiques un password.'),
        })}
      >
        {(formik, isSubmitting) => (
          <Container>
            <Row className="justify-content-md-center">
              <Col lg="6">
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Nombre de Usuario</label>
                    <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="invalid-feedback">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} type="email" />
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
    </div>
  );
};

export default RegisterForm;