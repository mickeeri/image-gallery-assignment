import z from "zod";

const ImageSchema = z.object({
  id: z.string(),
  altDescription: z.string().nullable(),
  urls: z.object({
    small: z.string().url(),
    regular: z.string().url(),
  }),
});

const ImageListSchema = z.array(ImageSchema);

export const ImageResponseSchema = z.object({
  nextUrl: z.string().url().optional(),
  images: ImageListSchema,
});

export type ImageResponse = z.infer<typeof ImageResponseSchema>;

export type Image = z.infer<typeof ImageSchema>;
