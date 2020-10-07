import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Chat extends Model {
  userId: string;
  roomId: string;
  content: string;
}

Chat.init(
  {
    userId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    roomId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING(500),
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "chat",
  }
);
