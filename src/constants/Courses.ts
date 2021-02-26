import { CourseTypes } from "./CourseTypes";

export const Courses = {
  noobCourse: {
    id: CourseTypes.NOOB_COURSE,
    title: "Nowicjusz",
    guide: `HTML Content Division element (<div>) jest rodzajem pojemnika na treść. Nie ma on żadnego wpływu na treść ani układ graficzny, dopóki nie zostanie ostylizowany z użyciem CSS.  Element <div> jako "czysty" pojemnik niczego nie reprezentuje.`,
    tasks: [
      {
        instruction: `Stwórz diva z napisem Nowicjusz`,
        result: `<div>Nowicjusz</div>`,
      },
    ],
  },
  adeptCourse: {
    id: CourseTypes.ADEPT_COURSE,
    title: "Adept",
    guide: `Element języka HTML <h1>–<h6> reprezentuje sześć poziomów zawartości nagłówka. Zawartość nagłówka <h1> jest prezentowana największą czcionką, a nagłówków <h6> najmniejszą.`,
    tasks: [
      {
        instruction: `Wyrenderuj poniższy nagłówek`,
        result: `<h1>Super kurs</h1>`,
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
        instruction: `Wyrenderuj pogrubione 'FINAL BOSS' w największym nagłówku oraz wypisz listę nazw poprzednich kursów`,
        result: `<div><h1><b>FINAL BOSS</b></h1><ul><li>Nowicjusz</li><li>Adept</li><li>Pro</li></ul></div>`,
      },
    ],
  },
};
