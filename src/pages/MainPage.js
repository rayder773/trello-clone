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
  // shouldComponentUpdate(nextProps) {
  //   const { tasks } = this.props;
  //   if (nextProps.tasks === tasks) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const {
      taskType,
      tasks,
      setColumn,
    } = this.props;
    console.log('TaskBlockWrapper test render');
    return (
      <TaskBlock
        taskType={taskType}
        key={taskType.type}
        tasks={tasks}
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
    isNewCreating
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
  };

  const getTasks = (taskType) => {
    if (!tasks || !columns || !columns[taskType]) {
      return false;
    }

    return tasks.filter((t) => columns[taskType].taskIds.includes(t.id));
  };

  const setColumn = (newTask, taskType) => {
    const tasksCopy = tasks ? jsonParse(tasks) : [];
    const columnsCopy = columns && columns[taskType] ? jsonParse(columns) : { [taskType]: { taskIds: [] } };
    tasksCopy.push(newTask);
    console.log('columns:', columns);
    console.log('columnsCopy: ', columnsCopy);
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
