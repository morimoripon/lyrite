import { css } from "@emotion/react";

export const CheckIcon = css`
  width: 1.2rem;
  margin-right: 0.1rem;

  @media screen and (max-width: 960px) {
    width: 0.8rem;
    margin-right: 0;
  }
`;

export const ArrowBackIcon = css`
  width: 1.2rem;
`;

export const SideBarMoreIcon = (active: boolean) => css`
  opacity: ${active ? '1' : '0.2'};
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

export const EditModeMoreIcon = css`
  width: 1rem;
  height: 100%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background-color: #11aaff;
  opacity: 0;
  transition: opacity 0.2s ease;
`;