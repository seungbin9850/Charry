import bcrypt from "bcrypt-nodejs";

export const passwordEncoding = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password);
};

export const passwordCompare = async (
  password: string,
  encodedPassword: string
): Promise<boolean> => {
  return await bcrypt.compareSync(password, encodedPassword);
};
