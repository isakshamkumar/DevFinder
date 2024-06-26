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
type Props = {};

const CreateRoomForm = (props: Props) => {
  const formSchema = z.object({
    projectname: z.string().min(2, {
      message: "Room Name must be at least 2 characters.",
    }),
    projectdescription: z
      .string()
      .min(2, { message: "Room Description must be at least 2 characters" })
      .max(200, {
        message: "Room Description must be less than 200 characters",
      }),
    projectgithub: z
      .string()
      .min(1, { message: "Project Github must be Provided" }),
    projectlivelink: z.string(),
    issue: z.string().min(1, { message: "Issue must be Provided" }),
    tags: z.string().min(1, {
      message: "At least one tag must be provided.",
    }),
  });
const[loading,setLoading]=useState(false)
const session=useSession()
//@ts-ignore
const id= session.data?.user.id
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: "",
      projectdescription: "",
      projectgithub: "",
      projectlivelink: "",
      issue: "",
      tags: "",
    },
    //add more keyss like for particular page like screenshots, more information about the project
  });
  const router=useRouter()
async  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true)
    const response= await fetch('/api/create-room',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //@ts-ignore
      body: JSON.stringify({...values,id})
    })
    
      setLoading(false)
      router.push('/browse-rooms')
  }
  return (
    <div className="border border-slate-700 p-6 rounded-xl" suppressHydrationWarning>
      <h2 className="mb-4 text-3xl font-bold text-center">Create a Room</h2>
        <Form {...form}>
      <div className="  flex gap-6">
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-transparent "
            style={{flex:'3 3 0%'}}
          >
            <FormField
              control={form.control}
              
              name="projectname"
              render={({ field }) => (
                <FormItem className=" space-y-3">
                  <FormLabel className="text-xl">Project Name</FormLabel>
                  <FormControl>
                    <AnimatedInput
                        className="h-12"
                      placeholder="Devfinder"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectdescription"
              render={({ field }) => (
                <FormItem className=" space-y-3">
                  <FormLabel className="text-xl">Project Description</FormLabel>
                  <FormControl>
                    <AnimatedInput
                    className="h-12"
                      placeholder="A Collaborative Environment For developers all over the world to communicate."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectgithub"
              render={({ field }) => (
                <FormItem className=" space-y-3">
                  <FormLabel className="text-xl">Project Github</FormLabel>
                  <FormControl>
                    <AnimatedInput
                      placeholder="https://github.com/your-username/your-project"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectlivelink"
              render={({ field }) => (
                <FormItem className=" space-y-3">
                  <FormLabel className="text-xl">Project Live Link</FormLabel>
                  <FormControl>
                    <AnimatedInput
                      className="h-12"
                      placeholder="https://skumar.devfinder.site"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issue"
              render={({ field }) => (
                <FormItem className=" space-y-3">
                  <FormLabel className="text-xl">Issue You are facing</FormLabel>
                  <FormControl>
                    <AnimatedInput
                      placeholder="
                Enter the Issue you are facing"
                className="h-12"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className=" space-y-3 ">
                  <FormLabel className="text-xl">Project Tags</FormLabel>
                  <FormDescription>
                    Enter the Technologies Used in this project.
                  </FormDescription>
                  <FormControl>
                    <AnimatedInput
                      className="h-12"
                      placeholder="typescript,websockts,..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={()=>onSubmit(form.watch())} disabled={loading} >{loading? 'Creating Room...':'Submit'}</Button>
          </form>
        <Image width={400} quality={90} height={300} src={"/dev.jpeg"} style={{flex:'2 1 0%'}}  className="object-cover" alt=""/>
      </div>
        </Form>
    </div>
  );
};

export default CreateRoomForm;
