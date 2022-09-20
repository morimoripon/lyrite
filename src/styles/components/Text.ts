import { css } from "@emotion/react";

export const TitleLogo = css`
  font-size: 1.25rem;
  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`

export const MailAddress = css`
  position: relative;
  font-size: 1rem;
  padding-right: 1.5rem;
  max-width: 30rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:before {
    content: '';
    display: block;
    position: absolute;
    right: 0.2rem;
    top: 40%;
    width: 0.6rem;
    height: 0.6rem;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    transform: translateY(-50%) rotateZ(135deg);
  }

  @media screen and (max-width: 960px) {
    font-size: 0.75rem;
    max-width: 10rem;
    padding-right: 1rem;

    &:before {
      top: 38%;
      width: 0.5rem;
      height: 0.5rem;
    }
  }

`

export const Ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
`