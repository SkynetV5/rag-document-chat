import { Paper, Typography } from "@mui/material";

export default function Message({ role, content }: any) {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 1,
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        backgroundColor: role === "user" ? "#1976d2" : "#eee",
        color: role === "user" ? "white" : "black",
        maxWidth: "70%",
      }}
    >
      <Typography>{content}</Typography>
    </Paper>
  );
}
