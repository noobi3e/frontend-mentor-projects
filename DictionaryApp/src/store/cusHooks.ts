import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

type DispatchFunc = () => AppDispatch
export const useCusDispatch: DispatchFunc = useDispatch
export const useCusSelector: TypedUseSelectorHook<RootState> = useSelector
