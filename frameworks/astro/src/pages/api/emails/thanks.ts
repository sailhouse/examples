import { push } from "@sailhouse/astro";
import type { APIRoute } from "astro";

export const POST: APIRoute = push('form-submitted', async({request}) => {
    const { email } = await request.json();

    // Send a thank you email

    return new Response();
})
