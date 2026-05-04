import { Role } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser } from '../services/user'

export const mainRouter = Router()

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'John doe',
        email: 'john.doe@example.com'
})

    res.json(user)
})
