import * as React from "react"
import { Chatty } from "@looker/chatty"
import {
  createExtensionHost,
  LookerExtensionSDK,
  ExtensionHostApi
} from "./extension/api"

let lang: string = "TypeScript"

export default () => {
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()
  const [messages, setMessages] = React.useState("")
  React.useEffect(() => {
    Chatty.createClient()
      .withTargetOrigin("*")
      .build()
      .connect()
      .then(_host => {
        setExtensionHost(createExtensionHost(_host))
      })
      .catch(console.error)
  }, [])

  const jailbreakButtonClick = () => {
    try {
      const slipstream = (window.parent as any).slipstream
      setMessages(
        messages +
          "\nSuccessful Jailbreak - parent slipstream:\n" +
          JSON.stringify(slipstream)
      )
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nJailbreak foiled!")
    }
  }

  const buttonClick = () => {
    if (extensionHost) {
      extensionHost
        .verifyHostConnection()
        .then(value => {
          if (value === true) {
            setMessages(messages + "\nHost verification success")
          }
        })
        .catch(error => {
          setMessages(messages + "\nHost verification failure")
          console.error("Host verification failure", error)
        })
    } else {
      setMessages(messages + "\nWhere's my extension host?")
      console.error("Where's my extension host?")
    }
  }

  const getConnectionsButtonClick = () => {
    if (extensionHost) {
      extensionHost
        .invokeCoreSdkByName("all_connections")
        .then(response => {
          if (response.ok) {
            let message = ""
            response.value.forEach(connection => {
              message += connection.name + "\n"
            })
            setMessages(messages + "\n" + message)
          }
        })
        .catch(error => {
          setMessages(messages + "\nGet connections failure")
          console.error("Get connections failure", error)
        })
    } else {
      setMessages(messages + "\nWhere's my extension host?")
      console.error("Where's my extension host?")
    }
  }

  const getConnectionsUsingExtensionsSdkButtonClick = () => {
    if (extensionHost) {
      const sdk = LookerExtensionSDK.createClient(extensionHost)
      sdk.all_connections().then((response: any) => {
        if (response.ok) {
          let message = ""
          response.value.forEach(connection => {
            message += connection.name + "\n"
          })
          setMessages(messages + "\n" + message)
        }
      })
    } else {
      setMessages(messages + "\nWhere's my host?")
      console.error("Where's my host?")
    }
  }

  return (
    <>
      <h1>Sample Extension</h1>
      <p>This is a sample extension written in {lang}.</p>
      <button onClick={jailbreakButtonClick}>Attempt jailbreak</button>
      <button onClick={buttonClick}>Verify host connection</button>
      <button onClick={getConnectionsButtonClick}>Get Connections</button>
      <button onClick={getConnectionsUsingExtensionsSdkButtonClick}>
        Get Connections Using Extensions SDK
      </button>
      <pre>{messages}</pre>
    </>
  )
}
