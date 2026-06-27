import { Routes, Route } from "react-router";
import LandingPage from "../pages/LandingPage";
import UploadPage from "../pages/UploadPage";
import DocumentsListPage from "../pages/DocumentsListPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/documents" element={<DocumentsListPage />} />
    </Routes>
  );
}
