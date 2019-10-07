import * as React from "react"
import * as ReactDOM from "react-dom"
import Extension from "./Extension"

const createMountPoint = () => {
  var mountPoint = document.createElement("div")
  document.body.appendChild(mountPoint)
  return mountPoint
}

ReactDOM.render(<Extension />, createMountPoint())
