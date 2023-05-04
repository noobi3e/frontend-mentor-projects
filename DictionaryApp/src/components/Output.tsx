import React from 'react'
import { IconButton, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useCusSelector } from '../store/cusHooks'
import { WordInfo } from '../store/wordSlice'

export const Output: React.FC = () => {
  const word = useCusSelector((st) => st.word.word)
  const hasErr = useCusSelector((st) => st.word.hasErr)
  const info: WordInfo = useCusSelector((st) => st.word.info as WordInfo)

  const speakHandler = () => {
    const wordSpeaker = new SpeechSynthesisUtterance(word)
    const voices = speechSynthesis.getVoices()
    const randomVoice = Math.trunc(Math.random() * 4) + 1

    wordSpeaker.pitch = 3
    wordSpeaker.rate = 0.8
    wordSpeaker.volume = 1
    wordSpeaker.voice = voices[randomVoice]
    speechSynthesis.speak(wordSpeaker)
  }
  return (
    <>
      <div className='dic__output'>
        <Typography variant='h1' component={'h1'}>
          {word}
          <Typography variant='h5' component={'span'} className='latin'>
            {!hasErr && info.phonetic}
          </Typography>
        </Typography>

        <IconButton onClick={speakHandler}>
          <PlayArrowIcon />
        </IconButton>
      </div>
    </>
  )
}
