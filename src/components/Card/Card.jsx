import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Style from "./Card.module.css";

function Card({ product }) {
  const { id, brand, image, skus } = product;
  const [imgUrl, setImgUrl] = useState(`/images${image}`);

  const handleImgError = () => {
    setImgUrl("/images/missing.svg");
  };
  return (
    <div className={Style.card}>
      <Link href={`/${id}/${brand}`}>
        <p className={Style.title}>{brand}</p>
        <Image
          src={imgUrl}
          alt={brand}
          width="120"
          height="120"
          style={{ objectFit: "contain" }}
          onError={handleImgError}
        />
        <p>{}</p>
        <button className={Style.addBtn}>+</button>
      </Link>
    </div>
  );
}

export default Card;
