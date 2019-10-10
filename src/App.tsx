import { Sidebar } from "./components/Sidebar"
import { SandboxFunctions } from "./components/SandboxFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { RouteChangeListener } from "./RouteChangeListener"
import { ThemeProvider, theme, Box, styled } from "looker-lens"

export const App = () => {
  const [pathname, setPathname] = useState("")

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RouteChangeListener setPathname={setPathname} />
        <Layout>
          <Sidebar pathname={pathname} />
          <Box>
            <Switch>
              <Route path="/api">
                <ApiFunctions />
              </Route>
              <Route path="/sandbox">
                <SandboxFunctions />
              </Route>
              <Redirect to="/api" />
            </Switch>
          </Box>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export const Layout = styled(Box)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
`
