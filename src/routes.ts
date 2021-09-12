import { Router } from "express";
import { CreateUserController} from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ListUserReceiverComplimentsControler } from './controllers/ListUserReceiverComplimentsControler'
import { ListUserSendComplimentsControler } from './controllers/ListUserSendComplimentsControler' 
import { ListTagsController } from './controllers/ListTagsController'
import { ensureAdmin} from './middlewares/ensureAdmin';
import { ensureAuthenticated} from './middlewares/ensureAuthenticated'
import { DeleteTagsController } from './controllers/DeleteTagsController'

const router =  Router();

const createUserController = new CreateUserController();
const createTagController  = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiverComplimentsControler = new ListUserReceiverComplimentsControler();
const listUserSendComplimentsControler = new ListUserSendComplimentsControler();
const listTagsController = new ListTagsController()
const deleteTagsController = new DeleteTagsController()

router.post('/users', createUserController.handle);
router.post('/tags' , ensureAuthenticated,ensureAdmin, createTagController.handle);
router.get('/tags'  , ensureAuthenticated, listTagsController.handle)
router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/user/compliments/sender', ensureAuthenticated,listUserReceiverComplimentsControler.handled)
router.get('/user/compliments/receiver', ensureAuthenticated,listUserSendComplimentsControler.handled)
router.get('/user/compliments/receiver', ensureAuthenticated,listUserSendComplimentsControler.handled)
router.delete('/tag/delete',ensureAuthenticated,ensureAdmin,  deleteTagsController.handle)
export { router}