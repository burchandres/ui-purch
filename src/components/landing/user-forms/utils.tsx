import z from 'zod';

/**
 * converts a Zod schema to an edit schema where all fields are optional
 * but at least one field must be provided
 */
export function createEditSchema<T extends z.ZodRawShape>(
	schema: z.ZodObject<T>,
	options?: {
		message?: string;
		keepRequired?: (keyof T)[]; // fields that should remain required even in edit mode
	},
) {
	const { message = 'At least one field must be updated', keepRequired = [] } =
		options ?? {};

	// make all fields optional except those in keepRequired
	const optionalShape = Object.fromEntries(
		Object.entries(schema.shape).map(([key, value]) => {
			if (keepRequired.includes(key as keyof T)) {
				return [key, value];
			}
			// handle ZodOptional and ZodDefault to get the underlying type
			// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
			const innerType = (value as any)._def?.innerType ?? value;
			return [key, innerType.optional()];
		}),
	) as T;

	return z.object(optionalShape).refine(
		(data) => {
			// at least one field must be provided (not undefined and not empty string)
			return Object.values(data).some(
				(value) => value !== undefined && value !== '' && value !== null,
			);
		},
		{ message },
	);
}
