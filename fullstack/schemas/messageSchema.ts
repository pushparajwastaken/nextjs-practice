import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be atleast 10 letters" })
    .min(10, { message: "Content must be atleast 10 letters" })
    .max(300, { message: "Content can be atmost 300 words" }),
});
