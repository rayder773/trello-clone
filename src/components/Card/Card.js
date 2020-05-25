import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import s from './Card.module.scss';
import { withFirebase } from '../Firebase/context';
import TaskActions from '../../store/reducers/tasks';
import { jsonParse } from '../../service/utils';

const { setIsNewCreating, setData } = TaskActions;

const initialForm = {
  title: '',
};

export const NewCard = (props) => {
  const {
    card,
    firebase,
    tasks,
    setIsNewCreating,
    columns,
    setData,
  } = props;
  const [form, setForm] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: card.id,
      title: form.title,
      description: '',
      type: card.type,
    };

    const columnsCopy = jsonParse(columns[card.type]);
    columnsCopy.title = card.type;

    firebase.addToTaskList(newTask).then(() => {
      firebase.addToColumns(columnsCopy).then(() => {
        const newTasks = jsonParse(tasks);
        const index = tasks.findIndex((t) => t.id === newTask.id);
        newTasks[index] = newTask;

        setData({
          tasks: newTasks,
          columns,
        });

        setIsNewCreating(false);
      });
    });
  };

  const onChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
    });
  };

  const onCloseClick = () => {
    const tasksCopy = jsonParse(tasks);
    const columnsCopy = jsonParse(columns);
    const taskIndex = tasksCopy.findIndex((el) => el.isNew === true);
    const taskForDelete = tasksCopy[taskIndex];
    const taskIndexInColumn = columnsCopy[taskForDelete.type].taskIds.findIndex((el) => el === taskForDelete.id);

    tasksCopy.splice(taskIndex, 1);
    columnsCopy[taskForDelete.type].taskIds.splice(taskIndexInColumn, 1);
    setData({
      tasks: tasksCopy.length && tasksCopy,
      ...columns,
      columns: columnsCopy,
    });

    setIsNewCreating(false);
  };

  return (
    <li>
      <form onSubmit={onSubmit}>
        <textarea
          value={form.title}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
        <button onClick={onCloseClick}>Close</button>
      </form>
    </li>
  );
};

const Card = (props) => {
  const { card, index } = props;
  const cardClassName = (snapshot) => `${s.cardBody} ${snapshot.isDragging ? s.draggableCardBody : ''}`;

  return (
    <Draggable
      draggableId={card.id.toString()}
      index={index}
    >
      {(provided, snapshot) => (

        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={cardClassName(snapshot)}
            // className={snapshot.isDragging ? s.draggableCardBody : s.cardBody}
          >
            <div>{card.title}</div>
            <div>{card.description}</div>
          </div>

        </li>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

NewCard.propTypes = {
  card: PropTypes.object.isRequired,
};

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
  columns: tasks.columns,
});

const mapDispatchToProps = {
  setIsNewCreating,
  setData,
};

const NewCardWithFirebase = connect(mapStateToProps, mapDispatchToProps)(withFirebase(NewCard));

export {
  NewCardWithFirebase,
  Card,
};
