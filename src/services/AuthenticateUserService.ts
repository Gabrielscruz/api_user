import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email , password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
            // Vereficar se email existe
        const User = await usersRepositories.findOne({
            email
        })
        
        if(!User){
            throw new Error('Email/Password incorrect')
        }
            // Vereficar se senha está correta
        const passwordMatch = await compare(password,User.password)

        if(!passwordMatch){
            throw new Error('Email/Password incorrect')
        }
            // Gera token
        const token = sign({
            email: User.email,
        },'60d380276907265c3d2125fd1a7735fa',{
            subject: User.id,
            expiresIn: '1d'
        })

        return token;

    }

}

export {AuthenticateUserService}