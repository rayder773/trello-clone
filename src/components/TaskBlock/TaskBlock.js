import React from 'react';
import PropTypes from 'prop-types';

const TaskBlock = (props) => {
  const { name } = props;

  return (
    <div>{name ? `Hello, ${name}!` : 'Hey, stranger'}</div>
  );
};
TaskBlock.propTypes = {
  name: PropTypes.string,
};

TaskBlock.defaultProps = {
  name: '',
};

export default TaskBlock;
