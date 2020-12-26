import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ fileName, alt, style }) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 600) {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const fluid = allImageSharp.nodes.find(n => n.fluid.originalName === fileName)
    .fluid

  return (
    <>
      <Img fluid={fluid} alt={alt} style={style} loading={'eager'} fadeIn={false}/>
    </>
  )
}

export default Image