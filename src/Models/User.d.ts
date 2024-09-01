declare namespace User {
  type User = {
    userName: string;
    firstName?: string;
    lastName?: string;
    id: string;
    avatar: string;
  };

  type UserCreation = {
    username: string;
    password: string;
  };
}
