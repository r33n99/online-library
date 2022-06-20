import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
 <ContentLoader
    speed={2}
    width={300}
    height={460}
    viewBox="0 0 300 460"
    backgroundColor="#eee8e8"
    foregroundColor="#c7c2c2"
    {...props}
  >
    <rect x="23" y="27" rx="2" ry="2" width="266" height="304" /> 
    <rect x="23" y="342" rx="0" ry="0" width="266" height="11" /> 
    <rect x="212" y="402" rx="28" ry="28" width="79" height="43" /> 
    <rect x="23" y="411" rx="0" ry="0" width="85" height="33" /> 
    <rect x="23" y="362" rx="0" ry="0" width="266" height="11" /> 
    <rect x="23" y="382" rx="0" ry="0" width="266" height="11" />
  </ContentLoader>
)
