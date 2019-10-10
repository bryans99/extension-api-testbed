import { Box, MenuGroup, MenuItem } from "looker-lens"
import * as React from "react"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { SidebarProps } from "./"

const API_ROUTE = "/api"
const SANDBOX_ROUTE = "/sandbox"

export const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  return (
    <Box display="flex" flexDirection="column">
      <MenuGroup type="none" mt="xsmall">
        <StyledRouterLink to={API_ROUTE}>
          <MenuItem
            icon="Flag"
            is="span"
            currentMarker
            current={pathname === API_ROUTE}
            pl="none"
          >
            Api Functions
          </MenuItem>
        </StyledRouterLink>
        <StyledRouterLink to={SANDBOX_ROUTE}>
          <MenuItem
            icon="Clock"
            is="span"
            currentMarker
            current={pathname === SANDBOX_ROUTE}
            pl="none"
          >
            Sandbox Functions
          </MenuItem>
        </StyledRouterLink>
      </MenuGroup>
    </Box>
  )
}

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`
