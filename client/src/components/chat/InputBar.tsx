import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import {
  useGetChatGetChatByIdId,
  usePostChatCreate,
  usePostChatSendMessage,
} from "../../api/chats/chats";
import { usePostMessageCreate } from "../../api/messages/messages";
import { usePostDocumentChatsCreate } from "../../api/document-chats/document-chats";

type InputBar = {
  setMessages: () => void;
  documentId: string;
  disabled: boolean;
  isNewChat: boolean;
  setIsNewChat: (value: boolean) => void;
  activeConversationId?: string;
  onSelectConversation?: (id: string) => void;
  refetchConversations: () => void;
};

export default function InputBar({
  setMessages,
  documentId,
  disabled,
  isNewChat,
  setIsNewChat,
  activeConversationId,
  onSelectConversation,
  refetchConversations,
}: any) {
  const [text, setText] = useState("");

  const createNewChat = usePostChatCreate();
  const createMessage = usePostMessageCreate();
  const sendMessageToChat = usePostChatSendMessage();
  const createDocumentChat = usePostDocumentChatsCreate();

  const { data: chatData, refetch: refetchChat } = useGetChatGetChatByIdId(
    activeConversationId,
    {
      query: {
        enabled: !!activeConversationId,
      },
    },
  );

  const sendMessage = async () => {
    if (!text) return;

    let chatId = activeConversationId;

    if (isNewChat) {
      const chat = await createNewChat.mutateAsync({ data: { title: text } });

      chatId = chat.id;
      setIsNewChat(false);
      onSelectConversation?.(chat.id);
      refetchConversations();
    } else {
      await refetchChat();
    }

    await createDocumentChat.mutateAsync({
      data: {
        documentId: documentId,
        chatId: chatId,
      },
    });

    const message = await createMessage.mutateAsync({
      data: { chatId: chatId, role: "user", content: text },
    });

    setMessages((prev: any) => [
      ...prev,
      {
        id: message.id,
        chatId: message.chat_id,
        role: message.role,
        content: message.content,
      },
    ]);

    const answer = await sendMessageToChat.mutateAsync({
      data: {
        chatId: chatId,
        message: message.content,
      },
    });

    const messageAnswer = await createMessage.mutateAsync({
      data: {
        chatId: chatId,
        role: "assistant",
        content: answer.answer,
      },
    });

    setMessages((prev: any) => [
      ...prev,
      {
        id: messageAnswer.id,
        chatId: messageAnswer.chat_id,
        role: messageAnswer.role,
        content: messageAnswer.content,
      },
    ]);

    setText("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question..."
      />
      <Button variant="contained" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
}
