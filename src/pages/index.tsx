import { type NextPage } from 'next';
import Head from 'next/head';
import Header from '~/components/Header/Header';
import Timer from '~/components/Timer/Timer';
import Footer from '~/components/Footer';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Timer</title>
                <meta
                    name="description"
                    content="A timer web app that generates a random timer within a specified range, and includes a break period after the timer ends before restarting the timer again."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex h-screen items-center justify-center">
                <div className="h-full w-full max-w-md md:h-[90%] md:rounded-xl md:shadow-md md:dark:bg-slate-800/10 md:dark:shadow-lg">
                    <Header />
                    <Timer />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Home;
