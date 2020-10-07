import { Room } from "../models/room";
import { Member } from "../models/member";
import { mkId } from "./uuid";
import { Op } from "sequelize";
import { HttpError } from "../exception/exception";

export const createOne = async (title: string, hostId: string) => {
  const id: string = await mkId();
  await Room.create({ id, title, hostId });
};

export const searchOne = async (title: string): Promise<Array<Room>> => {
  const rooms: Array<Room> = await Room.findAll({
    where: { title: { [Op.like]: `%${title}%` } },
  });

  return rooms;
};

export const joinMember = async (roomId: string, userId: string) => {
  try {
    await Member.create({ roomId, userId });
  } catch (e) {
    throw new HttpError(409, "user already in this room");
  }
};

export const getAll = async (userId: string): Promise<Array<Room>> => {
  const roomIds = await getRoomId(userId);
  const rooms = await Room.findAll({ where: { id: { [Op.in]: roomIds } } });
  return rooms;
};

const getRoomId = async (userId: string): Promise<Array<string>> => {
  const roomIdArr: Array<string> = [];
  const arr = await Member.findAll({ where: { userId } });
  arr.forEach((e) => roomIdArr.push(e.roomId));
  return roomIdArr;
};

export const outUser = async (userId: string, roomId: string) => {
  await Member.destroy({ where: { userId, roomId } });
};

export const destroyOne = async (userId: string, roomId: string) => {
  try {
    await Room.destroy({ where: { id: roomId, hostId: userId } });
  } catch (e) {
    throw new HttpError(403, "this user is not a host");
  }
};
