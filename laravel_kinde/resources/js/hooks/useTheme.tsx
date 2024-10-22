import { useEffect, useState } from 'react';

function useTheme() {
    type tThemes = 'light' | 'dark' | 'system';
    const key = 'appTheme';
    const themeOptions = [
        {
            value: 'light',
            label: 'Claro',
        },
        {
            value: 'dark',
            label: 'Escuro',
        },
        {
            value: 'system',
            label: 'Automático',
        }
    ]

    const getInitialMode = () => {
        const savedTheme = localStorage.getItem(key);
        return savedTheme ? JSON.parse(savedTheme) : 'system';
    };

    const [theme, setTheme] = useState<tThemes>(getInitialMode() as tThemes);
    useEffect(() => {
        const className = 'dark';
        const htmlElement = document.documentElement;

        if (theme === 'dark') {
            htmlElement.classList.add(className);
        } else if (theme === 'light') {
            htmlElement.classList.remove(className);
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                htmlElement.classList.add(className);
            } else {
                htmlElement.classList.remove(className);
            }
        }

        localStorage.setItem(key, JSON.stringify(theme));
    }, [theme]);

    return { theme, setTheme, themeOptions };
}

export default useTheme;
