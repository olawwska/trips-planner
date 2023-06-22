import { createContext, FC, useReducer, useContext } from 'react';
import { IInfoWindowStateType, InfoWindowActionsType } from 'components/types';
import reducer from './reducer';

type Dispatch = (action: InfoWindowActionsType) => void;

export const StateContext = createContext<IInfoWindowStateType | undefined>(undefined);

const DispatchContext = createContext<Dispatch | undefined>(undefined);

export const initialState: IInfoWindowStateType = {
  attraction: '',
  attractionId: 0,
  photo: '',
  website: '',
  isOpen: false,
  lat: 0,
  lng: 0,
};

export const MapInfoWindowProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useMapInfoWindowContext = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error('useMapInfoWindowContext must be used within an MapInfoWindowProvider context');
  }

  return { state, dispatch };
};

export default useMapInfoWindowContext;
