import React from 'react';
import PropTypes from 'prop-types';
import s from './style.module.scss';
import Card from '../Card';

const cards = [
  {
    title: 'first',
    description: 'description',
  },
  {
    title: 'first',
    description: 'description',
  },
  {
    title: 'first',
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
      <ul className={s.cardList}>
        {cards.map((card) => <Card card={card} />)}
      </ul>
    </div>
  );
};

TaskBlock.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TaskBlock;
