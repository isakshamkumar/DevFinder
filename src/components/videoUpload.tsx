import React from 'react';
import { generateUploadButton } from "@uploadthing/react";
import { FormItem, FormLabel } from "@/components/ui/form";
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Trash2, Video } from "lucide-react";

type VideoUploadProps = {
  video: string | null;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
  setVideoUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  videoUploadProgress: number;
};

export const UploadButton = generateUploadButton<OurFileRouter>();

const VideoUpload: React.FC<VideoUploadProps> = ({ video, setVideo, setVideoUploadProgress, videoUploadProgress }) => {
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-xl font-semibold">Project Video (Max 1)</FormLabel>
      <div className="flex items-center space-x-4">
        <UploadButton
          endpoint="videoUploader"
          onUploadProgress={(progress) => {
            setVideoUploadProgress(progress);
          }}
          onClientUploadComplete={(res) => {
            if (res[0]) {
              setVideo(res[0].url);
              setVideoUploadProgress(0);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
            setVideoUploadProgress(0);
          }}
        />
        {videoUploadProgress > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${videoUploadProgress}%` }}></div>
            </div>
            <span className="text-sm font-medium">{videoUploadProgress}%</span>
          </div>
        )}
        {video ? (
          <span className="text-sm font-medium text-green-500">Video uploaded</span>
        ) : (
          <span className="text-sm font-medium">No video uploaded</span>
        )}
      </div>
      {video && (
        <div className="mt-4 relative group">
          <video controls className="w-full rounded-lg shadow-md">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => setVideo(null)} 
              className="text-white p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Trash2 size={20} />
              <span>Remove Video</span>
            </button>
          </div>
        </div>
      )}
    </FormItem>
  );
};

export default VideoUpload;