export const resolveSprite = (accomplishedCourses: number) => {
  if (accomplishedCourses < 1) {
    return "m2";
  } else if (accomplishedCourses < 4) {
    return "m1";
  } else {
    return "e1";
  }
};
