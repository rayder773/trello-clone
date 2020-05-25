import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const FIRE_BASE_FIELDS = {
  tasks: 'tasks',
  columns: 'columns',
};

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }

  taskList = () => this.db.ref('taskList');

  addToTaskList = (task) => this.taskList()
    .child(FIRE_BASE_FIELDS.tasks)
    .child(task.id)
    .set(task);

  addToColumns = (column) => this.taskList()
    .child(FIRE_BASE_FIELDS.columns)
    .child(column.title)
    .set(column);

  updateColumns = (columns) => this.taskList()
    .child(FIRE_BASE_FIELDS.columns)
    .update(columns);

  updateTaskList = (task) => this.taskList()
    .child(FIRE_BASE_FIELDS.tasks)
    .set(task);
}

export default Firebase;
