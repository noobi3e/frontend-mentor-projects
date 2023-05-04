import React from 'react'
import { Info } from './Info'
import { useCusSelector } from '../store/cusHooks'
import { WordInfo } from '../store/wordSlice'

export const Meanings: React.FC = () => {
  const info: WordInfo = useCusSelector((st) => st.word.info as WordInfo)

  return (
    <>
      <main>
        {info.nouns && <Info {...info.nouns} />}
        {info.verbs && <Info {...info.verbs} />}
        <div className='line'></div>
        <div className='credits'>
          <p>source:</p>
          <a href={info.source} target='_blank'>
            {info.source}
          </a>
        </div>
      </main>
    </>
  )
}
