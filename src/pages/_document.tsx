import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
            </Head>
            <body className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
