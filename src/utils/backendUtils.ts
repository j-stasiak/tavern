export const mapUser = (user: any) => ({
  nick: user.nick,
  finishedCoursesIds: user.finishedCoursesIds,
  avatar: user.avatar,
  notes: user.notes,
  rank: user.rank,
  reputation: user.reputation,
});
