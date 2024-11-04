const AdminData = [
    {
        id: 1,
        username: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        tasks: [],
    },
];

const UserData = [
    {
        id: 2,
        username: 'Yash',
        email: 'yash@example.com',
        password: 'yash123',
        role: 'user',
        tasks: [
            { id: 1, title: 'Task 1', description: 'This is a task in todos', state: 'todos' },
            { id: 2, title: 'Task 2', description: 'This is another task in todos', state: 'todos' },
            { id: 3, title: 'Task 3', description: 'This task is in progress', state: 'inProgress' },
            { id: 4, title: 'Task 5', description: 'This task is completed', state: 'done' },
        ],
    },
    {
        id: 3,
        username: 'Akash',
        email: 'akash@example.com',
        password: 'akash123',
        role: 'user',
        tasks: [
            { id: 1, title: 'Task 1', description: 'This is a task in todos', state: 'todos' },
            { id: 2, title: 'Task 2', description: 'This is another task in todos', state: 'todos' },
            { id: 3, title: 'Task 3', description: 'This task is in progress', state: 'inProgress' },
            { id: 4, title: 'Task 5', description: 'This task is completed', state: 'done' },
        ],
    }
];

export { AdminData, UserData };