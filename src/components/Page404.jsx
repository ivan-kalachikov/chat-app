import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Page404 = () => (
  <Container className="mt-5">
    <Row>
      <Col md={12} className="text-center">
        <span className="display-1 mb-4 d-block">404</span>
        <div className="mb-4 lead">Страница, которую вы ищете, не найдена.</div>
        <Link to="/" className="btn btn-link">Вернуться на главную</Link>
      </Col>
    </Row>
  </Container>
);
export default Page404;
