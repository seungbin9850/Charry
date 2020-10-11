import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Room } from "./room";
import { Chat } from "./chat";
import { Member } from "./member";

export class User extends Model {
  id: string;
  userId: string;
  password: string;
  nickname: string;
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

User.hasMany(Room, { foreignKey: "hostId", sourceKey: "id" });
Room.belongsTo(User, { foreignKey: "hostId" });

User.hasMany(Chat, { foreignKey: "userId", sourceKey: "id" });
Chat.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Member, { foreignKey: "userId", sourceKey: "id" });
Member.belongsTo(User, { foreignKey: "userId" });
