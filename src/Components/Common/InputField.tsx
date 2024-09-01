import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

export default function InputField({
  dataTestId,
  id,
  label,
  value,
  setValue,
  sx,
  placeholder,
  type,
  hasRegex,
  onKeyDown,
  disabled,
  onSend,
}: {
  dataTestId?: string;
  id?: string;
  label?: string;
  value: string;
  setValue?:
    | ((value: string) => void)
    | Dispatch<SetStateAction<string>>
    | ((value: string) => Promise<void>);
  sx?: any;
  placeholder?: string;
  type?: string;
  hasRegex?: boolean;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
  onSend?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box id={id} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontFamily: "roboto",
            fontSize: 14,
            fontWeight: 700,
            color: "white",
            ml: 1,
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        //data-testid={}
        type={
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type ?? "text"
        }
        fullWidth
        value={value}
        onChange={(e) => setValue!(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        FormHelperTextProps={{
          sx: {
            whiteSpace: "pre-line",
            wordWrap: "break-word",
            fontSize: "0.75rem",
            maxWidth: "250px",
            margin: "0 auto",
            mt: 1,
            textAlign: "center",
          },
        }}
        sx={
          sx ?? {
            "& .MuiInputBase-root": {
              backgroundColor: "#111111",
              color: "#FFF",
              height: 40,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#222222",
              },
              "&.Mui-focused": {
                backgroundColor: "#222222",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(211, 211, 211, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(211, 211, 211, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(211, 211, 211, 1)",
              },
            },
          }
        }
        inputProps={{
          "data-testid": dataTestId,
        }}
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: "#111111",
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: "#111111",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ) : type === "message" ? (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SendIcon
                    data-testid="chat-submit"
                    onClick={onSend}
                    sx={{
                      color: "gray",
                      ":hover": {
                        color: "white",
                        cursor: "pointer",
                        transition: "0.2s",
                      },
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
    </Box>
  );
}
