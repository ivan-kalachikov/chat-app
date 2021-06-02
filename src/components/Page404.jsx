import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12} className="text-center">
          <span className="display-1 mb-4 d-block">{t('ui.page404.title')}</span>
          <div className="mb-4 lead">{t('ui.page404.text')}</div>
          <Link to="/" className="btn btn-link">{t('ui.page404.link')}</Link>
        </Col>
      </Row>
    </Container>
  );
};
export default Page404;
