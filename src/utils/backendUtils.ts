export const mapUser = (response: any) => ({
  nick: response.data.nick,
  finishedCoursesIds: response.data.finishedCoursesIds,
  avatar: response.data.avatar,
  notes: response.data.notes,
  rank: response.data.rank,
  reputation: response.data.reputation,
});
