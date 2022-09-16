import { css } from "@emotion/react";


export const WriteInputStyle = css`
  width: calc(100% - 0.5rem);
  font-size: 1rem;
  &::before {
    border: none;
  }
  input {
    padding: 1px 0 2px;
  }

  @media screen and (max-width: 960px) {
    font-size: 0.75rem;
  }
`

export const TitleStyle = css`
  ${WriteInputStyle};
  font-size: 1.5rem;

  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`

export const ModalInput = css`
  font-size: 1.5rem;
`

export const SliderStyle = css`
  width: 4rem;

  @media screen and (max-width: 960px) {
    width: 3rem;
  }
`

