import React from 'react'
import { Output } from './Output'
import { SearchBar } from './SearchBar'
import { useCusSelector } from '../store/cusHooks'

export const Header: React.FC = () => {
  const { isLoading, word } = useCusSelector((st) => st.word)
  return (
    <>
      <header className='dic__header'>
        <SearchBar />
        {!isLoading && word.trim().length > 0 && <Output />}
      </header>
    </>
  )
}
