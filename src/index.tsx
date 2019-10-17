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
    body,
    button,
    input,
    textarea,
    select {
      font-family: 'Open Sans', sans-serif;
    }
    body {
      padding: 0;
      margin: 0;
    }
`

window.addEventListener("DOMContentLoaded", event => {
  var root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(<App standalone={window.top === window} />, root)
})
