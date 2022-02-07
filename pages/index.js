import styles from '../styles/Home.module.css'
import {Text, Input, Button, Grid} from "@nextui-org/react";
import CalculatedWeight from "../components/CalculatedWeight";
import React from "react";
import NextLink from 'next/link';
import useLocalStorageState from "../lib/local-storage-state";
import roundHalf from "../lib/round-half";

export default function Home() {
    let [weight, setWeight] = useLocalStorageState(0, 'currentWeight')
    let [customPercentage, setCustomPercentage] = useLocalStorageState(100, 'customPercentage')

    const percentages = Array.from({length: 11}, (_, i) => 95 - (i * 5))

    const updateWeight = event => {
        event.preventDefault()

        setWeight(event.target.weight.value)
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                <Text span size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                    percy
                </Text>
            </h1>
            <Text css={{marginBottom: '1rem'}}>Percentage Calculator - <a href="https://github.com/m43nu/percy" target="_blank" rel="noreferrer">Learn more</a></Text>
            <Grid.Container gap={1} justify="center" css={{paddingTop: 0}}>
                <Grid>
                    <NextLink href="/">
                        <Button color="gradient" auto>Percentages</Button>
                    </NextLink>
                </Grid>
                <Grid>
                    <NextLink href="/steps">
                        <Button bordered color="gradient" auto>Steps</Button>
                    </NextLink>
                </Grid>
            </Grid.Container>

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
                        inputmode="decimal"
                    />
                </form>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <Input id="customPercentage" bordered placeholder="Custom" type="number" width="6rem" inputmode="decimal" labelRight="%"
                           min={1} max={100} step={1} name="customPercentage" value={customPercentage}
                           onChange={event => setCustomPercentage(event.target.value)}/>
                    <h3>{customPercentage ? roundHalf(weight / 100 * customPercentage) : '-'}</h3>
                </div>
                {percentages.map((percentage, index) => <CalculatedWeight percentage={percentage} weight={weight}
                                                                   key={`calculated-weight-${index}`}/>)}
            </div>
        </main>
    )
}
