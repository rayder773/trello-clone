import React from 'react';
import PropTypes from 'prop-types';
import s from './style.module.scss';


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
    </div>
  );
};
TaskBlock.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TaskBlock;
