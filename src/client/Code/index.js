import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/palenight'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0;
  }
`

const fontFamily = `font-family: 'Source Code Pro', 'SFMono-Regular', Consolas, 'Liberation Mono',
    Menlo, Courier, monospace;`

const Container = styled.div`
  top: 5.75rem;
  animation: ${props =>
    props.animatingOut
      ? css`
          ${fadeOut} .5s forwards;
        `
      : css`
          ${fadeIn} 2s forwards;
        `}
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  overflow: auto;
  height: 100vh;
  background: rgb(41, 45, 62);
  color: white;
  padding: 2rem;
  padding-top: 1rem;
  ${fontFamily};
  pre,
  code {
    ${fontFamily}
  }
`

const threshold = 70000

export default function Code({ text, setHovered, animatingOut }) {
  React.useEffect(() => {
    setHovered(null)
    setTimeout(() => {
      setHovered(null)
    }, 10)
  }, [text])
  if (text.length > threshold) {
    return (
      <Container animatingOut={animatingOut}>
        <div>{text}</div>
      </Container>
    )
  }

  return (
    <Container animatingOut={animatingOut}>
      <Highlight {...defaultProps} code={text} language="jsx" theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Container>
  )
}