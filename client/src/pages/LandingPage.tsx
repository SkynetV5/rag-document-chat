import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatPage from "./ChatPage";
import Sidebar, { DRAWER_WIDTH } from "../components/app/Sidebar";
import {
  useGetChatGetAllChats,
  type GetChatGetAllChatsQueryResult,
} from "../api/chats/chats";
import {
  useGetDocumentGetAllDocuments,
  type GetDocumentGetAllDocumentsQueryResult,
} from "../api/documents/documents";

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile);
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [activeConversationId, setActiveConversationId] = useState<string>("");

  const { data: conversationsData, refetch: refetchConversations } =
    useGetChatGetAllChats(undefined);
  const [conversations, setConversations] = useState<
    GetChatGetAllChatsQueryResult | undefined
  >(undefined);

  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }
  }, [conversationsData]);

  const { data: documentsData } = useGetDocumentGetAllDocuments();
  const [documents, setDocuments] = useState<
    GetDocumentGetAllDocumentsQueryResult | undefined
  >(undefined);

  useEffect(() => {
    if (documentsData) {
      setDocuments(documentsData);
    }
  }, [documentsData]);

  const conversationsList = conversations ?? [];
  const documentsList = documents ?? [];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
        conversations={conversations}
        onNewChat={setIsNewChat}
        onSelectConversation={(id) => setActiveConversationId(id)}
        activeConversationId={activeConversationId}
        refetchConversations={refetchConversations}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { md: `${DRAWER_WIDTH}px` },
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setSidebarOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              RAG Document Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container maxWidth="md" sx={{ py: 2 }}>
          <ChatPage
            documents={documentsList}
            isNewChat={isNewChat}
            setIsNewChat={setIsNewChat}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            refetchConversations={refetchConversations}
          />
        </Container>
      </Box>
    </Box>
  );
}
