/*
IT21833366
wijerathna G.D.K
AF-assignment-01
React-Frontend-Application-Using-NASA-APIs
 */
import  express  from "express";
import { test, updateUser, deleteUser, signout, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken,updateUser);
router.delete('/delete/:userId', verifyToken,deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);




export default router;