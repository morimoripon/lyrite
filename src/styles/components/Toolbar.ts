import { css } from "@emotion/react";

export const HeaderToolbarWrap = css`
  display: flex;
  justify-content: space-between;
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