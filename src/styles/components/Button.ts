import { css } from "@emotion/react";

export const SignOutButton = css`
  margin-left: 0.5rem;
  font-size: 0.8rem;

  @media screen and (max-width: 960px) {
    font-size: 0.625rem;
    padding: 0.1rem;
  }
`;

export const ActionButton = css`
  width: 6rem;
  height: 2.25rem;
  padding: 0.3125rem;
  :not(:first-of-type) {
    margin-left: 1rem;
  }
`;

export const AddButton = css`
  display: block;
  margin: 0 auto;
  font-size: 1.5rem;
  padding: 0;
`;

export const AddSentenceButton = css`
  width: 4rem;
  min-width: auto;
  font-size: 1rem;
  padding: 0;
`;

export const ButtonForIcon = css`
  width: 2rem;
  min-width: auto;
  padding: 0;
  margin-right: 1rem;

  @media screen and (max-width: 960px) {
    margin-right: 0.5rem;
  }
`;

export const ModalButton = css`
  width: 7rem;
  min-width: auto;
`;

export const SideBarOpenButton = (open: boolean) => css`
  width: 1.5rem;
  min-width: auto;
  padding: 0;
  margin-right: 0.5rem;
  opacity: 1;
  transition: width 0.2s ease, opacity 0.2s ease, margin 0.2s ease;
  overflow: hidden;

  @media screen and (min-width: 961px) {
    margin-right: 1rem;
    ${open && `
      width: 0;
      opacity: 0;
      margin-right: 0;
    `};
  }
`

export const SideBarCloseButton = css`
  width: 2rem;
  min-width: auto;
  padding: 0;
`;
