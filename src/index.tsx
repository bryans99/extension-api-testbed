import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import { injectGlobal } from "styled-components"

// LENS setup
var link = document.createElement("link")
link.href = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
link.rel = "stylesheet"
document.head.appendChild(link)
injectGlobal`
  * {
    padding: 0;
    box-sizing: border-box;
  }
  ul, li, p,
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  body {
    background-color: white;
  }
  body,
  button,
  input,
  textarea,
  select {
    font-family: 'Open Sans', sans-serif;
  }
`

window.addEventListener("DOMContentLoaded", event => {
  var root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(<App standalone={window.top === window} />, root)
})
