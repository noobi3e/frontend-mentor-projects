import React, {
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import arrowIcon from '../assets/images/icon-arrow.svg'
import { curDate, getNoOfDaysInMonth } from '../util/date'
import { DateContext } from '../store'

enum ActionTypes {
  DAY_INP,
  MONTH_INP,
  YEAR_INP,
  FORM_IS_VALID,
  RESET,
  FORM_NOT_VALID,
}

interface Values {
  value: string
  isValid: boolean
  errTxt: string
  isTouched: boolean
}

interface State {
  formIsValid: boolean
  dayInp: Values
  monthInp: Values
  yearInp: Values
}

const initState: State = {
  formIsValid: false,
  dayInp: {
    value: '',
    isValid: false,
    errTxt: '',
    isTouched: false,
  },
  monthInp: {
    value: '',
    isValid: false,
    errTxt: '',
    isTouched: false,
  },
  yearInp: {
    value: '',
    isValid: false,
    errTxt: '',
    isTouched: false,
  },
}

interface Action {
  type: ActionTypes
  value: string
}

const reducer: (state: State, action: Action) => State = (state, action) => {
  const { type, value } = action

  if (type === ActionTypes.DAY_INP) {
    const totalDays = getNoOfDaysInMonth(
      +state.yearInp.value,
      +state.monthInp.value
    )
    // checking if input is a string or not
    if (isNaN(+value))
      return {
        ...state,
        dayInp: {
          isValid: false,
          errTxt: "Input can't be string",
          value: value,
          isTouched: true,
        },
      }

    // checking if date is in range of no of days of current Month
    if (+value > totalDays)
      return {
        ...state,
        dayInp: {
          value: value,
          isTouched: true,
          isValid: false,
          errTxt: `Date can't be more ${totalDays}`,
        },
      }

    // checking if entered date is greater than current date
    if (
      +state.yearInp.value === curDate.year &&
      +state.monthInp.value === curDate.month + 1 &&
      +state.dayInp.value > curDate.day
    )
      return {
        ...state,
        dayInp: {
          isValid: false,
          errTxt: 'Must be a Valid date',
          value: value,
          isTouched: true,
        },
      }

    if (value.length <= 0)
      // checking length of input
      return {
        ...state,
        dayInp: {
          isValid: false,
          errTxt: "Input field can't be empty",
          value: value,
          isTouched: true,
        },
      }

    // checking if day lies in range 1 - 31
    if (+value < 1 || +value > 31)
      return {
        ...state,
        dayInp: {
          isValid: false,
          errTxt: 'Must be a Valid date',
          value: value,
          isTouched: true,
        },
      }

    return {
      ...state,
      dayInp: {
        isValid: true,
        errTxt: "Input can't be string",
        value: value,
        isTouched: true,
      },
    }
  }

  if (type === ActionTypes.MONTH_INP) {
    // checking if input is a string or not
    if (isNaN(+value))
      return {
        ...state,
        monthInp: {
          isValid: false,
          errTxt: "Input can't be string",
          value: value,
          isTouched: true,
        },
      }

    // checking length of input
    if (value.length <= 0)
      return {
        ...state,
        monthInp: {
          isValid: false,
          errTxt: "Input field can't be empty",
          value: value,
          isTouched: true,
        },
      }

    // checking value lie in range of 1 - 12
    if (+value > 12 || +value < 1)
      return {
        ...state,
        monthInp: {
          isValid: false,
          errTxt: 'Must be a valid month ',
          value: value,
          isTouched: true,
        },
      }

    // checking if enteredYear and curYear are same then month must be smaller of equal to curmonth
    if (+state.yearInp.value >= curDate.year && +value > curDate.month + 1)
      return {
        ...state,
        monthInp: {
          isValid: false,
          errTxt: 'Must be a valid month ',
          value: value,
          isTouched: true,
        },
      }

    return {
      ...state,
      monthInp: {
        isValid: true,
        errTxt: "Input can't be string",
        value: value,
        isTouched: true,
      },
    }
  }

  if (type === ActionTypes.YEAR_INP) {
    // checking if input is a string or not

    if (isNaN(+value))
      return {
        ...state,
        yearInp: {
          isValid: false,
          errTxt: "Input can't be string",
          value: value,
          isTouched: true,
        },
      }

    // checking if year is greater than current year or not
    if (+value > curDate.year)
      return {
        ...state,
        yearInp: {
          isValid: false,
          errTxt: 'Must be in past',
          value: value,
          isTouched: true,
        },
      }

    // checking length of input
    if (value.length < 4)
      return {
        ...state,
        yearInp: {
          isValid: false,
          errTxt: 'Must be a valid year',
          value: value,
          isTouched: true,
        },
      }

    return {
      ...state,
      yearInp: {
        isValid: true,
        errTxt: "Input can't be string",
        value: value,
        isTouched: true,
      },
    }
  }

  if (type === ActionTypes.FORM_IS_VALID) return { ...state, formIsValid: true }
  if (type === ActionTypes.FORM_NOT_VALID)
    return { ...state, formIsValid: false }

  if (type === ActionTypes.RESET) return initState

  return initState
}

export const GetAgeForm: React.FC = () => {
  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const [form, disptachFn] = useReducer(reducer, initState)

  const ctx = useContext(DateContext)

  // updating form validing on every input change
  useEffect(() => {
    if (form.dayInp.isValid && form.monthInp.isValid && form.yearInp.isValid) {
      disptachFn({ type: ActionTypes.FORM_IS_VALID, value: '' })
    } else disptachFn({ type: ActionTypes.FORM_NOT_VALID, value: '' })
  }, [form.dayInp, form.monthInp, form.yearInp])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (form.formIsValid) {
      // checking current month if current year === entered year
      if (
        +form.yearInp.value >= curDate.year &&
        +form.monthInp.value > curDate.month + 1
      ) {
        monthRef.current?.focus()
        disptachFn({ type: ActionTypes.MONTH_INP, value: form.monthInp.value })
        return disptachFn({ type: ActionTypes.FORM_NOT_VALID, value: '' })
      }

      // checking date for current date
      if (
        +form.yearInp.value === curDate.year &&
        +form.monthInp.value === curDate.month + 1 &&
        +form.dayInp.value > curDate.day
      ) {
        dayRef.current?.focus()
        disptachFn({ type: ActionTypes.DAY_INP, value: form.dayInp.value })
        return disptachFn({ type: ActionTypes.FORM_NOT_VALID, value: '' })
      }

      // checking for correct Date
      if (
        +form.dayInp.value >
        getNoOfDaysInMonth(+form.yearInp.value, +form.monthInp.value)
      ) {
        dayRef.current?.focus()
        disptachFn({ type: ActionTypes.DAY_INP, value: form.dayInp.value })
        return disptachFn({ type: ActionTypes.FORM_NOT_VALID, value: '' })
      }

      ctx.getDate(
        +form.dayInp.value,
        +form.monthInp.value - 1,
        +form.yearInp.value
      )

      dayRef.current?.blur()
      monthRef.current?.blur()
      yearRef.current?.blur()
      disptachFn({ type: ActionTypes.RESET, value: '' })
    }
  }

  return (
    <>
      <form action='/' className='ageForm' onSubmit={submitHandler}>
        <div className='ageForm__group'>
          <label
            htmlFor='day'
            className={`ageForm__label ${
              !form.dayInp.isValid && form.dayInp.isTouched ? 'in-valid' : ''
            }`}>
            Day
          </label>
          <input
            type='text'
            ref={dayRef}
            className={`ageForm__input ${
              !form.dayInp.isValid && form.dayInp.isTouched ? 'in-valid' : ''
            }`}
            id='day'
            maxLength={2}
            placeholder='DD'
            onChange={(e) =>
              disptachFn({ type: ActionTypes.DAY_INP, value: e.target.value })
            }
            onBlur={(e) =>
              disptachFn({ type: ActionTypes.DAY_INP, value: e.target.value })
            }
            required
            value={form.dayInp.value}
          />
          {!form.dayInp.isValid && form.dayInp.isTouched && (
            <p className='errtxt'>{form.dayInp.errTxt}</p>
          )}
        </div>

        <div className='ageForm__group'>
          <label
            htmlFor='month'
            className={`ageForm__label ${
              !form.monthInp.isValid && form.monthInp.isTouched
                ? 'in-valid'
                : ''
            }`}>
            Month
          </label>
          <input
            ref={monthRef}
            type='text'
            className={`ageForm__input ${
              !form.monthInp.isValid && form.monthInp.isTouched
                ? 'in-valid'
                : ''
            }`}
            id='month'
            maxLength={2}
            placeholder='MM'
            required
            value={form.monthInp.value}
            onChange={(e) =>
              disptachFn({
                type: ActionTypes.MONTH_INP,
                value: e.target.value,
              })
            }
            onBlur={(e) =>
              disptachFn({
                type: ActionTypes.MONTH_INP,
                value: e.target.value,
              })
            }
          />
          {!form.monthInp.isValid && form.monthInp.isTouched && (
            <p className='errtxt'>{form.monthInp.errTxt}</p>
          )}
        </div>

        <div className='ageForm__group'>
          <label
            htmlFor='year'
            className={`ageForm__label ${
              !form.yearInp.isValid && form.yearInp.isTouched ? 'in-valid' : ''
            }`}>
            Year
          </label>
          <input
            type='text'
            className={`ageForm__input ${
              !form.yearInp.isValid && form.yearInp.isTouched ? 'in-valid' : ''
            }`}
            id='year'
            ref={yearRef}
            maxLength={4}
            placeholder='YYYY'
            required
            value={form.yearInp.value}
            onChange={(e) =>
              disptachFn({ type: ActionTypes.YEAR_INP, value: e.target.value })
            }
            onBlur={(e) =>
              disptachFn({ type: ActionTypes.YEAR_INP, value: e.target.value })
            }
          />
          {!form.yearInp.isValid && form.yearInp.isTouched && (
            <p className='errtxt'>{form.yearInp.errTxt}</p>
          )}
        </div>

        <button
          type='submit'
          className={`ageForm__btn ${form.formIsValid ? 'valid' : ''}`}
          disabled={!form.formIsValid}
          value={'&nbsp;'}>
          <img src={arrowIcon} alt='' />
        </button>
      </form>
    </>
  )
}
