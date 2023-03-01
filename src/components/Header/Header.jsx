import Image from "next/image";
import React from "react";
import Style from "./Header.module.css";

function Header() {
  return (
    <div className={Style.header}>
      <button className={Style.burgerBtn}>
        <Image
          src={`/images/burgerMenu.svg`}
          alt={"Menu"}
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
      </button>
      <Image
        src={`/images/user.svg`}
        className={Style.userPhoto}
        alt={"User"}
        width={40}
        height={40}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

export default Header;
