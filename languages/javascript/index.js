import { SailhouseClient } from "@sailhouse/client";
import express from 'express';
import { createUser } from "./database";

const app = express();

app.use(express.json())

const client = new SailhouseClient(process.env.SAILHOUSE_TOKEN);

app.post('/api/user', async(req, res) => {
    const { email, password } = req.body;

    // Insert the user into your database
    const id = await createUser({ email, password });

    await client.publish('user-created', {
        id,
        email,
        createdAt: new Date().toISOString()
    })

    return res.json({ id });
});
