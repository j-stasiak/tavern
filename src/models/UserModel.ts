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

interface IObjectKeys {
  [key: string]: any;
}

export interface TableUser extends IObjectKeys {
  nick: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  finishedCoursesIds: string;
  numberOfNotes: number;
  rank: string;
  roles: string;
  verified: string;
  _id: string;
  edit: JSX.Element;
  delete: JSX.Element;
}
