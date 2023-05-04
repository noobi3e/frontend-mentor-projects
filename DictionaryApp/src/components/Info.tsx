import React from 'react'
import { info } from '../store/wordSlice'

export const Info: React.FC<info> = (props) => {
  const meanings = props.defination.map((el, i) => <li key={i}>{el}</li>)

  return (
    <section className='noun'>
      <p className='noun'>{props.title}</p>
      <ul className='list'>
        <p className='head'>Meaning</p>
        {meanings}
        {props.synonyms && (
          <p className='synonm'>
            Synonyms <span>{props.synonyms}</span>
          </p>
        )}
      </ul>
    </section>
  )
}
