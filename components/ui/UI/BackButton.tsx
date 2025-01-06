"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../MyButton";

export const BackButton = (props: { text?: string }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back()
  }

  return <div className="w-fit px-1">
    <Button onClick={handleGoBack} className="font-semibold text-white">{props.text ?? "Back"}</Button>
  </div>;
};
