"use client";

import { useState, useCallback, useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        // Calculate new dimensions (max 1200px)
        const MAX_SIZE = 1200;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP Base64 (smaller size)
        const base64 = canvas.toDataURL("image/webp", 0.8);
        onChange(base64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-slate-300 mb-2">{label}</p>
      
      {value ? (
        <div className="relative w-full h-48 md:h-64 rounded-xl border border-slate-700/50 overflow-hidden group bg-[#020617]/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Upload preview" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-48 md:h-64 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
            isDragging 
              ? "border-blue-500 bg-blue-500/10" 
              : "border-slate-700/50 bg-[#020617]/50 hover:bg-slate-800/50 hover:border-slate-600"
          }`}
        >
          <div className={`p-4 rounded-full ${isDragging ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"}`}>
            {isDragging ? <UploadCloud className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">
              {isDragging ? "Drop image here" : "Click or drag image to upload"}
            </p>
            <p className="text-xs text-slate-500 mt-1">JPEG, PNG, WebP up to 5MB</p>
          </div>
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
      
      {!value && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-xs text-slate-500 font-medium uppercase">OR</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>
      )}
      {!value && (
        <div className="mt-4">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste an image URL instead..."
            className="w-full h-10 bg-[#020617]/50 border border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg px-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)] text-sm"
          />
        </div>
      )}
    </div>
  );
}
