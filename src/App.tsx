import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import ChatWindow from "./Components/ChatWindow";
import { ToastContainer } from "react-toastify";
import { useLoadingStore } from "./Context/LoadingStore";
import LoadingModal from "./Components/Common/LoadingModal";
import { useUser } from "./Context/UserContext";
import Login from "./Auth/Login";

function App() {
  const isLoading = useLoadingStore((state) => state.loading);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const endLoading = useLoadingStore((state) => state.endLoading);
  const { user } = useUser();

  useEffect(() => {
    const handleStart = () => startLoading();
    const handleEnd = () => endLoading();

    handleStart();
    handleEnd();

    return () => handleEnd();
  }, [startLoading, endLoading]);

  return (
    <div className="App">
      <ToastContainer
        newestOnTop={true}
        closeOnClick
        rtl={false}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoading && <LoadingModal show={isLoading} />}
      <Box className="main-box">{user ? <ChatWindow /> : <Login />}</Box>
    </div>
  );
}

export default App;
