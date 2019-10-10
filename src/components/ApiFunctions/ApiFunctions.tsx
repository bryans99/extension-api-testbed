import * as React from "react"
import {
  LookerExtensionSDK,
  ExtensionHostApi,
  connectExtensionHost
} from "../../extension/api"
import { Heading, Box, styled } from "looker-lens"
import { ExtensionButton } from "../ExtensionButton"

export const ApiFunctions = () => {
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()
  const [messages, setMessages] = React.useState("")
  React.useEffect(() => {
    connectExtensionHost()
      .then(extensionHost => {
        setExtensionHost(extensionHost)
      })
      .catch(console.error)
  }, [])

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

  const updateTitleButtonClick = () => {
    if (extensionHost) {
      const date = new Date()
      extensionHost.updateTitle(
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

  return (
    <>
      <Heading my="xlarge">API Functions</Heading>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" width="50%">
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={updateTitleButtonClick}
          >
            Update title
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={goToBrowseButtonClick}
          >
            Go to browse
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={goToMarketplaceButtonClick}
          >
            Go to Marketplace
          </ExtensionButton>
          <ExtensionButton mt="small" variant="outline" onClick={buttonClick}>
            Verify host connection
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={getConnectionsButtonClick}
          >
            Get Connections
          </ExtensionButton>
          <ExtensionButton
            mt="small"
            variant="outline"
            onClick={getConnectionsUsingExtensionsSdkButtonClick}
          >
            Get Connections Using Extensions SDK
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
