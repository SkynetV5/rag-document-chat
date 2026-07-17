import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import type { GetChatGetAllChatsQueryResult } from "../../api/chats/chats";
import type { Chat } from "../../types/types";

const DRAWER_WIDTH = 280;

type SidebarProps = {
  open: boolean;
  onClose?: () => void;
  variant?: "permanent" | "persistent" | "temporary";
  conversations?: Chat[];
  activeConversationId?: string;
  onNewChat?: () => void;
  onSelectConversation?: (id: string) => void;
};

export default function Sidebar({
  open,
  onClose,
  variant = "permanent",
  conversations = undefined,
  activeConversationId,
  onNewChat,
  onSelectConversation,
}: SidebarProps) {
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "divider",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          RAG Chat
        </Typography>
      </Toolbar>

      {conversations?.length !== 0 && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onNewChat}
          >
            Nowa rozmowa
          </Button>
        </Box>
      )}
      <Divider />

      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="overline" color="text.secondary">
          Konwersacje
        </Typography>
      </Box>

      <List dense disablePadding sx={{ flex: 1, overflowY: "auto" }}>
        {conversations?.length === 0 ? (
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: 15, mb: 2, textAlign: "center" }}
            >
              Brak konwersacji
            </Typography>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onNewChat}
            >
              Rozpocznij nowy chat
            </Button>
          </Box>
        ) : (
          conversations?.map((chat) => (
            <ListItemButton
              key={chat.id}
              selected={chat.id === activeConversationId}
              onClick={() => onSelectConversation?.(chat.id)}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ChatIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={chat.title} />
            </ListItemButton>
          ))
        )}
      </List>

      <Divider />

      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 5,
          display: "flex",
          flexDirection: "column",

          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ fontSize: 17 }}
        >
          Menu
        </Typography>
        <Link
          variant="overline"
          color="text.secondary"
          underline="none"
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",

            fontSize: 14,
            "&:hover": {
              color: "primary.main",
            },
          }}
          href="/documents"
        >
          <DescriptionIcon
            sx={{
              width: 40,
            }}
          />{" "}
          Lista Dokumentów
        </Link>
        <Link
          variant="overline"
          color="text.secondary"
          underline="none"
          sx={{
            cursor: "pointer",
            display: "flex",
            "&:hover": {
              color: "primary.main",
            },
          }}
          href="/upload"
        >
          <UploadFileIcon sx={{ width: 40 }} /> Prześlij Dokument
        </Link>
      </Box>
    </Drawer>
  );
}

export { DRAWER_WIDTH };
