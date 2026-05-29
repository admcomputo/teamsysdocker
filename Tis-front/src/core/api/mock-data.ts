export const DEFAULT_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    fullName: 'Usuario de Prueba',
    pass: '123456',
    access_token: 'mock-jwt-token-123'
  }
];

export const getMockUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : DEFAULT_USERS;
};
