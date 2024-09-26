"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnimatedInput } from "../ui/AnimatedInput";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload";
import VideoUpload from "../videoUpload";
import { formFields } from "@/app/constant";
import { formSchema } from "@/app/types";

type FormSchema = z.infer<typeof formSchema>;

const CreateRoomForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);

  const session = useSession();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      formFields.map((field) => [field.name, ""])
    ) as FormSchema,
  });

  const onSubmit = async (values: FormSchema) => {
    let newValues = {
      projectName: values.projectname,
      projectDescription: values.projectdescription,
      projectGithub: values.projectgithub,
      projectLiveLink: values.projectlivelink,
      issue: values.issue,
      tags: values.tags,
      screenshots: images,
      videos: video ? [video] : [],
      id: session.data?.user.id,
    };
    setLoading(true);
    try {
      const response = await fetch("/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setLoading(false);
      router.push("/browse-rooms");
    } catch (error) {
      console.error("Error creating room:", error);
      alert(`Error creating room: ${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="border border-slate-700 p-4 sm:p-6 rounded-xl max-w-7xl mx-auto">
      <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-center">
        Create a Room
      </h2>
      <Form {...form}>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 bg-transparent lg:flex-[3] w-full"
          >
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base sm:text-lg">
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <textarea
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      ) : (
                        <AnimatedInput
                          className="h-9 sm:h-10"
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      )}
                    </FormControl>
                    {field.description && (
                      <FormDescription>{field.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <ImageUpload
              images={images}
              setImages={setImages}
              imageUploadProgress={imageUploadProgress}
              setImageUploadProgress={setImageUploadProgress}
            />

            <VideoUpload
              video={video}
              setVideo={setVideo}
              videoUploadProgress={videoUploadProgress}
              setVideoUploadProgress={setVideoUploadProgress}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Creating Room..." : "Submit"}
            </Button>
          </form>
          <div className="lg:flex-[2] relative h-48 sm:h-64 lg:h-auto mt-4 lg:mt-0">
            <Image
              fill
              quality={90}
              src="/dev.jpeg"
              className="object-cover rounded-lg"
              alt="Developer illustration"
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateRoomForm;
