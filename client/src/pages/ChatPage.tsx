import {
  Box,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  List,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import ChatBox from "../components/chat/ChatBox";
import InputBar from "../components/chat/InputBar";
import { useState } from "react";

type ChatPageProps = {
  documents: Document[];
};

export default function ChatPage({ documents }: ChatPageProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number>(null);

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatBox messages={messages} />
      <Box
        sx={{
          pt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        {!selectedDocumentId && (
          <Alert severity="info" sx={{ py: 0 }}>
            Wybierz dokument, aby zadać pytanie do LLM.
          </Alert>
        )}
        <FormControl fullWidth size="small">
          <InputLabel id="document-select-label">Dokument</InputLabel>
          <Select
            labelId="document-select-label"
            label="Dokument"
            value={selectedDocumentId ?? ""}
            onChange={(e) => setSelectedDocumentId(e.target.value)}
          >
            {documents?.length === 0 ? (
              <MenuItem disabled value="">
                Brak dostępnych dokumentów
              </MenuItem>
            ) : (
              documents?.map((doc) => (
                <MenuItem key={doc?.id} value={doc?.id}>
                  {doc?.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <InputBar
          setMessages={setMessages}
          documentId={selectedDocumentId}
          disabled={!selectedDocumentId}
        />
      </Box>
    </Box>
  );
}
