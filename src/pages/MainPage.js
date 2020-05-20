import React from 'react';
import s from './style.module.scss';
import taskTypes from './taskTypes';
import TaskBlock from '../components/TaskBlock';

const MainPage = (props) => (
  <div className={s.container}>
    {Object.values(taskTypes).map((task) => (
      <TaskBlock task={task} />
    ))}
  </div>
);

export default MainPage;
