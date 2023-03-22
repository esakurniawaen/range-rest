import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
