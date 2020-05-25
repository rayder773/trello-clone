import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import s from './Card.module.scss';
import { withFirebase } from '../Firebase/context';
import TaskActions from '../../store/reducers/tasks';
import { jsonParse } from '../../service/utils';
import doneGreen from '../../assets/images/done_green.png';
import { STRINGS } from './strings';
import cancelImage from '../../assets/images/close-circle.png';
import ModalActions from '../../store/reducers/modal';

const { setModal } = ModalActions;

const { setIsNewCreating, setData } = TaskActions;

const initialForm = {
  title: '',
};

const CompletedTaskHeader = () => (
  <div className={s.completedTaskHeader}>
    <img src={doneGreen} />
    Completed
  </div>
);

export const NewCard = (props) => {
  const {
    card,
    firebase,
    tasks,
    setIsNewCreating,
    columns,
    setData,
    setModal,
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

  const onCloseClick = (e) => {
    e.stopPropagation();

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
      <form
        onSubmit={onSubmit}
        className={s.form}
      >
        <textarea
          value={form.title}
          onChange={onChange}
          className={s.textarea}
          placeholder={STRINGS.textareaPlaceHolder}
        />
        <div className={s.formButtonsWrapper}>
          <button
            type="submit"
            className={s.addNewCard}
          >
            {STRINGS.addNewCard}
          </button>
          <button
            onClick={onCloseClick}
            className={s.cancelButton}
          >
            <img src={cancelImage} />
          </button>
        </div>
      </form>
    </li>
  );
};

const Card = (props) => {
  const {
    card,
    index,
    taskType,
    setModal,
  } = props;
  const cardClassName = (snapshot) => `${s.cardBody} ${snapshot.isDragging ? s.draggableCardBody : ''}`;
  const cartTitleClassName = taskType.crossedOut ? s.liveStatus : '';

  const onCardClick = () => {
    setModal(true, card)
  }

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
          onClick={onCardClick}
        >
          <div
            className={cardClassName(snapshot)}
          >
            {taskType.crossedOut && <CompletedTaskHeader />}
            <div className={s.cardBodyInner}>
              <div
                className={cartTitleClassName}
              >
                <div className={s.cardTitle}>{card.title}</div>
              </div>
            </div>
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
  setModal,
};

const NewCardWithFirebase = connect(mapStateToProps, mapDispatchToProps)(withFirebase(NewCard));

export default connect(mapStateToProps, mapDispatchToProps)(Card);

export {
  NewCardWithFirebase,
};
