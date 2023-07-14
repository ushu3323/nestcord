type User = { id: string; username: string; email: string; password: string };

// Imaginary database
const users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@server.com',
    password: '123456',
  },
];

export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { username: string; email: string; password: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};
