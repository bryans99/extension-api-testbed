import { Sidebar } from "./components/Sidebar"
import { SandboxFunctions } from "./components/SandboxFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ThemeProvider, theme, Box, styled } from "looker-lens"
import { LensPlayground } from "./components/LensPlayground"
import { ExtensionWrapper } from "./components/ExtensionWrapper"

interface AppProps {
  standalone?: boolean
}

enum ROUTES {
  API_ROUTE = "/api",
  SANDBOX_ROUTE = "/sandbox",
  LENS_ROUTE = "/lens"
}

export const App: React.FC<AppProps> = ({ standalone }) => {
  const [pathname, setPathname] = useState("")

  return (
    <ThemeProvider theme={theme}>
      <ExtensionWrapper setPathname={setPathname}>
        <Layout>
          <Sidebar pathname={pathname} />
          <Box>
            <Switch>
              <Route path={ROUTES.API_ROUTE}>
                <ApiFunctions />
              </Route>
              <Route path={ROUTES.SANDBOX_ROUTE}>
                <SandboxFunctions />
              </Route>
              <Route path={ROUTES.LENS_ROUTE}>
                <LensPlayground />
              </Route>
              <Redirect to={ROUTES.API_ROUTE} />
            </Switch>
          </Box>
        </Layout>
      </ExtensionWrapper>
    </ThemeProvider>
  )
}

export const Layout = styled(Box)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
`
