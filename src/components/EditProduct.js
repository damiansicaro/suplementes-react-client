import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { createProduct, updateProduct, getProduct } from '../services/products';
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const isAddMode = !productId;
  const emptyProduct = { id: '', title: '', description: '', price: '0.00', stock: '0', imageUrl: '' }
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, 'No puede superar los 50 caracteres')
      .required('El Título es obligatorio.'),
    description: Yup.string()
      .required('La Description es obligatoria.'),
    price: Yup.string()
      .required('Es necesario que indiques un Precio.'),
  })
  const formikRef = useRef();


  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting);
    } else {
      updateUser(productId, fields, setSubmitting);
    }
  }


  function createUser(fields, setSubmitting) {
    createProduct(fields)
      .then(() => {
        alert('Product Created');
        navigate('/');
      })
      .catch((error) => {
        setSubmitting(false);
        alert(error);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    updateProduct(id, fields)
      .then(() => {
        alert('Product updated');
        navigate('/');
      })
      .catch(error => {
        setSubmitting(false);
        alert(error);
      });
  }
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (!isAddMode) {
      getProduct(productId)
        .then(prod => {
          setProduct(prod)
          let c = formikRef.current
          c.setFieldValue('title', prod.title);
          c.setFieldValue('description', prod.description);
          c.setFieldValue('price', prod.price);
          c.setFieldValue('stock', prod.stock);
          c.setFieldValue('imageUrl', prod.imageUrl);
        })
    }
  }, []);
  return (

    <div style={{ margin: '1em' }}>
      <Formik initialValues={product} onSubmit={onSubmit} validationSchema={validationSchema} innerRef={formikRef}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          values,
          touched,
          isInvalid,
          isSubmitting,
          isValidating,
          submitCount,
          errors
        }) => (
          <Container>
            <Row className="justify-content-md-center">
              <Col lg="6">
                <Form>
                  <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <Field
                      name="title"
                      className={(touched.title && errors.title) ? 'form-control is-invalid' : 'form-control'}
                      type="text" />
                    {touched.title && errors.title ? (
                      <div className="invalid-feedback">{errors.title}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <Field
                      name="description"
                      className={(touched.description && errors.description) ? 'form-control is-invalid' : 'form-control'}
                      type="description" />
                    {touched.description && errors.description ? (
                      <div className="invalid-feedback">{errors.description}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <Field
                      name="price"
                      type="number"
                      className={(touched.price && errors.price) ? 'form-control is-invalid' : 'form-control'} />
                    {touched.price && errors.price ? (
                      <div className="invalid-feedback">{errors.price}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <Field
                      name="stock"
                      type="number"
                      className={(touched.stock && errors.stock) ? 'form-control is-invalid' : 'form-control'} />
                    {touched.stock && errors.stock ? (
                      <div className="invalid-feedback">{errors.stock}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="imageUrl">URL de la imagen</label>
                    <Field
                      name="imageUrl"
                      type="description"
                      className={(touched.imageUrl && errors.imageUrl) ? 'form-control is-invalid' : 'form-control'} />
                    {touched.imageUrl && errors.imageUrl ? (
                      <div className="invalid-feedback">{errors.imageUrl}</div>
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

export default EditProduct;
