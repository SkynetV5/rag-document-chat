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
              Prześlij dokument
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
                Lista Dokumentów
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
            Dodaj dokument do bazy wiedzy. Po przetworzeniu będziesz mógł
            zadawać pytania w czacie.
          </Typography>
          <UploadDropzone />
        </Container>
      </Box>
    </Box>
  );
}
