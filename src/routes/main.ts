import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUsers, getAllUsers} from '../services/user'
import { create } from 'domain';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) =>{
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
} )

mainRouter.post('/users', async(req,res) => {
    const result = await createUsers([
        {name: 'Satoro', email: 'johnhonored@exemple.com'},
        {name: 'Not Megumi', email: 'sukunafrfr@exemple.com'},
        {name: 'Kenjaku', email: 'fortheplan@exemple.com'}
    ])
    if (result) {
    res.status(201).json({ ok : true})
    } else {
        res.status(400).json({error: 'Error creating users'})
    }
})

mainRouter.get('user', async (req,res) => {
    const users = await getAllUsers()
    if (users) {
        res.json({ users})
    } else {
        res.status(500).json({ error: 'Error fetching users'})
    }
})