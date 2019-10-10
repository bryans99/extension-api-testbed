import * as React from "react"
import {
  LookerExtensionSDK,
  ExtensionHostApi,
  connectExtensionHost
} from "../../extension/api"
import { Heading, Button, Box, styled } from "looker-lens"
import { ExtensionButton } from "../ExtensionButton"

export const SandboxFunctions = () => {
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()
  const [messages, setMessages] = React.useState("")
  React.useEffect(() => {
    connectExtensionHost()
      .then(extensionHost => {
        setExtensionHost(extensionHost)
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
      setMessages(messages + "\nIs window open? Fails silently (in Chrome)")
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nOpen window foiled!")
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

  const pushStateButtonClick = () => {
    try {
      window.history.pushState({ abc: 123 }, "Page 2", "/page2")
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nPush state failed!")
    }
  }

  const saveLocalStorageButtonClick = () => {
    try {
      window.localStorage.setItem("KEY", "DATA")
    } catch (err) {
      console.error(err)
      setMessages(messages + "\nLocal storage setitem failed")
    }
  }

  return (
    <>
      <Heading my="xlarge">Sandbox Functions</Heading>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" width="50%">
          <ExtensionButton onClick={jailbreakButtonClick}>
            Attempt jailbreak
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={openWindowButtonClick}
          >
            Attempt open window
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={getCsrfTokenClick}
          >
            Get csrf token
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={thirdPartyApiButtonClick}
          >
            Call third party API
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={pushStateButtonClick}
          >
            Push state into history
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={saveLocalStorageButtonClick}
          >
            Save to local storage
          </ExtensionButton>
        </Box>
        <Box width="50%" pr="large">
          <StyledPre>{messages}</StyledPre>
        </Box>
      </Box>
    </>
  )
}

const StyledPre = styled.pre`
  margin: 0 0 0 20px;
  border: 1px solid #c1c6cc;
  height: 100%;
  padding: 20px;
`
