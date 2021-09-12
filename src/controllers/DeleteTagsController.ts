import {Request, Response} from 'express'
import {DeleteTagsService } from '../services/DeleteTagService'

class DeleteTagsController{
    async handle( request: Request, response: Response){
        const deleteTagsService = new DeleteTagsService();
        const tags = await deleteTagsService.execute(request.body.id);

        return response.json(tags);
        
    }
}

export {DeleteTagsController} 