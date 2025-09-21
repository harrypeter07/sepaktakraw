"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

interface ImageUploadProps {
  onImageUpload: (result: {
    url: string;
    path: string;
    publicUrl: string;
    cdnUrl: string;
  }) => void;
  currentImageUrl?: string;
  bucket?: string;
  folder?: string;
  className?: string;
}

export function ImageUpload({ 
  onImageUpload, 
  currentImageUrl, 
  bucket = "images", 
  folder = "uploads",
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");
  const [error, setError] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onImageUpload(data.data);
      setPreviewUrl(data.data.cdnUrl);
      setImageUrl("");
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onImageUpload(data.data);
      setPreviewUrl(data.data.cdnUrl);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    onImageUpload({
      url: "",
      path: "",
      publicUrl: "",
      cdnUrl: ""
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
        <CardDescription>
          Upload an image from URL or select a file from your device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Method Selection */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant={uploadMethod === "url" ? "primary" : "outline"}
            onClick={() => setUploadMethod("url")}
            size="sm"
          >
            From URL
          </Button>
          <Button
            type="button"
            variant={uploadMethod === "file" ? "primary" : "outline"}
            onClick={() => setUploadMethod("file")}
            size="sm"
          >
            From File
          </Button>
        </div>

        {/* URL Upload Form */}
        {uploadMethod === "url" && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? "Uploading..." : "Upload from URL"}
            </Button>
          </form>
        )}

        {/* File Upload */}
        {uploadMethod === "file" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileUpload">Select Image File</Label>
              <Input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                disabled={isUploading}
              />
            </div>
            <div className="text-sm text-gray-500">
              Supported formats: JPG, PNG, GIF, WebP, SVG (Max 10MB)
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Image Preview */}
        {previewUrl && (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={previewUrl}
                alt="Preview"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg border"
                onError={() => setError("Failed to load image preview")}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={handleRemoveImage}
              >
                Remove
              </Button>
            </div>
            <div className="text-sm text-gray-500 break-all">
              <strong>Image URL:</strong> {previewUrl}
            </div>
          </div>
        )}

        {/* Upload Status */}
        {isUploading && (
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Uploading image...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
