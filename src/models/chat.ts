import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Chat extends Model {
  id: string;
  userId: string;
  roomId: string;
  content: string;
  createdAt: Date;
}

Chat.init(
  {
    id: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    userId: {
      type: Sequelize.STRING(30),
    },
    roomId: {
      type: Sequelize.STRING(30),
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
