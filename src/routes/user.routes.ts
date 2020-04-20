import { Router } from 'express';
const userRouter = Router();
import UserService from '../services/CreateUserService';
/**
 *
 */

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new UserService();
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default userRouter;
