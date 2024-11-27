import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export function MediaUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
        setUploading(false);
        setProgress(0);
        setFile(null);
        setPreview(null);
      }
    );
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview ? (
        <div className="bg-black p-4 rounded-lg shadow-lg">
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-64 h-64 object-cover rounded-lg"
            />
            <button
              onClick={clearSelection}
              className="absolute top-2 right-2 p-1 bg-black rounded-full"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {uploading && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-green-600 rounded" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-4 bg-green-600 rounded-full shadow-lg hover:bg-green-700"
        >
          <Upload className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}