import { getCustomRepository } from "typeorm"
import {TagsRepositories} from '../repositories/TagsRepositories'

class DeleteTagsService {
    async execute(id: string){
        const tagsRepositories = getCustomRepository(TagsRepositories)
        const tags = await tagsRepositories.delete({id:id})

        return tags

    }
}
export { DeleteTagsService }