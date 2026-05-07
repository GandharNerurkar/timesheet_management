const MOCK_USERS = [
  {
    id: "user-admin",
    name: "John Doe",
    email: "admin@test.com",
    password: "admin123",
  },
];

export function getMockUserByCredentials(email: string, password: string) {
  return (
    MOCK_USERS.find(
      (user) => user.email === email.trim().toLowerCase() && user.password === password,
    ) ?? null
  );
}
