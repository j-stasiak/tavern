export interface PlayerInfo {
  id: string;
  avatar: string;
  nick: string;
  rank: string;
  reputation: number;
  notes: { title: string; description: string }[];
  finishedCoursesIds: number[];
}
