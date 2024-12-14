"use client";
import React from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";

export const BackButton = (props: { text: string }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back()
  }

  // const buttonVariantStyle: string = props.buttonVariant !== undefined && props.buttonVariant !== null && props.buttonVariant?.length > 0 ? props.buttonVariant : "ghost";

  return <div className="w-fit px-1">
    <Button onClick={handleGoBack} className="font-semibold text-white">{props.text ?? "Back"}</Button>
  </div>;
};
