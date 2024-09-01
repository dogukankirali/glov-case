import { useUser } from "../Context/UserContext";
import { TEMP_USER } from "../Temp/TempUser";
import Toastify from "../Utils/Toastify";

export module AuthService {
  export function Login(
    user: User.UserCreation,
    setUser: (user: User.User) => void
  ) {
    if (!user.username || !user.password) {
      Toastify({
        title: "Error",
        subtitle: "Please fill in all fields.",
        type: "error",
      });
      return;
    }
    if (
      TEMP_USER.userName !== user.username ||
      TEMP_USER.password !== user.password
    ) {
      Toastify({
        title: "Error",
        subtitle: "Invalid username or password.",
        type: "error",
      });
      return;
    }
    setUser({
      userName: TEMP_USER.userName,
      firstName: TEMP_USER.firstName,
      lastName: TEMP_USER.lastName,
      id: TEMP_USER.id,
      avatar: TEMP_USER.avatar,
    });
  }

  export function Logout(setUser: (user: User.User | null) => void) {
    setUser(null);
  }
}
