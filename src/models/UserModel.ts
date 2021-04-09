export interface NoteModel {
  title: string;
  description: string;
}

export interface UserModel {
  nick: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  email: string;
  finishedCoursesIds: number[];
  notes: NoteModel[];
  password: string;
  rank: string;
  reputation: number;
  roles: string[];
  verified: boolean;
  _id: string;
}