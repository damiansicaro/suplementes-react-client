import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getProductsList } from '../services/products';
import { Link } from 'react-router-dom';

function truncate(str) {
  const tope = 100
  return str.length > tope ? str.substring(0, tope - 3) + "..." : str;
}

function ProductsCards() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProductsList()
      .then(items => {
        if (mounted) {
          setProductsList(items)
        }
      })
    return () => mounted = false;
  }, [])

  return (
    <div className="wrapper" style={{ padding: '0.6rem' }}>
      <h3 style={{ marginLeft: '2rem' }}>Lista de Productos</h3>
      <Row>
        {productsList.map(product =>
          <Col md={3} key={product.id}>
            <Card border="white" style={{ margin: '0.5rem' }} className="text-center" key={product.id}>
              <Card.Img variant="top" src={product.imageUrl ? product.imageUrl : '/holder_500.jpeg'} />
              <Card.Body>
                <Card.Title><Link to={"/products/" + product.id}> {product.title}</Link></Card.Title>
                <Card.Text>{truncate(product.description)}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item><b>Precio: $ {product.price}</b></ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </div>

  )
}

export default ProductsCards

