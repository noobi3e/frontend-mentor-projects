import React, { useContext, useEffect, useState } from 'react'
import { DateContext } from '../store'
export const ShowAge: React.FC = () => {
  const ctx = useContext(DateContext)
  const [day, setDay] = useState(0)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const time = 500

  useEffect(() => {
    setTimeout(() => {
      if (day >= ctx.date.day) return
      setDay((lst) => lst + 1)
    }, time / ctx.date.day)
  }, [ctx.date.day, day])

  useEffect(() => {
    setTimeout(() => {
      if (month >= ctx.date.month) return
      setMonth((lst) => lst + 1)
    }, time / ctx.date.month)
  }, [ctx.date.month, month])

  useEffect(() => {
    setTimeout(() => {
      if (year >= ctx.date.year) return
      setYear((lst) => lst + 1)
    }, time / ctx.date.year)
  }, [ctx.date.year, year])

  console.log(ctx)

  return (
    <>
      <div className='showAge'>
        <h1 className='showAge__day'>
          <span className='data'>{year === 0 ? '--' : year}</span> years
        </h1>
        <h1 className='showAge__month'>
          <span className='data'>{month === 0 ? '--' : month}</span> months
        </h1>
        <h1 className='showAge__year'>
          <span className='data'>{day === 0 ? '--' : day}</span> days
        </h1>
      </div>
    </>
  )
}
