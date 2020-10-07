import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class User extends Model {
  id: string;
  password: string;
  name: string;
  img: string;
}

User.init(
  {
    id: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    userId: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
