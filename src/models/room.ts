import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Member } from "./member";
import { Chat } from "./chat";

export class Room extends Model {
  id: string;
  title: string;
  hostId: string;
}

Room.init(
  {
    id: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    hostId: {
      type: Sequelize.STRING(30),
    },
  },
  {
    sequelize,
    modelName: "room",
  }
);

Room.hasMany(Member, { foreignKey: "roomId", sourceKey: "id" });
Member.belongsTo(Room, { foreignKey: "roomId" });

Room.hasMany(Chat, { foreignKey: "roomId", sourceKey: "id" });
Chat.belongsTo(Room, { foreignKey: "roomId" });
