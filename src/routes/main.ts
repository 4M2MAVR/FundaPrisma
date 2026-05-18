import { Router } from 'express';
import { prisma } from '../libs/prisma';
import {
    createUser,
    createUsers,
    getAllUsers,
    getUserByEmail
} from '../services/user';
import { create } from 'domain';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'wild john',
        email: 'johnwild@wild.com',
        posts: {
            create: {
                title: 'Post 1 - wild john',
                content: 'Content of post 1 - wild john'
            }
        }
    })
    if (user) {
        res.status(201).json
    } else {
        res.status(400)
    }
})

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        { name: 'Alice Smith', email: 'alice.smith@example.com' },
        { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
        { name: 'Charlie Brown', email: 'charlie.brown@example.com' },
        { name: 'David Wilson', email: 'david.wilson@example.com' },
        { name: 'Satoro', email: 'johnhonored@exemple.com' },
        { name: 'Not Megumi', email: 'sukunafrfr@exemple.com' },
        { name: 'Kenjaku', email: 'fortheplan@exemple.com' }
    ])
    if (result) {
        res.status(201).json({ ok: true })
    } else {
        res.status(400).json({ error: 'Error creating users' })
    }
})

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers()
    if (users) {
        res.json({ users })
    } else {
        res.status(500).json({ error: 'Error fetching users' })
    }
})

mainRouter.get('/user', async (req, res) => {
    const user = await getUserByEmail('alice.smith@example.com')
    if (user) {
        res.json({ user })
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})