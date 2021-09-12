import { Request , Response, NextFunction }   from 'express'
import { UsersRepositories} from '../repositories/UsersRepositories'
import { getCustomRepository } from 'typeorm';

interface IUserResquest {
    admin?: boolean;
}

export async function  ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction
    ){
    // Verificar se usuario admin
    const { user_id } = request;
    
    const usersRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRepositories.findOne(user_id) as IUserResquest;

   if(admin){
        return next()
    }

    return response.status(481).json({
        error: 'User is not admin'
    })
}