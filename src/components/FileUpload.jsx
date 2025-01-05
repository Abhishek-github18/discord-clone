import { useState } from "react";
import { UploadthingClient } from "uploadthing";

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const ut = new UploadthingClient({ apiBase: "/api/uploadthing" });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      // Create an upload session
      const session = await ut.createUploadSession({
        files: [{ name: selectedFile.name, size: selectedFile.size }],
      });

      // Upload the file
      const uploadUrl = session.uploadUrls[0].url;
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadResult && (
        <div>
          <p>File uploaded successfully:</p>
          <a href={uploadResult.fileUrl} target="_blank" rel="noopener noreferrer">
            {uploadResult.fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

