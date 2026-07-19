import { Box, Typography } from "@mui/material";
import Message from "./Message";

export default function ChatBox({ messages }: any) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        mb: 2,
        px: 1,
        py: 1,
        borderRadius: 3,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          <Typography color="text.secondary" textAlign="center">
            Start a conversation by selecting a document and asking a question.
          </Typography>
        </Box>
      ) : (
        messages.map((msg: any, i: number) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Message {...msg} />
          </Box>
        ))
      )}
    </Box>
  );
}
