import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";

export function ImageDropZone({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      setError("Invalid file. Please upload an image.");
      return;
    }

    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url);
        onUploadComplete(data.secure_url);
        console.log("Image uploaded successfully:", data.secure_url);
      } else {
        console.error("Upload failed:", data);
        setError("Failed to upload the image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [], 
    },
    onDropRejected: () => {
      setError("Only image files are allowed.");
    },
  });

  const handleCancel = () => {
    setImageUrl(null);
    onUploadComplete(null);
  };

  return (
    <div className="text-center">
      {!imageUrl ? (
        <div
          {...getRootProps()}
          className={`border-dashed border-2 p-6 rounded-md cursor-pointer transition ${
            isDragActive ? "border-indigo-500 bg-indigo-100" : "border-gray-400 bg-gray-700"
          }`}
        >
          <input {...getInputProps()} />
          <AiOutlineCloudUpload size={48} className="text-gray-400 mb-2 mx-auto" />
          {isDragActive ? (
            <p className="text-indigo-500 font-semibold">Drop your image here...</p>
          ) : (
            <p className="text-gray-300 font-medium">
              Drag & drop an image here, or click to select one
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-400 mb-2">Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-red-500 font-medium">{error}</p>}
      {uploading && <p className="mt-2 text-indigo-500 font-medium">Uploading...</p>}
    </div>
  );
}

ImageDropZone.propTypes = {
  onUploadComplete: PropTypes.func.isRequired,
};
