import styles from '../styles/Home.module.css'
import {Text, Input, Button, Grid} from "@nextui-org/react";
import CalculatedWeight from "../components/CalculatedWeight";
import NextLink from 'next/link';
import useLocalStorageState from "../lib/local-storage-state";
import React from "react";

export default function Steps() {
    let [weight, setWeight] = useLocalStorageState(0, 'currentWeight')
    let [steps, setSteps] = useLocalStorageState(6, 'currentSteps')
    let [start, setStart] = useLocalStorageState(40, 'startAt')
    let [end, setEnd] = useLocalStorageState(80, 'endAt')

    const updateSteps = event => {
        event.preventDefault()

        setWeight(event.target.weight)
        setSteps(event.target.steps)
        setStart(event.target.startPercentage)
        setEnd(event.target.endPercentage)
    }

    const calculateSteps = () => {
        let mySteps = []
        const percentagePerStep = parseFloat((end - start) / (steps - 1));
        let currentPercentage = parseFloat(start);

        for (let i = 1; i <= steps; i++) {
            mySteps.push(parseInt(currentPercentage))

            currentPercentage += percentagePerStep;
        }

        console.log(mySteps)
        return mySteps
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                <Text span size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                    percy
                </Text>
            </h1>
            <Text css={{marginBottom: '1rem'}}>Percentage Calculator</Text>
            <Grid.Container gap={1} justify="center" css={{paddingTop: 0}}>
                <Grid>
                    <NextLink href="/">
                        <Button bordered color="gradient" auto>Percentages</Button>
                    </NextLink>
                </Grid>
                <Grid>
                    <NextLink href="/steps">
                        <Button color="gradient" auto>Steps</Button>
                    </NextLink>
                </Grid>
            </Grid.Container>

            <div className={styles.description}>
                <form onSubmit={updateSteps}>
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
                    <Grid.Container gap={2} justify="center" css={{paddingBottom: 0}}>
                        <Grid xs={4}>
                            <Input
                                id="steps"
                                bordered
                                label="Steps"
                                color="default"
                                type="number"
                                min="1"
                                step={1}
                                name="steps"
                                value={steps}
                                onChange={event => setSteps(event.target.value)}
                                inputmode="decimal"
                            />
                        </Grid>
                        <Grid xs={4}>
                            <Input id="startPercentage" label="Start %" type="number" bordered color="default"
                                   min={1} max={100} step={1} name="startPercentage" value={start} width="100%"
                                   onChange={event => setStart(event.target.value)} inputmode="decimal"/>
                        </Grid>
                        <Grid xs={4}>
                            <Input id="endPercentage" label="End %" type="number" bordered color="default"
                                   min={1} max={100} step={1} name="endPercentage" value={end} width="100%"
                                   onChange={event => setEnd(event.target.value)} inputmode="decimal"/>
                        </Grid>
                    </Grid.Container>
                </form>
            </div>

            <div className={styles.grid}>
                {calculateSteps().map((percentage) => <CalculatedWeight percentage={percentage} weight={weight} key={percentage} />)}
            </div>
        </main>
    )
}
