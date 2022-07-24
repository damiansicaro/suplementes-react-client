import React from 'react';

import { useEffect, useState, useContext } from 'react';

import { Button, Card, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, deleteProduct } from '../services/products';
import { ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import UserContext from "../UserContext";

const ProductPage = () => {

  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const { productId } = useParams()

  useEffect(() => {
    let mounted = true;
    getProduct(productId)
      .then(prod => {
        if (mounted) {
          setProduct(prod)
        }
      })
    return () => mounted = false;
  }, [productId])

  return (
    <div style={{ margin: '1em' }}>
      <Container>
        {(user !== null) ? <Row>
          <Col sm={{ span: 1, offset: 1 }} md={{ span: 3, offset: 9 }}>
            <ButtonGroup aria-label="Acciones para este producto">
              <Button onClick={() => navigate('/products/edit/' + product.id)}>Editar</Button>
              <Button onClick={() => deleteProduct(productId).then(() => {
                alert("Producto Eliminado");
                navigate('/');
              })}>Eliminar</Button>
            </ButtonGroup>
          </Col>
        </Row> : ''}
        <Row className="justify-content-md-center">
          <Col lg="6">
            <Card border='white' style={{ margin: '0.5rem' }} className="text-center">
              <Card.Img variant="top" src={product.imageUrl ? product.imageUrl : '/holder_500.jpeg'} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Precio: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>Stock: {product.stock}</ListGroup.Item>
              </ListGroup>

            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default ProductPage;
