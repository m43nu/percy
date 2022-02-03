import styles from '../styles/Home.module.css'
import {NextUIProvider} from '@nextui-org/react';
import Head from "next/head";
import React from "react";

function MyApp({Component, pageProps}) {
    return (
        <NextUIProvider>
            <div className={styles.container}>
                <Head>
                    <title>percy - Pecentage Calculator</title>
                    <meta name="description" content="Percentage Calculation for your Training"/>
                    <meta name='viewport'
                          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
                    <meta name='application-name' content='percy'/>
                    <meta name='apple-mobile-web-app-capable' content='yes'/>
                    <meta name='apple-mobile-web-app-status-bar-style' content='default'/>
                    <meta name='apple-mobile-web-app-title' content='percy'/>
                    <meta name='description' content='Percentage Calculation for your Training'/>
                    <meta name='format-detection' content='telephone=no'/>
                    <meta name='mobile-web-app-capable' content='yes'/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
                    <link rel="manifest" href="/icons/site.webmanifest"/>
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#c17cef"/>
                    <link rel="shortcut icon" href="/icons/favicon.ico"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-config" content="/icons/browserconfig.xml"/>
                    <meta name="theme-color" content="#ffffff"/>
                </Head>
                <Component {...pageProps} />
                <footer className={styles.footer}>
                    <a
                        href="https://sahli-interactive.ch/visitenkarte/emanuel-imhof"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Made by{' '}
                        Emanuel Imhof
                    </a>
                </footer>
            </div>
        </NextUIProvider>
    )
}

export default MyApp
