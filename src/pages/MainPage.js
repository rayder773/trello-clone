import React, {useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import s from './style.module.scss';
import taskTypes from './taskTypes';
import TaskBlock from '../components/TaskBlock';
import { FirebaseContext } from '../components/Firebase';

const MainPage = (props) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  };

  return (
    <div className={s.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* {Object.values(taskTypes).map((task) => ( */}
        <TaskBlock task={Object.values(taskTypes)[0]} />
        {/* // ))} */}
      </DragDropContext>
    </div>
  );
};

export default MainPage;
