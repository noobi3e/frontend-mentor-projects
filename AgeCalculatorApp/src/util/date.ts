interface CusDate {
  year: number
  month: number
  day: number
}

export const curDate: CusDate = {
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
}

export const getNoOfDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate()
