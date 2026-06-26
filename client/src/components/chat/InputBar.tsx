import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function InputBar({ setMessages }: any) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text) return;

    setMessages((prev: any) => [...prev, { role: "user", content: text }]);

    setText("");

    // tutaj później API call do /chat
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
}
