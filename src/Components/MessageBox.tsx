import {
  Avatar,
  Box,
  Button,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState, MouseEvent } from "react";
import { MessageService } from "../Service/MessageService";

export default function MessageBox({
  message,
  trigger,
  setTrigger,
}: {
  message: Message.Message;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    MessageService.DeleteMessage(message.id);
    setTrigger(!trigger);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      key={message.id}
      onMouseDown={handleMouseDown}
      sx={{
        display: "flex",
      }}
    >
      <Box
        title={message.user.userName}
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: 2,
          cursor: "help",
        }}
      >
        <Tooltip
          title={moment(message.timestamp).format("DD/MM/YYYY HH:mm:ss")}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: 14,
              fontWeight: 400,
              color: "#7c7c7c",
            }}
          >
            {moment(message.timestamp).format("hh:mm A")}
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{
          backgroundColor: "#075E54",
          color: "#FFFFFF",
          minHeight: 50,
          minWidth: 50,
          borderRadius: 10,
          display: "flex",
          justifyContent: "flex-end",
          width: "fit-content",
          textAlign: "center",
          marginLeft: "auto",
          padding: message.type === "text" ? 0 : 1,
        }}
      >
        {message.type === "text" && (
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: 16,
              fontWeight: 400,
              p: 2,
              textAlign: "center",
            }}
          >
            {message.content}
          </Typography>
        )}
        {message.type === "image" && (
          <Box
            component={"img"}
            src={message.content}
            sx={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
      </Box>
      <Tooltip title={message.user.userName}>
        <Avatar
          sx={{ width: 50, height: 50, marginLeft: 2 }}
          src={message.user.avatar}
        />
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Are you sure you want to delete this message?
        </Typography>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          sx={{ m: 1 }}
        >
          Delete
        </Button>
      </Popover>
    </Box>
  );
}
