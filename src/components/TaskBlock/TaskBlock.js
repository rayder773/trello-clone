import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import addButton from '../../assets/images/addButton.png';
import s from './style.module.scss';
import { Card, NewCard } from '../Card';
import TaskActions from '../../store/reducers/tasks';

const { setIsNewCreating } = TaskActions;

const TaskBlock = (props) => {
  const {
    taskType,
    columnTasks,
    isNewCreating,
    setColumn,
    allTasks,
  } = props;

  const getTitleBackground = { background: taskType.titleBackground };
  const getByBoundAttribute = { background: taskType.bodyBackground };

  const onCreateTask = (e) => {
    e.preventDefault();
    const newId = allTasks ? allTasks[allTasks.length - 1].id + 1 : 0;

    const newTask = {
      id: newId,
      type: taskType.type,
      isNew: true,
    };

    setColumn(newTask, taskType.type);
  };

  return (
    <div
      className={s.taskCol}
      key={taskType.title}
      style={getByBoundAttribute}
    >
      <div
        className={s.header}
        style={getTitleBackground}
      >
        <div className={s.imageWithTitle}>
          <img src={taskType.image} />
          {taskType.title}
        </div>
        <div className={s.taskCounter}>
          {columnTasks.length || 0}
        </div>
      </div>
      <Droppable droppableId={taskType.type}>
        {(provided) => (
          <ul
            className={s.cardList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnTasks && columnTasks.map((card, i) => (card.isNew
              ? (
                <NewCard
                  card={card}
                  key={card.id}
                />
              ) : (
                <Card
                  card={card}
                  index={i}
                  key={card.id}
                  taskType={taskType}
                />

              )))}
            {provided.placeholder}
          </ul>
        )}

      </Droppable>
      {!isNewCreating && !taskType.crossedOut && (
      <div
        onClick={onCreateTask}
        className={s.addButton}
      >
        <img
          src={addButton}
          alt="add button"
        />
      </div>
      )}
    </div>
  );
};

TaskBlock.propTypes = {
  allTasks: PropTypes.array.isRequired,
  columnTasks: PropTypes.array.isRequired,
  isNewCreating: PropTypes.bool.isRequired,
  setColumn: PropTypes.func.isRequired,
  taskType: PropTypes.shape({
    onlyTitle: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleBackground: PropTypes.string.isRequired,
    bodyBackground: PropTypes.string.isRequired,
    withMark: PropTypes.bool.isRequired,
    crossedOut: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = ({ tasks }) => ({
  isNewCreating: tasks.isNewCreating,
  columns: tasks.columns,
  allTasks: tasks.tasks,
});

const mapDispatchToProps = {
  setIsNewCreating,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBlock);
