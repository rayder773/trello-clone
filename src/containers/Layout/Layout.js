import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Layout.module.scss';
import Header from '../../components/Header';

const Layout = ({ children }) => (
  <div className={s.mainLayout}>
    <Header />
    {children}
  </div>
);
Layout.propTypes = {
};

export default Layout;
