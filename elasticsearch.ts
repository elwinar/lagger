import * as z from "zod";

export const SearchSchema = z.object({
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

export type Search = z.infer<typeof SearchSchema>;

export const PropertySchema = z.object({
	type: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;

export const MappingSchema = z.record(
	z.string(),
	z.object({
		mappings: z.object({
			properties: z.record(z.string(), PropertySchema),
		}),
	}),
);

export type Mapping = z.infer<typeof MappingSchema>;
