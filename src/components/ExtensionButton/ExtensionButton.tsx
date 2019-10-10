import * as React from "react"
import { Button, styled } from "looker-lens"

export const ExtensionButton: React.FC<any> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton variant="outline" onClick={onClick} mb="small">
      <StyledLabel>{children}</StyledLabel>
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  text-align: center;
`

const StyledLabel = styled.div`
  display: inline-block;
  width: 100%;
`
