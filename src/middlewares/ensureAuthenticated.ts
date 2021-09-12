import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken' 

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    // Receber o token 
    const authtoken = request.headers.authorization

    // Validar toke está prenchido
    if(!authtoken) {
        return response.status(401).end()
    }

    const [,token] = authtoken.split(' ')

 
    try{
    // Validar se tokken é valido
    const {sub} = verify(token, '60d380276907265c3d2125fd1a7735fa') as IPayload

    request.user_id = sub
    return next();
    } catch(err){

        return response.status(401).end()

    }
    
    

    

    // Recuperar informação de usuario
}