import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Switch from '@mui/joy/Switch'
import { IconButton } from '@mui/material'
import { DictionaryIcon } from '../icons/DictionaryIcon'
import { useCusDispatch, useCusSelector } from '../store/cusHooks'
import { themeAction } from '../store/themeSlice'
import { fetchWordInfo, wordAction } from '../store/wordSlice'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

export const SearchBar: React.FC = () => {
  const { darkmode, fontTheme } = useCusSelector((st) => st.theme)
  const dispatch = useCusDispatch()
  const [query, setQuery] = useState('')
  const [err, setErr] = useState(false)

  const fontHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(themeAction.changeFontTheme(e.target.value.toLowerCase()))
  }

  const themeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(themeAction.changeColorTheme(e.target.checked))

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim().length > 0) {
      dispatch(wordAction.getWord(query))
      dispatch(fetchWordInfo(query.trim()))
      setErr(false)
      setQuery('')
    } else {
      setErr(true)
    }
  }

  return (
    <>
      <nav className='dic__nav'>
        <div className='dic__top'>
          <DictionaryIcon className='dic__logo' />

          <div className='dic__toggle'>
            <select onChange={fontHandler} value={fontTheme}>
              <option className='options' value='serif'>
                Serif
              </option>
              <option className='options' value='sans-serif'>
                Sans-Serif
              </option>
            </select>
            <div className='line'></div>
            <Switch
              color='info'
              variant='solid'
              checked={darkmode}
              onChange={themeHandler}
            />
            {darkmode && <DarkModeIcon fontSize='large' className='modeIcon' />}
            {!darkmode && (
              <LightModeIcon fontSize='large' className='modeIcon' />
            )}
          </div>
        </div>
        <form className='dic__search' onSubmit={searchHandler}>
          <input
            type='search'
            id='search'
            placeholder='search...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setErr(false)
            }}
          />
          <IconButton type='submit'>
            <SearchIcon fontSize='large' />
          </IconButton>
          {err && (
            <p className='errtxt'>😥We can't able to search an empty string</p>
          )}
        </form>
      </nav>
    </>
  )
}
