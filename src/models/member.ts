import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Member extends Model {
  roomId: string;
  userId: string;
}

Member.init(
  {
    roomId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    userId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "member",
  }
);
