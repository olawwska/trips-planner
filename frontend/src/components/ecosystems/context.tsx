import { createContext, FC, useReducer, useContext } from 'react';
import { TripsPlannerStateType, TripsPlannerActionsType } from 'components/types';
import reducer from './reducer';

type Dispatch = (action: TripsPlannerActionsType) => void;

export const StateContext = createContext<TripsPlannerStateType | undefined>(undefined);

const DispatchContext = createContext<Dispatch | undefined>(undefined);

export const initialState: TripsPlannerStateType = {
  attraction: '',
  id: 0,
  photo: '',
  website: '',
  isOpen: false,
  lat: 0,
  lng: 0,
  isAuthenticated: false,
  authenticatedUserName: '',
};

export const MapInfoWindowProvider: FC<any> = ({ children }) => {
  //@ts-ignore
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
