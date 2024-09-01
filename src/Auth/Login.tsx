import { Box, Button, Typography } from "@mui/material";
import InputField from "../Components/Common/InputField";
import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { TEMP_USER } from "../Temp/TempUser";
import Toastify from "../Utils/Toastify";
import { AuthService } from "../Service/AuthService";

export default function Login() {
  const { setUser } = useUser();
  const [userInfos, setUserInfos] = useState<User.UserCreation>({
    username: "",
    password: "",
  });

  function handleLogin() {
    AuthService.Login(userInfos, setUser);
  }

  function handleChange(value: string, key: string) {
    setUserInfos({
      ...userInfos,
      [key]: value,
    });
  }

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111111",
        height: "100%",
      }}
    >
      <Box
        sx={{
          border: "1px solid #FFFFFF",
          borderRadius: 4,
          minHeight: 300,
          minWidth: 300,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: 14,
            fontWeight: 700,
            color: "white",
            p: 2,
          }}
        >
          Login
        </Typography>
        <Box sx={{ p: 2, display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
          <InputField
            dataTestId="login-username"
            label="Username"
            value={userInfos.username}
            setValue={(e: string) => {
              handleChange(e, "username");
            }}
          />
          <InputField
            dataTestId="login-password"
            label="Password"
            type="password"
            value={userInfos.password}
            setValue={(e: string) => {
              handleChange(e, "password");
            }}
          />
          <Button
            data-testid="login-submit"
            sx={{
              backgroundColor: "darkblue",
              color: "white",
              "&:hover": {
                backgroundColor: "blue",
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
