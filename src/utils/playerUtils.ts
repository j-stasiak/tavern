import { Ranks } from "../constants/Ranks";

export const resolveSprite = (accomplishedCourses: number) => {
  if (accomplishedCourses < 1) {
    return "m2";
  } else if (accomplishedCourses < 4) {
    return "m1";
  } else {
    return "e1";
  }
};

export const resolveRank = (rank: string) => {
  if (rank === Ranks.NOVICE) {
    return Ranks.AMATEUR;
  } else if (rank === Ranks.AMATEUR) {
    return Ranks.ADEPT;
  } else if (rank === Ranks.ADEPT) {
    return Ranks.PRO;
  } else if (rank === Ranks.PRO) {
    return Ranks.BOSS;
  }
  return rank;
};
