import { FunctionComponent, ReactNode, createContext, useContext, useState } from "react";

interface ThemeContextProps {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

const defaultState = {
	isDarkMode: false,
	toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultState);

interface ThemeProviderProps {
	children: ReactNode;
}

export const useTheme = () => useContext(ThemeContext);

// Create a provider component
export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
	);
};
