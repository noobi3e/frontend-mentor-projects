import React, { useEffect } from 'react'
import { useCusDispatch, useCusSelector } from './store/cusHooks'
import { themeAction } from './store/themeSlice'
import { Header } from './components/Header'
import {
  DARK_BG,
  DARK_TXT,
  FONT_SANS_SERIF,
  FONT_SERIF,
  INP_DARK,
  INP_LIGHT,
  LIGHT_BG,
  LIGHT_TXT,
  LINE_DARK,
  LINE_LIGHT,
} from './utils/util'
import { Meanings } from './components/Meanings'
import { LoadingSkeleton } from './components/LoadingSkeleton'

export const App: React.FC = () => {
  const { darkmode, fontTheme, isInitial } = useCusSelector((st) => st.theme)
  const dispatch = useCusDispatch()
  const { isLoading, hasErr, errTxt, word } = useCusSelector((st) => st.word)

  // toggling theme
  useEffect(() => {
    if (darkmode && !isInitial) {
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--background', DARK_BG)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--text', DARK_TXT)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--crl-inp', INP_DARK)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--crl-gry', LINE_DARK)
    } else {
      dispatch(themeAction.changeInitial())
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--background', LIGHT_BG)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--text', LIGHT_TXT)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--crl-inp', INP_LIGHT)
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--crl-gry', LINE_LIGHT)
    }
  }, [darkmode])

  // Toggling font style
  useEffect(() => {
    if (fontTheme === 'serif') {
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--font', FONT_SERIF)
    } else {
      document
        .querySelector<HTMLElement>(':root')
        ?.style.setProperty('--font', FONT_SANS_SERIF)
    }
  }, [fontTheme])

  return (
    <>
      <div className='dictionary-container'>
        <Header />
        {isLoading && !hasErr && <LoadingSkeleton />}
        {!hasErr && !isLoading && word.trim().length > 0 && <Meanings />}
        {hasErr && <p className='noData'>{errTxt}</p>}
      </div>
    </>
  )
}
