declare namespace Message {
  type Message = {
    id: number;
    content: string;
    type: string;
    timestamp: string;
    user: User.User;
  };
}
