import React, { useEffect } from "react";
import "../components/DarkMode.css";

let theme = localStorage.getItem("theme");

function switchClick() {
  if (theme === "dark") {
    document.querySelector("body").classList.remove("dark");
    document.querySelector("body").classList.add("light");
    theme = "light";
  } else {
    document.querySelector("body").classList.remove("light");
    document.querySelector("body").classList.add("dark");
    theme = "dark";
  }

  localStorage.setItem("theme", theme);
}

if (theme === "dark") {
  document.querySelector("body").classList.add("dark");
}

if (theme === "light") {
  document.querySelector("body").classList.add("light");
}

function DarkMode() {
  return (
    <div>
      {/* <button className='mode-switch'> */}
      <button onClick={switchClick} className='mode-switch'>
        <div className='icon-switch'></div>
      </button>
    </div>
  );
}

export default DarkMode;
