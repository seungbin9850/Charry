import bcrypt from "bcrypt-nodejs";

export const passwordEncoding = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password);
};

export const passwordCompare = async (
  inputPassword: string,
  encodedPassword: string
): Promise<boolean> => {
  return await bcrypt.compareSync(inputPassword, encodedPassword);
};
