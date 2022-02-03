import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Text, Input} from "@nextui-org/react";
import CalculatedWeight from "../components/CalculatedWeight";
import React, {useState, useEffect} from "react";

function useWeightState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const weightValue = window.localStorage.getItem(key);

        if (weightValue !== null) {
            setValue(JSON.parse(weightValue));
        }
    }, [key]);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

function roundHalf(num) {
    return Math.round(num*2)/2;
}

export default function Home() {
    let [weight, setWeight] = useWeightState(0, 'currentWeight')
    let [customPercentage, setCustomPercentage] = useWeightState(100, 'customPercentage')

    const percentages = Array.from({length: 11}, (_, i) => 95 - (i * 5))

    const updateWeight = event => {
        event.preventDefault()

        setWeight(event.target.weight.value)
    }

    return (
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

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Text span size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                        percy
                    </Text>
                </h1>

                <Text>Percentage Calculator</Text>

                <div className={styles.description}>
                    <form onSubmit={updateWeight}>
                        <Input
                            id="weight"
                            bordered
                            placeholder="Your 1-rep max"
                            labelRight="kg/lbs"
                            color="default"
                            size="xl"
                            type="number"
                            min="1"
                            step={0.5}
                            width="15rem"
                            name="weight"
                            value={weight}
                            onChange={event => setWeight(event.target.value)}
                        />
                    </form>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <Input id="customPercentage" placeholder="Custom" type="number" width="4rem"
                               min={1} max={100} step={1} name="customPercentage" value={customPercentage}
                               onChange={event => setCustomPercentage(event.target.value)}/>
                        <h3>{customPercentage ? roundHalf(weight / 100 * customPercentage) : '-'}</h3>
                    </div>
                    {percentages.map((percentage) => <CalculatedWeight percentage={percentage} weight={weight}
                                                                       key={percentage}/>)}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://sahli-interactive.ch/visitenkarte/emanuel-imhof"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mady by{' '}
                    Emanuel Imhof
                </a>
            </footer>
        </div>
    )
}
