import { sign } from "jsonwebtoken";
import { promisify } from "util";

export const mkAccess = async (id: string, secret: string): Promise<string> => {
  return promisify(sign)({ id }, secret, { expiresIn: "500m" });
};

export const mkRefresh = async (
  id: string,
  secret: string
): Promise<string> => {
  return promisify(sign)({ id }, secret, { expiresIn: "1w" });
};
