import React from "react"

import Header from "./header"
import "./main.css"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="text-gray-400 text-xs text-center  mx-5 mt-10 border-t border-gray-200 pt-5">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}
