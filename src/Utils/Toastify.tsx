import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getHeaderColor(type: string, theme: string) {
  if (theme === "light" || theme === "light_accessibility") {
    if (type === "error") {
      return "#FF6C62";
    } else if (type === "success") {
      return "#60BB46";
    } else if (type === "warning") {
      return "#FAAB00";
    }
  } else {
    if (type === "error") {
      return "#FF0000";
    } else if (type === "success") {
      return "#60BB46";
    } else if (type === "warning") {
      return "#C88900";
    }
  }
}

const Msg = ({ closeToast, toastProps, title, subtitle }: any) => (
  <Box id="toastify-alert" style={{ display: "grid", placeItems: "center" }}>
    <Typography
      sx={{
        color: getHeaderColor(toastProps.type, "dark"),
        fontFamily: "Roboto",
        fontWeight: 700,
      }}
    >
      {title}
    </Typography>
    <p>
      <Typography
        sx={{
          color: "#ccc",
          fontFamily: "Roboto",
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        {subtitle}
      </Typography>
    </p>
  </Box>
);

export default function Toastify(props: Toast.IToastify) {
  toast(<Msg title={props.title} subtitle={props.subtitle} />, {
    position: props.position ?? "top-right",
    theme: "dark",
    autoClose: props.duration ?? 1500,
    type: props.type,
    icon: false,
  });
}
