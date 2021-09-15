import moment from "moment";

export const parseDate = (date: any, format: string = 'dddd, MMMM Do YYYY, h:mm A'): string => {
  return moment(new Date(date as Date)).format('dddd, MMMM Do YYYY, h:mm A');
}