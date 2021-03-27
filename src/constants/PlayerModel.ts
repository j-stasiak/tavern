export interface PlayerModel {
  id: string;
  avatar: string;
  nick: string;
  rank: string;
  reputation: number;
  notes: NoteModel[];
  finishedCoursesIds: number[];
  roles: [];
}

export interface NoteModel {
  title: string;
  description: string;
}
