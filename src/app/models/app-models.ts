interface User {
  id: number,
  name: string,
}

interface Task {
  id: number,
  title: string,
  description: string,
  beginDate: Date,
  deadline: Date,
  priority: Priority,
  status: Status,
  executors: User[],
  ended: boolean,
}

interface Columns {
  name: string,
  title: string
}

enum Priority {
  EMPTY = '',
  LOW = 'низкий',
  MEDIUM = 'средний',
  HIGH = 'высокий',
}

enum Status {
  EMPTY = '',
  PLAN = 'по плану',
  THREAT = 'под угрозой',
  BEHIND = 'отстает',
}

class Store {
  tasks: Task[];

  users: User[];

  constructor(tasks?: Task[], users?: User[]) {
    if (!tasks) {
      this.tasks = [];
    } else {
      this.tasks = tasks;
    }
    if (!users) {
      this.users = [
        {
          id: 1,
          name: 'Александр',
        },
        {
          id: 2,
          name: 'Павел',
        },
        {
          id: 3,
          name: 'Сергей',
        },
      ];
    } else {
      this.users = users;
    }
  }
}

export {
  User,
  Task,
  Priority,
  Status,
  Store,
  Columns,
};
