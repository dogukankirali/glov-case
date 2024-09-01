import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useUser } from "../../Context/UserContext";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { AuthService } from "../../Service/AuthService";
import Badge, { BadgeProps } from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

export default function Header() {
  const { user, setUser } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const settings = [
    {
      id: 0,
      title: "User",
    },
    {
      id: 1,
      title: "Logout",
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 20,
      top: 5,
      border: `none`,
      padding: "0 4px",
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        minHeight: 30,
        backgroundColor: "#111111",
        borderBottom: "1px solid #000",
        color: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <StyledBadge variant="dot" color="success">
          <Avatar
            src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-student-avatars-flat-icons-pack-people-456332.png?f=webp&w=256"
            sx={{
              width: 30,
              height: 30,
              marginRight: 2,
            }}
          />
        </StyledBadge>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Chatbot
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip onClick={handleOpenUserMenu} title="Settings">
          <Box
            sx={{
              all: "unset",
              display: "flex",
              alignItems: "center",
            }}
          >
            {user && (
              <Typography
                onClick={handleOpenUserMenu}
                variant="h6"
                sx={{
                  display: { xs: "none", md: "flex" }, // Sadece md ve üzeri için göster
                  fontFamily: "Roboto",
                  fontSize: 14,
                  lineHeight: "20px",
                  textAlign: "start",
                  color: "#FFFFFF",
                  ml: 1,
                  cursor: "pointer",
                }}
              >
                Welcome, {user.firstName}
              </Typography>
            )}
            {Boolean(anchorElUser) ? (
              <ArrowDropUpIcon
                sx={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  display: { xs: "none", md: "flex" }, // Sadece md ve üzeri için göster
                  cursor: "pointer",
                }}
              />
            ) : (
              <ArrowDropDownIcon
                sx={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  display: { xs: "none", md: "flex" }, // Sadece md ve üzeri için göster
                  cursor: "pointer",
                }}
              />
            )}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                display: { xs: "flex", md: "none" }, // Sadece xs için göster
                color: "#FFFFFF",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            sx: {
              backgroundColor: "#111111",
            },
          }}
        >
          {settings.map((setting) => (
            <>
              {setting.id === settings.length - 1 && (
                <Divider
                  variant="middle"
                  flexItem
                  sx={{ borderRightWidth: 2 }}
                />
              )}
              <MenuItem
                key={setting.id}
                disabled={setting.id === 0}
                onClick={() => {
                  handleCloseUserMenu();
                  if (setting.id === 1) {
                    AuthService.Logout(setUser);
                  }
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#222222",
                  },
                  "&.Mui-disabled": {
                    color: "#FFFFFF !important",
                    opacity: 1,
                  },
                }}
              >
                {setting.id === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-student-avatars-flat-icons-pack-people-456332.png?f=webp&w=256"
                      sx={{
                        width: 30,
                        height: 30,
                        marginRight: 2,
                      }}
                    />
                    {user && (
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#FFFFFF",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Typography
                    textAlign={"end"}
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: 16,
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {setting.title}
                  </Typography>
                )}
              </MenuItem>
            </>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
