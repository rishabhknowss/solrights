import { configDotenv } from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import  authMiddleware  from "../authMiddleware";
configDotenv();

const userRouter = Router();

const prisma = new PrismaClient();

userRouter.post("/signin", async(req : Request,res : Response) : Promise<any>  => {
  const hardcodedWallet = "0x1234567890ffff";
  try{
    const existingUser = await prisma.user.findUnique({
        where: {
          wallet: hardcodedWallet,
        },
      });
        if (existingUser) {
            const token =  jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!);
            return res.json({ token });
        }
    
        const user = await prisma.user.create({
            data: {
                wallet: hardcodedWallet,
                name : req.body.name
            },
        });
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        return res.json({ token });
    
  }catch(e){
    console.log(e);
    return res.status(500).json({ error: "error" });
  }
 
});

userRouter.post("/uploadAssets" ,  authMiddleware  , async(req : Request,res : Response) : Promise<any>  => {
   
});




  
export default userRouter;
