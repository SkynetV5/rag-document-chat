import {
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import ChatBox from "../components/chat/ChatBox";
import InputBar from "../components/chat/InputBar";
import { useEffect, useState } from "react";
import type { Document } from "../types/types";
import { useGetMessageGetMessagesByChatIdChatId } from "../api/messages/messages";

type ChatPageProps = {
  documents: Document[];
  isNewChat: boolean;
  setIsNewChat: (value: boolean) => void;
  activeConversationId?: string;
  onSelectConversation?: (id: string) => void;
  refetchConversations: () => void;
};

export default function ChatPage({
  documents,
  isNewChat,
  setIsNewChat,
  activeConversationId,
  onSelectConversation,
  refetchConversations,
}: ChatPageProps) {
  const { data: messagesData, error: errorMessagesData } =
    useGetMessageGetMessagesByChatIdChatId(activeConversationId || "", {
      query: {
        enabled: !!activeConversationId,
      },
    });
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (isNewChat) {
      setMessages([]);
      setSelectedDocumentId(null);
    }
  }, [isNewChat]);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );

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
          <InputLabel id="document-select-label">Document</InputLabel>
          <Select
            labelId="document-select-label"
            label="Dokument"
            value={selectedDocumentId ?? ""}
            onChange={(e) => setSelectedDocumentId(e.target.value)}
          >
            {documents?.length === 0 ? (
              <MenuItem disabled value="">
                No available documents
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
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          isNewChat={isNewChat}
          setIsNewChat={setIsNewChat}
          refetchConversations={refetchConversations}
        />
      </Box>
    </Box>
  );
}
