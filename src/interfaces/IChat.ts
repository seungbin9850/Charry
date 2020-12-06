export interface ChatRequestDTO {
  roomId: string;
  id: string;
  content: string;
}

export interface ShowLogsRequestDTO {
  roomId: string;
  userId: string;
  page: number;
}
