// UserProvider.ts
import { createContext, useState, ReactNode, useCallback } from 'react';

interface User {
    id: string;
    name: string;
    type: string;
}

interface UserContextType {
    user: User;
    setUser: (newUser: User) => void;
}

// Default context value (optional)
const defaultUser = { id: '', name: '', type: '' };

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User>(defaultUser);

    const setUser = useCallback((newUser: User) => {
        setUserState(newUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
