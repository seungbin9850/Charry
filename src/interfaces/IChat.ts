export interface ChatRequestDTO {
  roomId: string;
  userId: string;
  content: string;
}

export interface ShowLogsRequestDTO {
  roomId: string;
  userId: string;
  page: number;
}

export interface LeaveRoomRequestDTO {
  roomId: string;
  userId: string;
}
