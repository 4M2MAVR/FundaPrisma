import {Prisma} from "@prisma/client"
import {prisma} from "../libs/prisma"
import { skip } from "node:test"

type CreateUserProps = {
    name:string
    email:string
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
    //     const user = await prisma.user.create({
    //     data
    // })

    // return user

    return await prisma.user.create({data})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === 'P2002') {
                console.error('Error: Email already exists')
                return false
            }
        }
        console.log('Error creating user:', error)
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try { await prisma.user.createMany ({
    data: users,
    skipDuplicates: true
    })
} catch(error) {
    console.log('Error creating users:', error)
    return false
}
}

export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany({
            select: {
                
            }
        })
    } catch(error) {
        console.log('Error fetching users:', error)
        return false
    }
}