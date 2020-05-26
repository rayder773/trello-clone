import React from 'react';
import s from './Layout.module.scss';
import Header from '../../components/Header';

const Layout = ({ children }) => (
  <div className={s.mainLayout}>
    <Header />
    {children}
  </div>
);

export default Layout;
