import { Box, CircularProgress } from "@mui/material";
import React from "react";

type LoadingModalProps = {
  show: boolean;
  overlay?: boolean;
  additionalDisplay?: React.ReactNode;
};

export default function LoadingModal({
  show,
  overlay = true,
  additionalDisplay,
}: LoadingModalProps) {
  if (!show) return null;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        inset: 0,
        zIndex: 10000,
        backgroundColor: overlay ? "rgba(0, 0, 0, 0.5)" : "transparent",
      }}
    >
      <CircularProgress
        sx={{
          color: "darkblue",
        }}
      />
      {additionalDisplay}
    </Box>
  );
}
