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

interface Store {
  tasks: Task[],
  users: User[],
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

export {
  User,
  Task,
  Priority,
  Status,
  Store,
};
