export interface ChatRequestDTO {
  roomId: string;
  id: string;
  content: string;
}

export interface JoinRequestDTO {
  roomId: string;
  email: string;
  nickname: string;
}

export interface ShowLogsRequestDTO {
  roomId: string;
  userId: string;
  page: number;
}
