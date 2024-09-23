// useUser.ts
import { useContext } from 'react';
import { UserContext  } from './userProvider';// Adjust the path based on your structure

export const useUser = () => useContext(UserContext );
