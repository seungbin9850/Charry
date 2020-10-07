import { User } from "../models/user";
import { IUserRegisterDTO, IUserLoginDTO } from "../interfaces/IUser";
import uuid4 from "uuid4";
import { HttpError } from "../exception/exception";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";

const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const createUser = async (userRegisterDTO: IUserRegisterDTO) => {
  const { userId, password, nickname } = userRegisterDTO;
  const id: string = await mkId();
  const encodedPassword: string = await passwordEncoding(password);
  if (!(await isExists(userId)))
    await User.create({ id, userId, password: encodedPassword, nickname });
  else throw new HttpError(409);
};

const isExists = async (userId: string): Promise<boolean> => {
  if (await User.findOne({ where: { userId } })) return true;
  return false;
};

const passwordEncoding = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password);
};

const passwordCompare = async (
  password: string,
  encodedPassword: string
): Promise<boolean> => {
  return await bcrypt.compareSync(password, encodedPassword);
};

export const login = async (
  userLoginDTO: IUserLoginDTO,
  accessSecret: string,
  refreshSecret: string
): Promise<object> => {
  const { userId, password } = userLoginDTO;
  const user = await findOneUser(userId);
  if (!(await passwordCompare(password, user.password)))
    throw new HttpError(404);
  const accessToken = await mkAccess(userId, accessSecret);
  const refreshToken = await mkRefresh(userId, refreshSecret);
  return { accessToken, refreshToken };
};

const findOneUser = async (userId: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { userId } });
    return user;
  } catch (e) {
    throw new HttpError(404);
  }
};

const mkAccess = async (userId: string, secret: string): Promise<string> => {
  const token: string = await jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "500m",
    }
  );
  return token;
};

const mkRefresh = async (userId: string, secret: string): Promise<string> => {
  const token: string = await jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "1w",
    }
  );
  return token;
};
