import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import s from './style.module.scss';
import Card from '../Card';

const cards = [
  {
    id: 1,
    title: 'first',
    description: 'description',
  },
  {
    id: 2,
    title: 'second',
    description: 'description',
  },
  {
    id: 3,
    title: 'third',
    description: 'description',
  },
];

const TaskBlock = (props) => {
  const { task } = props;

  const getTitleBackground = { background: task.titleBackground };
  const getByBoundAttribute = { background: task.bodyBackground };

  return (
    <div
      className={s.taskCol}
      key={task.title}
      style={getByBoundAttribute}
    >
      <div
        className={s.header}
        style={getTitleBackground}
      >
        {task.title}
      </div>
      <Droppable droppableId={task.title}>
        {(provided) => (
          <ul
            className={s.cardList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, i) => (
              <Card
                card={card}
                index={i}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}

      </Droppable>
    </div>
  );
};

TaskBlock.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TaskBlock;
