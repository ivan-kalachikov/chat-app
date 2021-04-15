import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-12 text-center">
        <span className="display-1 mb-4 d-block">404</span>
        <div className="mb-4 lead">Страница, которую вы ищете, не найдена.</div>
        <Link to="/" className="btn btn-link">Вернуться на главную</Link>
      </div>
    </div>
  </div>
);
export default Page404;
