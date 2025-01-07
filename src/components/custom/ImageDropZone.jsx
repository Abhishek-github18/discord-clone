import { useState } from "react";
import { useDropzone } from "react-dropzone";

export function ImageDropZone() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with your Cloudinary cloud name

    setUploading(true);

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]); // First file from dropzone
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
        setImageUrl(data.secure_url); // Uploaded image URL
        console.log("Image uploaded successfully:", data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-4 rounded-md text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}
