import React from 'react';
import { generateUploadButton } from "@uploadthing/react";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { FormItem, FormLabel } from "@/components/ui/form";
import { OurFileRouter } from '@/app/api/uploadthing/core';

type ImageUploadProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setImageUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  imageUploadProgress: number;
};

export const UploadButton = generateUploadButton<OurFileRouter>();

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages, setImageUploadProgress, imageUploadProgress }) => {
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const remainingImages = 5 - images.length;

  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-xl font-semibold">Project Images ({images.length}/5)</FormLabel>
      <div className="flex items-center space-x-4">
        <UploadButton
          endpoint="imageUploader"
          onUploadProgress={(progress) => {
            setImageUploadProgress(progress);
          }}
          onClientUploadComplete={(res) => {
            setImages((prev) => [...prev, ...res.map((file) => file.url)].slice(0, 5));
            setImageUploadProgress(0);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
            setImageUploadProgress(0);
          }}
        />
        {imageUploadProgress > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${imageUploadProgress}%` }}></div>
            </div>
            <span className="text-sm font-medium">{imageUploadProgress}%</span>
          </div>
        )}
        <span className="text-sm font-medium">{remainingImages} slots left</span>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <Image src={url} alt={`Project image ${index + 1}`} width={200} height={200} objectFit="cover" className="rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => removeImage(index)} className="text-white p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FormItem>
  );
};

export default ImageUpload;