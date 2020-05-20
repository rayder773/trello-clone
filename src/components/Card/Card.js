import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Card.module.scss';

const Card = (props) => {
  const { card } = props;
  return (
    <li className={s.cardBody}>
      <div>{card.title}</div>
      <div>{card.description}</div>
    </li>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
