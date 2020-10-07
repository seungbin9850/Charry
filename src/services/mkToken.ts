import jwt from "jsonwebtoken";

export const mkAccess = async (id: string, secret: string): Promise<string> => {
  const token: string = await jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: "500m",
    }
  );
  return token;
};

export const mkRefresh = async (
  id: string,
  secret: string
): Promise<string> => {
  const token: string = await jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: "1w",
    }
  );
  return token;
};
