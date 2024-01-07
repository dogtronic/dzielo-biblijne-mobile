import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {StoreState, AppDispatch} from '../store/configureStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
