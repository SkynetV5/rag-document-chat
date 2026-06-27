import { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";

const ACCEPTED_TYPES = ["application/pdf"];
const ACCEPTED_EXTENSIONS = ".pdf";
const MAX_SIZE_MB = 25;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return (
    ACCEPTED_TYPES.includes(file.type) || ["pdf"].includes(extension ?? "")
  );
}

export default function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateAndSetFile = useCallback((nextFile: File | null) => {
    if (!nextFile) {
      setFile(null);
      setError(null);
      return;
    }

    if (!isAcceptedFile(nextFile)) {
      setError("Dozwolone formaty: PDF");
      setFile(null);
      return;
    }

    if (nextFile.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Plik jest za duży. Maksymalny rozmiar: ${MAX_SIZE_MB} MB.`);
      setFile(null);
      return;
    }

    setFile(nextFile);
    setError(null);
  }, []);

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    validateAndSetFile(event.dataTransfer.files[0] ?? null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: podłącz endpoint API
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("upload", file.name);
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack
      spacing={3}
      alignItems="center"
      sx={{ width: "100%", maxWidth: 560 }}
    >
      <Box
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          width: "100%",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 4,
          py: 5,
          borderRadius: 3,
          border: "2px dashed",
          borderColor: error
            ? "error.main"
            : isDragging
              ? "primary.main"
              : "divider",
          bgcolor: isDragging ? "action.hover" : "background.paper",
          cursor: "pointer",
          transition:
            "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
          transform: isDragging ? "scale(1.01)" : "none",
          boxShadow: isDragging ? 4 : 0,
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "action.hover",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 4,
          },
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: isDragging ? "primary.main" : "action.selected",
            color: isDragging ? "primary.contrastText" : "primary.main",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          <CloudUploadOutlinedIcon sx={{ fontSize: 36 }} />
        </Box>

        <Stack spacing={0.75} alignItems="center" textAlign="center">
          <Typography variant="h6">
            {isDragging ? "Upuść plik tutaj" : "Przeciągnij i upuść plik"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            lub kliknij, aby wybrać z dysku
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            PDF · max {MAX_SIZE_MB} MB
          </Typography>
        </Stack>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleInputChange}
        />
      </Box>

      {error && (
        <Typography variant="body2" color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {file && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <InsertDriveFileOutlinedIcon color="primary" />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" noWrap>
              {file.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatFileSize(file.size)}
            </Typography>
          </Box>
          <Chip
            label="Gotowy"
            size="small"
            color="success"
            variant="outlined"
          />
          <IconButton
            size="small"
            aria-label="Usuń plik"
            onClick={() => validateAndSetFile(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        disabled={!file || isUploading}
        onClick={handleUpload}
        startIcon={<CloudUploadOutlinedIcon />}
        sx={{ minWidth: 220 }}
      >
        {isUploading ? "Przesyłanie…" : "Prześlij dokument"}
      </Button>
    </Stack>
  );
}
