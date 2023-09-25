import { SailhouseClient } from "@sailhouse/client";
import type { APIRoute } from "astro";

const client = new SailhouseClient(import.meta.env.SAILHOUSE_TOKEN);

export const POST: APIRoute = async ({ request, redirect }) => {
    const data = await request.formData();

    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    await client.publish('form-submitted', {
        name,
        email,
        message
    });

    return redirect('/thanks');
}
