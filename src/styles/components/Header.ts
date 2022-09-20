import { css } from "@emotion/react";

export const HeaderToolbarWrap = css`
  display: flex;
  justify-content: space-between;
`;

export const CheckIcon = css`
  width: 1.2rem;
  margin-right: 0.1rem;

  @media screen and (max-width: 960px) {
    width: 0.8rem;
    margin-right: 0;
  }
`;

export const HeaderToolbar = css`
  @media screen and (max-width: 960px) {
    padding-right: 0.1rem;

    &:not(:first-of-type) {
      padding-left: 0.1rem;
      padding-right: 1rem;
    }
  }
`;