import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './style.module.scss';
import { STRINGS } from './strings';
import ModalActions from '../../store/reducers/modal';
import TasksActions from '../../store/reducers/tasks';
import { jsonParse } from '../../service/utils';
import { withFirebase } from '../Firebase/context';

const { setModal } = ModalActions;
const { setData } = TasksActions;

const initialForm = {
  title: '',
  description: '',
};

const Modal = ({
  isOpen, setModal, modalContent, allTasks, setData, firebase,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (modalContent) {
      setForm({
        title: modalContent.title,
        description: modalContent.description,
      });
    }
  }, [modalContent]);

  const onModalClick = (e) => {
    const { id } = e.target;
    if (id === STRINGS.modalId) {
      setModal(false, null);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTasks = jsonParse(allTasks);
    newTasks[modalContent.id] = {
      description: form.description,
      id: modalContent.id,
      title: form.title,
      type: modalContent.type,
    };

    setData({
      tasks: newTasks,
    });

    setModal(false, null);

    firebase.addToTaskList(newTasks[modalContent.id]);
  };

  return (
    <div
      style={{ display: isOpen ? 'flex' : 'none' }}
      className={s.modal}
      onClick={onModalClick}
      id={STRINGS.modalId}
    >
      <form
        className={s.form}
        onSubmit={onSubmit}
      >
        <div className={s.inputWrapper}>
          <label htmlFor={STRINGS.titleInput}>
            {STRINGS.title}
          </label>
          <input
            id={STRINGS.titleInput}
            name="title"
            value={form.title}
            onChange={onChange}
          />
        </div>
        <div className={s.inputWrapper}>
          <label htmlFor={STRINGS.descriptionInput}>
            {STRINGS.description}
          </label>
          <textarea
            id={STRINGS.descriptionInput}
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className={s.submitButton}
        >
          {STRINGS.saveButton}
        </button>
      </form>

    </div>
  );
};

const mapStateToProps = ({ modal, tasks }) => ({
  isOpen: modal.isOpen,
  modalContent: modal.modalContent,
  allTasks: tasks.tasks,
});

const mapDispatchToProps = {
  setModal,
  setData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(Modal));

Modal.propTypes = {
  allTasks: PropTypes.array.isRequired,
  firebase: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalContent: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};
