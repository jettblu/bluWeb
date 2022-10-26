import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function addFriend(name:string, email:string){
    const friend = await prisma.friend.create({data:{name:name, email:email}});
    return friend;
}