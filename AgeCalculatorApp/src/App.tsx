import React from 'react'
import { GetAgeForm } from './components/GetAgeForm'
import { ShowAge } from './components/ShowAge'
import { DateProvider } from './store'

export const App: React.FC = () => {
  return (
    <>
      <DateProvider>
        <main>
          <section className='ageCalculator'>
            <GetAgeForm />
            <ShowAge />
          </section>
        </main>
      </DateProvider>
    </>
  )
}
