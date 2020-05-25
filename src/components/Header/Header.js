import React from 'react';
import s from './Header.module.scss';
import searchButton from '../../assets/images/search.png';
import addButton from '../../assets/images/addButton.png';

const Header = () => (
  <div className={s.header}>
    <img src={searchButton} alt="search button" />
    <img src={addButton} alt="add button" />
  </div>
);

export default Header;
