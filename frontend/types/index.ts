// src/types/index.ts

export interface ChatMessage {
  id: number;
  text: string;
  senderName: string;
  timestamp: Date;
}

export interface UserPG {
  id: number | null;
  username: string | null;
  walletAddress: string | null;
}

export interface ParticipantUser {
  userId: number;
  userName: string;
  userRole: string;
  userTeamId: number;
}

export interface Team {
  id: number;
  name: string;
}

// Room as Postgres data
export interface RoomPG {
  id: number | null;
  roomId: string | null;
  roomName: string | null;
  creator: string | null;
  creationTime: Date | null;
}

// Room as Redis data
export interface RoomRE {
  roomId: string;

  teams: Team[];
  canvas: string;
  chat: ChatMessage[];
  users: ParticipantUser[];
}

// Room Hybrid (Postgres + Redis)
export interface RoomHY {
  id: number | null;

  roomId: string | null;
  roomName: string | null;
  creator: string | null;
  creationTime: Date | null;

  // Current user data
  userRole: string | null;
  userTeamId: number | null;

  teams: Team[];
  canvas: string | null;
  chat: ChatMessage[];
  users: ParticipantUser[];
}

export interface RoomState {
  roomDetails: RoomPG;
  teams: Team[];
  canvas: string | null;
  chat: ChatMessage[];
  users: ParticipantUser[];
}


export interface JoinRoomProps {
  roomId: string | null;
  roomName: string | null;
  userId: number | null;
  userName: string | null;
  userRole:string | null;
  userTeamId: number | null;
}
