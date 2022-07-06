import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
<ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="60" rx="2" ry="2" width="148" height="148" /> 
    <rect x="158" y="101" rx="0" ry="0" width="266" height="12" /> 
    <rect x="158" y="126" rx="0" ry="0" width="266" height="12" /> 
    <rect x="158" y="163" rx="0" ry="0" width="82" height="34" />
  </ContentLoader>
)
