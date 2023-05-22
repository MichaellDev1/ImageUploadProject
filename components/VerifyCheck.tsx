import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";

interface Props {
  style?: React.CSSProperties;
}

export default function VerifyCheck({ style }: Props) {
  return (
    <div
      className="text-sky-600 rounded-full text-ms z-10"
      style={style}
    >
      <VscVerifiedFilled />
    </div>
  );
}
