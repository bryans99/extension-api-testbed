import * as React from "react"
import {
  LookerExtensionSDK,
  ExtensionHostApi,
  connectExtensionHost
} from "./extension/api"

let lang: string = "TypeScript"

export default () => {
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()
  const [messages, setMessages] = React.useState("")
  React.useEffect(() => {
    connectExtensionHost()
      .then(extensionHost => setExtensionHost(extensionHost))
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

  const getCsrfTokenClick = () => {
    try {
      fetch("https://self-signed.looker.com:9999/", {
        // mode: "cors",
        headers: {
          "x-csrf-token": "68YKnzR8X3pxCHJcYgXVxiKJPI3R2aapSJShdxDk9gU="
        }
      })
        .then((response: any) => {
          console.log(response)
          setMessages(messages + "\nGet csrf succeeded!")
        })
        .catch(err => {
          console.error(err)
          setMessages(messages + "\nGet csrf failed!")
        })
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nGet csrf failed!")
    }
  }

  const openWindowButtonClick = () => {
    try {
      window.open("http://example.com", "_blank")
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nOpen window foiled!")
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

  const updatePageTitleButtonClick = () => {
    if (extensionHost) {
      const date = new Date()
      extensionHost.updatePageTitle(
        `Extension Title Update ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      )
    } else {
      setMessages(messages + "\nWhere's my extension host?")
      console.error("Where's my extension host?")
    }
  }

  const goToBrowseButtonClick = () => {
    if (extensionHost) {
      extensionHost.updateLocation("/browse")
    } else {
      setMessages(messages + "\nWhere's my extension host?")
      console.error("Where's my extension host?")
    }
  }

  const goToMarketplaceButtonClick = () => {
    if (extensionHost) {
      extensionHost.updateLocation("/marketplace")
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

  const thirdPartyApiButtonClick = () => {
    try {
      fetch(
        "https://hacker-news.firebaseio.com/v0/item/160705.json?print=pretty"
      )
        .then((response: any) => response.json())
        .then((json: any) =>
          setMessages(
            messages +
              "\nThird party api succeeded!\n" +
              JSON.stringify(json, undefined, 2)
          )
        )
        .catch(err => {
          console.error(err)
          setMessages(messages + "\nThird party api failed!")
        })
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nThird party api failed!")
    }
  }

  return (
    <>
      <h1>Sample Extension</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <button style={{ margin: "10px" }} onClick={jailbreakButtonClick}>
            Attempt jailbreak
          </button>
          <button style={{ margin: "10px" }} onClick={openWindowButtonClick}>
            Attempt open window
          </button>
          <button style={{ margin: "10px" }} onClick={getCsrfTokenClick}>
            Get csrf token
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={updatePageTitleButtonClick}
          >
            Update page title
          </button>
          <button style={{ margin: "10px" }} onClick={goToBrowseButtonClick}>
            Go to browse
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={goToMarketplaceButtonClick}
          >
            Go to Marketplace
          </button>
          <button style={{ margin: "10px" }} onClick={buttonClick}>
            Verify host connection
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={getConnectionsButtonClick}
          >
            Get Connections
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={getConnectionsUsingExtensionsSdkButtonClick}
          >
            Get Connections Using Extensions SDK
          </button>
          <button style={{ margin: "10px" }} onClick={thirdPartyApiButtonClick}>
            Call third party API
          </button>
        </div>
        <pre style={{ margin: "10px" }}>{messages}</pre>
      </div>
    </>
  )
}
