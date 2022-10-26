import { NextApiRequest, NextApiResponse } from "next";

import { Friend } from "@prisma/client";
import { addFriend } from "../../prisma/script";


type Data = {
    friend:Friend|null
    msg?:string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Get data submitted in request's body.
    try{
        const body = req.body;
        const name = body.name;
        const email = body.email;
        console.log(req)
        if(!name || !email){
            return res.status(400).json({friend:null, msg:"Email and name are required"});
        }
        const newFriend = await addFriend(name, email);
        return res.status(200).json({friend:newFriend})
    }
    catch(e:any){
        console.log(e.message);
        return res.status(400).json({friend:null, msg:`${e.message}`});
    }
}