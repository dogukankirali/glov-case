import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Popover,
  Autocomplete,
  Modal,
} from "@mui/material";
import MessageBox from "./MessageBox";
import moment from "moment";
import InputField from "./Common/InputField";
import { useEffect, useRef, useState } from "react";
import GreenBackground from "../Assets/Backgrounds/green-background.png";
import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Layout/Header";
import { COMBO_BOX_OPTIONS, SUGGESTIONS } from "../Constants/Suggestions";
import { MessageService } from "../Service/MessageService";
import { useUser } from "../Context/UserContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { smoothScrollToTop } from "../Utils/SmoothScroll";

export default function ChatWindow() {
  const { user } = useUser();
  const scrollbarsRef = useRef<Scrollbars>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [newMessage, setNewMessage] = useState<Message.Message | undefined>();
  const [messages, setMessages] = useState<Message.Message[]>([]);
  const [suggestedText, setSuggestedText] = useState<string>("");
  const [suggestedTextPreview, setSuggestedTextPreview] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  }, [messages]);

  const scrollToTop = () => {
    smoothScrollToTop(scrollbarsRef, 100);
  };

  const handleScroll = () => {
    if (scrollbarsRef.current) {
      const scrollTop = scrollbarsRef.current.getScrollTop();
      setShowScrollToTop(scrollTop > 100);
    }
  };

  const handleChange = (e: string) => {
    const value = e;
    const newMessage: Message.Message = {
      id: Math.floor(Math.random() * moment().unix()),
      content: value,
      type: "text",
      timestamp: moment().toISOString(),
      user: {
        id: user.id,
        userName: user.userName,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
    setNewMessage(newMessage);

    if (value.length > 0) {
      const suggestion = SUGGESTIONS.find((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      if (suggestion) {
        setSuggestedText(suggestion);
        setSuggestedTextPreview(suggestion.slice(value.length));
      } else {
        setSuggestedText("");
        setSuggestedTextPreview("");
      }
    } else {
      setSuggestedText("");
      setSuggestedTextPreview("");
    }
  };

  function getMessages() {
    const messages = MessageService.GetMessages(user);
    if (messages) {
      setMessages(messages);
    }
  }

  async function sendMessage() {
    if (newMessage) {
      if (newMessage.content.includes("/image")) {
        const imageId = parseInt(newMessage.content.split(" ")[1]);
        const base64Image = await MessageService.GetRandomImages(imageId);
        if (base64Image) {
          const imageMessage = {
            ...newMessage,
            content: base64Image,
            type: "image",
          };
          const responseCode = await MessageService.SendMessage(imageMessage);
          if (responseCode === 200) {
            setNewMessage(undefined);
            setSuggestedText("");
            setSuggestedTextPreview("");
            getMessages();
          }
        }
      } else if (newMessage.content.includes("/select")) {
        setModalOpen(true);
      } else {
        const responseCode = MessageService.SendMessage(newMessage);
        if (responseCode === 200) {
          setNewMessage(undefined);
          setSuggestedText("");
          setSuggestedTextPreview("");
          getMessages();
        }
      }
    }
  }

  function handleChangeSelect(e: any) {
    const finalMessage = {
      ...newMessage!,
      content: e,
    };
    const responseCode = MessageService.SendMessage(finalMessage);
    if (responseCode === 200) {
      setModalOpen(false);
      setSelectedValue(null);
      setNewMessage(undefined);
      setSuggestedText("");
      setSuggestedTextPreview("");
      getMessages();
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestedText) {
      e.preventDefault();
      setNewMessage({
        ...newMessage!,
        content: suggestedText,
      });
      setSuggestedText("");
      setSuggestedTextPreview("");
    }
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    getMessages();
  }, [trigger]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${GreenBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 2,
          position: "relative",
        }}
      >
        <Scrollbars
          ref={scrollbarsRef}
          onScroll={handleScroll}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              className="animate__animated animate__fadeInRightBig"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                marginBottom: 2,
              }}
            >
              <MessageBox
                message={message}
                trigger={trigger}
                setTrigger={setTrigger}
              />
            </Box>
          ))}
        </Scrollbars>
        {showScrollToTop && (
          <Button
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 200,
              height: 50,
              opacity: 0.8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#111",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <KeyboardArrowUpIcon />
              Scroll to Top
            </Typography>
          </Button>
        )}
      </Box>
      <Box
        sx={{
          minHeight: 50,
          width: "100%",
          backgroundColor: "#111",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            backgroundColor: "#111",
            zIndex: 1,
          }}
        >
          <InputField
            value={newMessage?.content || ""}
            setValue={handleChange}
            onKeyDown={handleKeyDown}
            onSend={sendMessage}
            type="message"
            placeholder="Type a message..."
            sx={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              position: "relative",
              zIndex: 1,
              background: "transparent",
              "& .MuiInputBase-root": {
                color: "#FFFFFF",
                border: "none",
                fontSize: 16,
                fontFamiy: "Roboto",
              },
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "transparent",
              },
              "&.Mui-focused": {
                backgroundColor: "transparent",
                borderColor: "transparent",
              },
            }}
          />

          {newMessage?.type === "image" && (
            <Box
              component="img"
              src={newMessage.content}
              alt="Preview"
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                width: "50px",
                height: "75px",
                transform: "translateY(-50%)",
                borderRadius: "4px",
              }}
            />
          )}
          <TextField
            //disabled
            sx={{
              width: "300px",
              height: 49,
              padding: "10.3px",
              position: "absolute",
              top: { md: 0, xs: 0 },
              marginLeft: `${
                newMessage
                  ? newMessage!.content.length + newMessage!.content.length * 8
                  : 0
              }px`,
              display: "flex",
              background: "transparent",
              zIndex: 0,
              pointerEvents: "none",
              fontFamily: "Roboto",
              fontSize: 16,
              "& .MuiInputBase-root": {
                color: "#CCCCCC !important",
                border: "none",
                boxShadow: "none",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                border: "none",
              },
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                border: "none",
                boxShadow: "none",
                color: "#CCCCCC !important",
                opacity: 0.5,
              },
            }}
            inputProps={{
              style: {
                border: "none",
                boxShadow: "none",
                color: "#CCCCCC !important",
              },
            }}
            value={suggestedTextPreview}
          />
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedValue(null);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid #222",
            backgroundColor: "#111",
            borderRadius: 4,
            p: 3,
            height: "130px",
            width: "400px",
            display: "grid",
            gap: 2,
            placeItems: "center",
            gridTemplateColumns: "1fr",
          }}
        >
          <Autocomplete
            disablePortal
            options={COMBO_BOX_OPTIONS}
            onChange={(event, newValue) => {
              setSelectedValue(newValue?.value!);
            }}
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#333",
                },
                "&:hover fieldset": {
                  borderColor: "#333",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#333",
                },
              },
              "& .MuiFormLabel-root": {
                color: "#FFF",
              },
              "& .MuiInputBase-root": {
                color: "#FFF",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#FFF",
              },
              "& .MuiAutocomplete-listbox": {
                backgroundColor: "#111",
              },
              "& ul": {
                padding: 0,
                margin: 0,
              },
              "& li": {
                color: "#FFF",
                backgroundColor: "#111",
                "&:hover": {
                  backgroundColor: "#333",
                  color: "#FFF",
                },
              },
            }}
            renderInput={(params) => <TextField {...params} label="Messages" />}
          />
          <Button
            disabled={!selectedValue}
            sx={{
              backgroundColor: "#075E54",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "#128C7E",
              },
            }}
            onClick={() => {
              handleChangeSelect(selectedValue);
            }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
