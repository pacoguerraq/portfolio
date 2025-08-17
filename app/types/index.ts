// app/types/index.ts

export interface DarkModeProps {
    isDarkMode: boolean;
}

export interface NavbarProps extends DarkModeProps {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}