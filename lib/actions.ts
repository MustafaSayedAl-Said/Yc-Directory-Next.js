"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";
import { auth } from "@/auth";

import slugify from "slugify";

export const createPitch = async (state: unknown, form: FormData, pitch: string) => {
    const session = await auth();

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR"
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != "pitch")
    );
    const slug = slugify(title as string, {
        lower: true,
        strict: true,
    });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            pitch,
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
        };

        const result = await writeClient.create({ _type: 'startup', ...startup });

        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS",
        });

    } catch (error) {
        console.log(error);

        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
}