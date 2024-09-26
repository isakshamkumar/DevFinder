import { formFields } from "./constant";
import { z } from "zod";
export type FormFieldType = {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  description?: string;
};
export const formSchema = z.object(
    Object.fromEntries(
      formFields.map(field => [
        field.name,
        field.name === "projectdescription"
          ? z.string().min(2, { message: "Room Description must be at least 2 characters" }).max(200, { message: "Room Description must be less than 200 characters" })
          : z.string().min(1, { message: `${field.label} must be provided.` })
      ])
    )
  );