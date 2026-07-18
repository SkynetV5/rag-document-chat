import { Box } from "@mui/material";
import Message from "./Message";

export default function ChatBox({ messages }: any) {
  return (
    <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
      {messages.map((msg: any, i: number) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            mb: 1,
            px: 2,
          }}
        >
          <Message {...msg} />
        </Box>
      ))}
    </Box>
  );
}
