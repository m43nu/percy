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

export default function Home() {
    let [weight, setWeight] = useWeightState(0, 'currentWeight')
    let [customPercentage, setCustomPercentage] = useWeightState(45, 'customPercentage')

    const percentages = Array.from({length: 11}, (_, i) => 100 - (i * 5))

    const updateWeight = event => {
        event.preventDefault()

        setWeight(event.target.weight.value)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>percy - Pecentage Calculator</title>
                <meta name="description" content="Percentage Calculation for your training"/>
                <link rel="icon" href="/favicon.ico"/>
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

                <h2>Percentages</h2>

                <div className={styles.grid}>
                    {percentages.map((percentage) => <CalculatedWeight percentage={percentage} weight={weight}
                                                                       key={percentage}/>)}

                    <div className={styles.card}>
                        <Input id="customPercentage" placeholder="Custom" type="number"
                               min={1} max={100} step={1} name="customPercentage" value={customPercentage}
                               onChange={event => setCustomPercentage(event.target.value)} />
                        <h4>{customPercentage ? parseInt(weight / 100 * customPercentage) : '-'}</h4>
                    </div>
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
