"use client";
import { FunctionComponent } from "react";

interface HeadingProps {
  variant: string,
  title: string,
  extraStyles?: string
}

const Heading: FunctionComponent<HeadingProps> = ({ variant, title, extraStyles }) => {

  if (title?.length === 0)
    return;

  switch (variant) {
    case "h1":
      return <h1 className={`font-bold text-lg lg:text-xl text-gray-800 capitalize ${extraStyles}`}>{title}</h1>;
    case "h2":
      return <h2 className={`text-gray-800 lg:text-xl capitalize ${extraStyles}`}>{title}</h2>;
    case "h3":
      return <h2 className={`text-gray-700 lg:text-base capitalize ${extraStyles}`}>{title}</h2>;
    default:
      break;
  }


};

export default Heading;