"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../MyButton";
import { BackArrow } from "../Icons/BackArrow";

interface IPropsType { text?: string, variant?: string, extraStyles?: string }


export const BackButton = (props: IPropsType) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back()
  }

  const buttonVariant = props.variant ?? "default";

  return <div className="w-fit px-1">
    <Button onClick={handleGoBack} className={`gap-x-1 font-semibold text-white ${props.extraStyles}`} variant={buttonVariant}>
      <BackArrow />
      {props.text ?? "Back"}
    </Button>
  </div>;
};
