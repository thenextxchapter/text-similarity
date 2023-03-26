import { cosineSimilarity } from "@/helpers/cosine-similarity";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

/* We're creating a schema to check the input that comes in because we really can't trust the client input. So we're essentially trying to make sure that whatever input is coming in is inline with the schema that we're creating */
const reqSchema = z.object({
	text1: z.string().max(1000),
	text2: z.string().max(1000),
});
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body as unknown; //this forces us to properly validate the body

	// Validate the api key
	const apiKey = req.headers.authorization;
	if (!apiKey) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const { text1, text2 } = reqSchema.parse(body);

		const validApiKey = await db.apiKey.findFirst({
			where: {
				key: apiKey,
				enabled: true,
			},
		});

		if (!validApiKey) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const start = new Date();
		/* We're using openAI to turn text into a long array of vectors and then we can compare the mathematical position of two vectors in the room and the closer they are together, the more similar the text is */
		const embeddings = await Promise.all(
			[text1, text2].map(async (text) => {
				/* We're now going to use OpenAI to create the actual vectors for us so it's going to turn the text that we have into a vector */
				const res = await openai.createEmbedding({
					model: "text-embedding-ada-002",
					input: text,
				});

				return res.data.data[0].embedding;
			})
		);

		const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

		const duration = new Date().getTime() - start.getTime();

		// Persist request
		await db.apiRequest.create({
			data: {
				duration,
				method: req.method as string,
				path: req.url as string,
				status: 200,
				apiKeyId: validApiKey.id,
				usedApiKey: validApiKey.key,
			},
		});

		return res.status(200).json({ succes: true, text1, text2, similarity });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues });
		}

		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default withMethods(["POST"], handler);
