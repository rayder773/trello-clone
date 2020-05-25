import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import s from './style.module.scss';
import taskTypes from './taskTypes';
import TaskBlock from '../components/TaskBlock';
import { withFirebase } from '../components/Firebase/context';
import TaskActions from '../store/reducers/tasks';
import { jsonParse } from '../service/utils';

const { setData, setIsNewCreating } = TaskActions;

class TaskBlockWrapper extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { tasks } = this.props;
    if (nextProps.tasks === tasks) {
      return false;
    }
    return true;
  }

  render() {
    const {
      taskType,
      tasks,
      setColumn,
    } = this.props;

    console.log(tasks)
    return (
      <TaskBlock
        taskType={taskType}
        key={taskType.type}
        columnTasks={tasks}
        setColumn={setColumn}
      />
    );
  }
}

const MainPage = (props) => {
  const {
    firebase,
    setData,
    tasks,
    columns,
    setIsNewCreating,
  } = props;

  useEffect(() => {
    firebase.taskList()
      .once('value')
      .then((r) => {
        const values = r.val();
        if (!values) {
          return false;
        }
        setData(values);
      });
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    console.log(source);

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columnsCopy = jsonParse(columns[destination.droppableId]);

    columnsCopy.taskIds.splice(source.index, 1);
    columnsCopy.taskIds.splice(destination.index, 0, parseInt(draggableId));

    const newColumns = {
      ...columns,
      [destination.droppableId]: columnsCopy
    }

    setData({
      tasks,
      columns: newColumns
    })

    console.log(columnsCopy);

    // columnsCopy[destination.droppableId].taskIds.push(parseInt(draggableId));
    // columnsCopy[source.droppableId].taskIds.splice(draggableId, 1);

    // const update = {
    //   [destination.droppableId]: columnsCopy[destination.droppableId],
    //   [source.droppableId]: columnsCopy[source.droppableId]
    // }
    //
    // console.log(update);
    //
    // firebase.updateColumns(update).then(() => {
    //   setData({
    //     tasks,
    //     columns: columnsCopy,
    //   })
    // })

  };

  const getTasks = (taskType) => {
    if (!tasks || !columns || !columns[taskType] || !columns[taskType].taskIds) {
      return false;
    }

    return columns[taskType].taskIds.map((id) => {
      return tasks.find((task) => task.id === id)
    })
  };

  const setColumn = (newTask, taskType) => {
    const tasksCopy = tasks ? jsonParse(tasks) : [];
    const columnsCopy = columns ? jsonParse(columns) : { [taskType]: { taskIds: [] } };
    tasksCopy.push(newTask);

    if (!columnsCopy[taskType].taskIds) {
      columnsCopy[taskType].taskIds = [];
    }
    columnsCopy[taskType].taskIds.push(newTask.id);
    setData({
      tasks: tasksCopy,
      columns: columnsCopy,
    });
    setIsNewCreating(true);
  };

  return (
    <div className={s.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(taskTypes)
          .map((taskType) => (
            <TaskBlockWrapper
              taskType={taskType}
              key={taskType.type}
              tasks={getTasks(taskType.type)}
              setColumn={setColumn}
            />
          ))}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
  columns: tasks.columns,
  isNewCreating: tasks.isNewCreating,
});

const mapDispatchToProps = {
  setData,
  setIsNewCreating,

};

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(MainPage));
