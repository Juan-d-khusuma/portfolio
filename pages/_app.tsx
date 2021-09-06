/* eslint-disable react/prop-types */
import "../styles/styles.css";
import "tailwindcss/tailwind.css";
import React from "react";

/**
 *
 * @return {JSX.Element}
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
