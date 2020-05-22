import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import s from './Card.module.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = (props) => {
  const { card, index } = props;

  return (
    <Draggable
      draggableId={card.title}
      index={index}
    >
      {(provided) => (
        <li
          className={s.cardBody}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>{card.title}</div>
          <div>{card.description}</div>
        </li>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
