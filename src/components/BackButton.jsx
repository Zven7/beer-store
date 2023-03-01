import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleGoBack}
      style={{
        backgroundColor: "transparent",
        border: "transparent",
        cursor: "pointer",
      }}
    >
      <Image
        src={"/images/backArrow.svg"}
        width={24}
        height={24}
        alt="Go Back"
      />
    </button>
  );
}

export default BackButton;
