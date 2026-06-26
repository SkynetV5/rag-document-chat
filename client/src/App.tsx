import { useState } from "react";
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
import ChatPage from "./pages/ChatPage";
import Sidebar, { DRAWER_WIDTH } from "./components/app/Sidebar";
import "./App.css";
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [conversations, setConversations] = useState([
    { id: "1", title: "Pytania o umowę" },
    { id: "2", title: "Podsumowanie raportu" },
  ]);
  const [documents, setDocuments] = useState([
    { id: "a", name: "raport-2024.pdf" },
    { id: "b", name: "umowa.pdf" },
    { id: "c", name: "umowa.pdf" },
  ]);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
        conversations={conversations}
        onNewChat={() => console.log("new chat")}
        onSelectConversation={(id) => console.log("select", id)}
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
          <ChatPage documents={documents} />
        </Container>
      </Box>
    </Box>
  );
}
export default App;
