export interface chat {
  roomId: string;
  email: string;
  content: string;
}

export interface JoinRequestDTO {
  roomId: string;
  email: string;
  nickname: string;
}
