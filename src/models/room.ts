import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Room extends Model {
  id: string;
  title: string;
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
