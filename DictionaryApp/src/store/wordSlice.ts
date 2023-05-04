import { AppDispatch } from './index'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface info {
  title: string
  synonyms: string | null
  defination: string[]
}

export interface WordInfo {
  phonetic: string
  source: string
  nouns: info
  verbs: info
}

interface Word {
  word: string
  info: WordInfo | {}
  hasErr: boolean
  isLoading: boolean
  errTxt: string
}

const init: Word = {
  word: '',
  info: {},
  hasErr: false,
  isLoading: false,
  errTxt: '',
}

export const wordSlice = createSlice({
  name: 'word',
  initialState: init,
  reducers: {
    getWord(state, action: PayloadAction<string>) {
      state.word = action.payload
    },
    setErr(state, action: PayloadAction<{ errTxt: string; hasErr: boolean }>) {
      state.hasErr = action.payload.hasErr
      state.errTxt = action.payload.errTxt
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setInfo(state, action: PayloadAction<WordInfo>) {
      state.info = action.payload
    },
  },
})

export const wordAction = wordSlice.actions

export const fetchWordInfo =
  (query: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(wordAction.setErr({ hasErr: false, errTxt: '' }))
      dispatch(wordAction.setLoading(true))
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      )

      if (!res.ok) throw new Error("Can't able to find this string")

      const [data] = await res.json() // receiving data is an object inside of an array

      const mns = data.meanings.map((mn: any) => {
        const def = mn.definitions.map((el: any) => el.definition)

        return {
          title: mn.partOfSpeech,
          defination: [...def],
          synonyms: mn.synonyms[0],
        }
      })

      console.log(mns)

      const info: WordInfo = {
        phonetic: data.phonetic,
        source: data.sourceUrls[0],
        nouns: mns[0],
        verbs: mns[1],
      }

      dispatch(wordAction.setLoading(false))
      dispatch(wordAction.setInfo(info))

      console.log(info)
    } catch (err) {
      dispatch(wordAction.setLoading(false))
      dispatch(wordAction.setErr({ errTxt: '😔No Data Found!', hasErr: true }))
      console.warn(err)
    }
  }
