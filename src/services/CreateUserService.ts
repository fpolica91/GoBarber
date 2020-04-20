import { getRepository } from 'typeorm';
import User from '../Models/User';
interface Request {
  name: string;
  email: string;
  password: string;
}

export default class UserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserEmail = await usersRepository.findOne({
      where: { email }
    });

    if (checkUserEmail) {
      throw new Error('Email address already in use!');
    }
    const user = usersRepository.create({ name, email, password });
    await usersRepository.save(user);
    return user;
  }
}
