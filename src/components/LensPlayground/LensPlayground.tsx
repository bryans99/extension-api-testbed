import * as React from "react"
import { Heading, Card, CardContent, Text } from "looker-lens"
import { LensPlaygroundProps } from "./types"

export const LensPlayground: React.FC<LensPlaygroundProps> = () => {
  return (
    <>
      <Card raised m="large">
        <CardContent>
          <Heading fontWeight="semiBold" textTransform="caps">
            Welcome to Lens
          </Heading>
          <Text>Looker's component library</Text>
        </CardContent>
      </Card>
    </>
  )
}
