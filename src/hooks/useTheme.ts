import { useTheme as useNextTheme } from 'next-themes';

export type ResolvedTheme = 'light' | 'dark';
export type Theme = 'system' | ResolvedTheme;

export default function useTheme() {
    const { theme, themes, resolvedTheme, setTheme } = useNextTheme();

    return {
        resolvedTheme: resolvedTheme as ResolvedTheme | undefined,
        theme: theme as Theme | undefined,
        themes: themes as Theme[],
        setTheme: (nextTheme: Theme) => setTheme(nextTheme),
    };
}
