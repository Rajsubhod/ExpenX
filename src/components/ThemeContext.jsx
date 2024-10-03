import { useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';

const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {

    const systemTheme = useColorScheme()
    const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(()=>{
        setIsDarkMode(systemTheme === 'dark');
    },[systemTheme])

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext);