import { Box } from "@mui/material";
import Message from "./Message";

export default function ChatBox({ messages }: any) {
  return (
    <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
      {messages.map((msg: any, i: number) => (
        <Message key={i} {...msg} />
      ))}
    </Box>
  );
}
