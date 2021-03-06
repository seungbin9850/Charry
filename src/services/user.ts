import { User } from "../models/user";
import { IUserRegisterDTO, IUserLoginDTO } from "../interfaces/IUser";
import { mkId } from "../utils/uuid";
import { HttpError } from "../exception/exception";
import { passwordEncoding, passwordCompare } from "../utils/bcrypt";
import { mkAccess, mkRefresh } from "../utils/mkToken";

export const createUser = async (userRegisterDTO: IUserRegisterDTO) => {
  const { userId, password, nickname } = userRegisterDTO;
  const id: string = await mkId();
  const encodedPassword: string = await passwordEncoding(password);
  if (!(await isExists(userId)))
    await User.create({ id, userId, password: encodedPassword, nickname });
  else throw new HttpError(409, "user id already exists");
};

const isExists = async (userId: string): Promise<boolean> => {
  if (await User.findOne({ where: { userId } })) return true;
  return false;
};

export const login = async (
  userLoginDTO: IUserLoginDTO,
  accessSecret: string,
  refreshSecret: string
): Promise<object> => {
  const { userId, password } = userLoginDTO;
  const user = await findOneUser(userId);
  if (!(await passwordCompare(password, user.password)))
    throw new HttpError(404, "user not found");
  const accessToken = await mkAccess(user.id, accessSecret);
  const refreshToken = await mkRefresh(user.id, refreshSecret);
  return { accessToken, refreshToken };
};

export const findOneUser = async (userId: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { userId } });
    return user;
  } catch (e) {
    throw new HttpError(404, "user not found");
  }
};

export const findOneUserById = async (id: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw new HttpError(404, "user not found");
  }
};

export const refresh = async (
  id: string,
  accessSecret: string
): Promise<string> => {
  return await mkAccess(id, accessSecret);
};
