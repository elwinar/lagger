import * as z from "zod";

export const SearchResponseSchema = z.object({
	_shards: z.object({
		failed: z.number(),
		skipped: z.number(),
		successful: z.number(),
		total: z.number(),
	}),
	hits: z.object({
		hits: z.array(
			z.object({
				_id: z.string(),
				_index: z.string(),
				_score: z.number(),
				_source: z.object({
					bytes: z.number(),
					datetime: z.string(),
					host: z.string(),
					method: z.string(),
					protocol: z.string(),
					referer: z.string(),
					request: z.string(),
					status: z.string(),
					"user-identifier": z.string(),
				}),
			}),
		),
		max_score: z.number(),
		total: z.object({ relation: z.string(), value: z.number() }),
	}),
	timed_out: z.boolean(),
	took: z.number(),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
