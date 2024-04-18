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
      this.tasks = [
        {
          id: 1,
          title: 'Сделать что-то',
          description: 'Сделать что-то Сделать что-то Сделать что-то',
          beginDate: new Date(),
          deadline: new Date(),
          priority: Priority.LOW,
          status: Status.EMPTY,
          executors: [],
          ended: false,
        },
        {
          id: 2,
          title: 'Выполнить задание',
          description: 'Выполнить задание Выполнить задание Выполнить задание',
          beginDate: new Date(2024, 3, 3),
          deadline: new Date(2024, 3, 9),
          priority: Priority.MEDIUM,
          status: Status.PLAN,
          executors: [],
          ended: true,
        },
        {
          id: 3,
          title: 'Добавить кое-что',
          description: 'Добавить кое-что Добавить кое-что Добавить кое-что',
          beginDate: new Date(2024, 2, 29),
          deadline: new Date(2024, 3, 7),
          priority: Priority.HIGH,
          status: Status.PLAN,
          executors: [],
          ended: false,
        },
        {
          id: 4,
          title: 'Доделать задание',
          description: 'Доделать задание Доделать задание Доделать задание Доделать задание',
          beginDate: new Date(2024, 3, 12),
          deadline: new Date(2024, 3, 15),
          priority: Priority.LOW,
          status: Status.BEHIND,
          executors: [],
          ended: false,
        },
        {
          id: 5,
          title: 'Исправить',
          description: 'Исправить ИсправитьИсправить Исправить',
          beginDate: new Date(2024, 3, 10),
          deadline: new Date(2024, 3, 17),
          priority: Priority.LOW,
          status: Status.EMPTY,
          executors: [],
          ended: false,
        },
      ];
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
