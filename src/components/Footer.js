import { Row, Col, Container } from "react-bootstrap"

function Footer() {
    return (
        <Container style={{padding: '1.0rem', backgroundColor:'darkgrey', color:'white'}}>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                Suplementes Copyright 2022 
                </Col>
            </Row>
        </Container>
    )
}

export default Footer