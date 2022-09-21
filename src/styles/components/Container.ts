import { css, keyframes } from "@emotion/react";

export const Contents = css`
  padding: 3rem 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 960px) {
    padding: 3rem 0.5rem 0;
  }
`;

export const WriteInputContainer = css`
  width: 100%;
  overflow: auto;
  padding: 0 1rem;
`;

export const ActionBarContainer = css`
  display: flex;
  width: 100%;
  max-width: 60rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: solid 1px #ddd;
  background-color: #fff;

  @media screen and (max-width: 960px) {
    padding: 1rem;
  }
`;

export const SideBarContainer = (drawerWidth: string) => css`
  width: ${drawerWidth}px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
  }
`;