export interface PlayerInfo {
  id: string;
  avatar: string;
  nick: string;
  rank: string;
  reputation: number;
  notes: NoteModel[];
  finishedCoursesIds: number[];
}

export interface NoteModel {
  title: string;
  description: string;
}
