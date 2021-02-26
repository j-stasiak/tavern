import { CourseTypes } from "./CourseTypes";

export const Courses = {
  noobCourse: {
    id: CourseTypes.NOOB_COURSE,
    title: "Noob",
    guide: `Element <ul> (Unordered list) jest używany do wskazania listy nieuporządkowanej, mianowicie zestawu punktów, które nie mają porządku liczbowego i ich kolejność w liście nie ma znaczenia. Poszczególne punkty w liście są definiowane poprzez element pozycja listy (<li>), który jest jedynym dopuszczalnym elementem w znaczniku <ul>.`,
    tasks: [
      {
        instruction: `Wyrenderuj listę`,
        result: `<ul><li>Jabłko</li><li>Banan</li><li>Kiwi</li></ul>`,
      },
    ],
  },
  adeptCourse: {
    id: CourseTypes.ADEPT_COURSE,
    title: "Adept",
    guide: `Element <ul> (Unordered list) jest używany do wskazania listy nieuporządkowanej, mianowicie zestawu punktów, które nie mają porządku liczbowego i ich kolejność w liście nie ma znaczenia. Poszczególne punkty w liście są definiowane poprzez element pozycja listy (<li>), który jest jedynym dopuszczalnym elementem w znaczniku <ul>.`,
    tasks: [
      {
        instruction: `Wyrenderuj dwuelementową listę`,
        result: `<ul><li>Jabłko</li><li>Banan</li><li>Kiwi</li></ul>`,
      },
    ],
  },
  proCourse: {
    id: CourseTypes.PRO_COURSE,
    title: "Pros",
    guide: `Element <ul> (Unordered list) jest używany do wskazania listy nieuporządkowanej, mianowicie zestawu punktów, które nie mają porządku liczbowego i ich kolejność w liście nie ma znaczenia. Poszczególne punkty w liście są definiowane poprzez element pozycja listy (<li>), który jest jedynym dopuszczalnym elementem w znaczniku <ul>.`,
    tasks: [
      {
        instruction: `Wyrenderuj dwuelementową listę`,
        result: `<ul><li>Jabłko</li><li>Banan</li><li>Kiwi</li></ul>`,
      },
    ],
  },
  ultraCourse: {
    id: CourseTypes.ULTRA_COURSE,
    title: "Ultra",
    guide: `Element <ul> (Unordered list) jest używany do wskazania listy nieuporządkowanej, mianowicie zestawu punktów, które nie mają porządku liczbowego i ich kolejność w liście nie ma znaczenia. Poszczególne punkty w liście są definiowane poprzez element pozycja listy (<li>), który jest jedynym dopuszczalnym elementem w znaczniku <ul>.`,
    tasks: [
      {
        instruction: `Wyrenderuj dwuelementową listę`,
        result: `<div>demon</div>`,
      },
    ],
  },
};
