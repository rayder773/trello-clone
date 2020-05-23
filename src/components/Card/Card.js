import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import s from './Card.module.scss';
import { withFirebase } from '../Firebase/context';
import { TaskContext } from '../../pages/MainPage';

const initialForm = {
  title: '',
};

export const NewCard = (props) => {
  const {
    card,
    firebase,
    filteredTasks,
    setFilteredTasks,
  } = props;
  const [form, setForm] = useState(initialForm);
  const { setIsCreateNew } = useContext(TaskContext);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(filteredTasks);

    const lastIndex = filteredTasks && !filteredTasks[0].isNew ? filteredTasks.length : 0;

    const newTask = {
      id: card.id,
      title: form.title,
      description: '',
      type: card.type,
      index: lastIndex,
    };

    firebase.addToTaskList(newTask).then(() => console.log('task added'));
    setIsCreateNew(false);
  };

  const onChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
    });
  };

  const onCloseClick = useCallback(() => {
    const arr = [...filteredTasks];
    const index = arr.findIndex((el) => el.isNew === true);

    const newArr = [
      ...arr.slice(0, index),
      ...arr.slice(index + 1),
    ];

    setFilteredTasks(newArr);
    setIsCreateNew(false);
  }, []);

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

  return (
    <Draggable
      draggableId={card.id.toString()}
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
  index: PropTypes.number.isRequired,
};

NewCard.propTypes = {
  card: PropTypes.object.isRequired,
};

const NewCardWithFirebase = withFirebase(NewCard);

export {
  NewCardWithFirebase,
  Card,
};
