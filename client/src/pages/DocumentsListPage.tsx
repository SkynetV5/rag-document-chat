import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useState } from "react";
import type { Document } from "../types/types";
import {
  useDeleteDocumentDeleteId,
  useGetDocumentGetAllDocuments,
} from "../api/documents/documents";
import {
  useDeleteDocumentChatsDeleteByDocumentIdId,
  useGetDocumentChatsGetByDocumentId,
} from "../api/document-chats/document-chats";

export default function DocumentsListPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const {
    data: documentsData,
    error: documentsDataError,
    isLoading: isLoadingDocumentsData,
    refetch,
  } = useGetDocumentGetAllDocuments();

  const deleteDocument = useDeleteDocumentDeleteId();

  const deleteDocumentInChats = useDeleteDocumentChatsDeleteByDocumentIdId();

  useEffect(() => {
    if (documentsData) {
      setDocuments(documentsData);
    }
  }, [documentsData]);

  const handleDelete = (id: string) => {
    deleteDocument.mutate(
      { id },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Documents List
            </Typography>
            <Box sx={{ display: "flex", gap: 5 }}>
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
                  fontSize: 16,
                }}
                href="/"
              >
                Chat
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
                  fontSize: 16,
                }}
                href="/upload"
              >
                Upload Document
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            mt: 5,
            px: 2,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {isLoadingDocumentsData ? (
            <CircularProgress
              aria-label="Loading…"
              color="error"
              size={70}
              sx={{
                maxWidth: 900,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            />
          ) : documentsDataError ? (
            <Typography variant="h5" fontWeight="bold" mb={1} color="error">
              Error in fetch data!
            </Typography>
          ) : (
            <>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Your documents
              </Typography>

              <Typography color="text.secondary" mb={4}>
                Manage your uploaded documents.
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <List disablePadding>
                  {documents.map((doc, index) => (
                    <Box key={doc.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        }
                        sx={{
                          py: 2,
                          transition: ".2s",
                          "&:hover": {
                            bgcolor: "grey.800",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ mr: 1 }}>
                          <PictureAsPdfIcon color="error" fontSize="large" />
                        </ListItemIcon>

                        <ListItemText
                          primary={
                            <Typography fontWeight={600}>{doc.name}</Typography>
                          }
                          secondary={`Uploaded: ${new Date(Number(doc.file_path.split("-")[0]) * 1000)}`}
                        />

                        <Chip
                          sx={{ px: 0.5, mx: 1 }}
                          icon={<DescriptionIcon />}
                          label={`${(doc.size / 1024).toFixed(2)} KB`}
                          variant="outlined"
                        />
                      </ListItem>

                      {index !== documents.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </Paper>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
