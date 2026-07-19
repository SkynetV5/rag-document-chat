import { Box, Typography, Toolbar, AppBar, Container } from "@mui/material";
import { Link } from "@mui/material";
import UploadDropzone from "../components/upload/UploadDropzone";

export default function UploadPage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Upload Document
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
                href="/documents"
              >
                Documents List
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container
          maxWidth="md"
          sx={{
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{
              mt: 8,
              mb: 4,
              maxWidth: 480,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Add the document to the knowledge base. Once processed, you'll be
            able to ask questions in the chat
          </Typography>
          <UploadDropzone />
        </Container>
      </Box>
    </Box>
  );
}
