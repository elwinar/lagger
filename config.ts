import * as z from "zod";

export const ConfigSchema = z.object({
	elasticsearch_url: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
