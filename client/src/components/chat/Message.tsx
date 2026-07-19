import { Paper, Typography } from "@mui/material";

export default function Message({ role, content }: any) {
  const isUser = role === "user";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 1,
        maxWidth: "78%",
        borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
        background: isUser
          ? "linear-gradient(135deg,  	#218aff 0%, #6366f1 100%)"
          : "rgba(255,255,255,0.06)",
        color: "text.primary",
        border: "1px solid",
        borderColor: isUser ? "transparent" : "rgba(255,255,255,0.08)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
          fontSize: "0.95rem",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
}
