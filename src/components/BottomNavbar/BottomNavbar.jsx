import Image from "next/image";
import React from "react";
import Style from "./BottomNavbar.module.css";

function BottomNavbar() {
  return (
    <div className={Style.bottomNavbar}>
      <Image src={"/images/home.svg"} alt="Home" width={20} height={20} />
      <Image src={"/images/list.svg"} alt="List" width={20} height={20} />
      <Image src={"/images/menuBag.svg"} alt="Cart" width={20} height={20} />
      <Image src={"/images/cog.svg"} alt="Settings" width={20} height={20} />
    </div>
  );
}

export default BottomNavbar;
