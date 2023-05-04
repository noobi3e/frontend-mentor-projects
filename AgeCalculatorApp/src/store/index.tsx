import React, { PropsWithChildren, useState } from 'react'
import { curDate, getNoOfDaysInMonth } from '../util/date'

interface CusDate {
  year: number
  month: number
  day: number
}

interface Context {
  date: CusDate
  getDate(day: number, month: number, year: number): void
}

export const DateContext = React.createContext<Context>({
  date: { year: 0, month: 0, day: 0 },
  getDate: () => {},
})

export const DateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [date, setDate] = useState<CusDate>({
    day: 0,
    month: 0,
    year: 0,
  })

  const getDate = (day: number, month: number, year: number) => {
    day = curDate.day - day
    month = curDate.month - month
    year = curDate.year - year

    const daysInCurMonth = getNoOfDaysInMonth(curDate.year, curDate.month + 1)

    if (day < 0) {
      month -= 1
      day = daysInCurMonth - -day
    }

    if (month < 0) {
      month = 12 - -month
      year -= 1
    }

    setDate({
      day,
      month,
      year,
    })
  }

  return (
    <DateContext.Provider value={{ date, getDate }}>
      {children}
    </DateContext.Provider>
  )
}
