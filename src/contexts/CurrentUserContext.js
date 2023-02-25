import { createContext } from 'react';

export const CurrentUserContext = createContext();

export const defaultUser = {
  name: 'user',
  email: 'user@test.ru'
}
