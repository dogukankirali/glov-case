import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatWindow from "./Components/ChatWindow";
import App from "./App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  localStorage.setItem(
    "user-storage",
    '{"state":{"user":{"userName":"user1","firstName":"Temp","lastName":"User","id":"temp_user_id","avatar":"https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"}},"version":0}'
  );
});

test("login check", async () => {
  render(<App />);

  expect(screen.getByTestId("login-username")).toBeInTheDocument();
  expect(screen.getByTestId("login-password")).toBeInTheDocument();
  expect(screen.getByTestId("login-submit")).toBeInTheDocument();

  userEvent.type(screen.getByTestId("login-username"), "user1");
  userEvent.type(screen.getByTestId("login-password"), "password");
  userEvent.click(screen.getByTestId("login-submit"));
});

test("display Chatbox after login", async () => {
  render(<ChatWindow />);

  expect(localStorage.getItem("user-storage")).toBe(
    '{"state":{"user":{"userName":"user1","firstName":"Temp","lastName":"User","id":"temp_user_id","avatar":"https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"}},"version":0}'
  );

  await act(async () => {
    const input = screen.getByTestId("chat-input");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Hello");
    userEvent.click(screen.getByTestId("chat-submit"));
  });
});
