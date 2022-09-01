import { css } from "@emotion/react";


export const WriteInputStyle = css`
  width: 90%;
  &::before {
    border: none;
  }
`

export const TitleStyle = css`
  ${WriteInputStyle};
  font-size: 2rem;
`