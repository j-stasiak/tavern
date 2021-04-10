import {TableUser} from "../models/UserModel";
import moment from "moment";

export const sortAlphabeticalDesc = (data: TableUser[], columnName: string) => {
  return data.sort((a: TableUser, b: TableUser) =>
    b[columnName].localeCompare(a[columnName])
  );
};

export const sortAlphabeticalAsc = (data: TableUser[], columnName: string) => {
  return data.sort((a: TableUser, b: TableUser) =>
    a[columnName].localeCompare(b[columnName])
  );
};

export const sortDateAsc = (data: TableUser[], columnName: string) =>
  data.sort(
    (a: TableUser, b: TableUser) =>
      moment(a[columnName]).toDate().getTime() -
      moment(b[columnName]).toDate().getTime()
  );

export const sortDateDesc = (data: TableUser[], columnName: string) =>
  data.sort(
    (a: TableUser, b: TableUser) =>
      moment(b[columnName]).toDate().getTime() -
      moment(a[columnName]).toDate().getTime()
  );

export const sortNumbersAsc = (data: TableUser[], columnName: string) =>
  data.sort((a: TableUser, b: TableUser) => a[columnName] - b[columnName]);

export const sortNumbersDesc = (data: TableUser[], columnName: string) =>
  data.sort((a: TableUser, b: TableUser) => b[columnName] - a[columnName]);

export const sortArrayLengthAsc = (data: TableUser[], columnName: string) =>
  data.sort(
    (a: TableUser, b: TableUser) => a[columnName].length - b[columnName].length
  );

export const sortArrayLengthDesc = (data: TableUser[], columnName: string) =>
  data.sort(
    (a: TableUser, b: TableUser) => b[columnName].length - a[columnName].length
  );
