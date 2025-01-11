"use client";
import React from 'react'
import { Card, CardHeader } from '../../card'
import Heading from '../HeadingComponent/Heading'
import { Button } from '../../MyButton'
import Image from "next/image";

interface IProps {
    clickHandler: () => void
}

export const BoardLockedSection = (props: IProps) => {
    return (
        <section className="flex justify-center items-center fixed w-full h-full bg-gray-500 top-0 left-0 z-30 bg-opacity-40">
            <Card className="w-1/2">
                <CardHeader className="flex justify-center items-center">
                    <Image width="100" height="100" className="w-fit self-center" src="https://img.icons8.com/clouds/100/lock-2.png" alt="lock-2" />
                    <Heading variant="h3" extraStyles="text-gray-800 font-light text-lg my-0" title="The board seems to be locked right now by the owner" />
                    <Heading variant="h3" extraStyles="text-gray-800 font-light text-lg my-0 mb-1" title="Please wait until owner unlocks it or contact the owner to unlock it !" />
                    <Button onClick={props.clickHandler} variant={"default"}>Ok</Button>
                </CardHeader>
            </Card>
        </section>
    )
}
