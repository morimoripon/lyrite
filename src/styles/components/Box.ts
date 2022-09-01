import { css } from "@emotion/react";

export const Contents = css`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WriteAreaBox = css`
  max-width: 60rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0.4rem 0.4rem 0.7rem rgb(0, 0, 85, 0.05);
  margin-top: 1rem;
  padding: 2rem 6rem;
`;

export const WriteInputBox = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  width: 100%;
  align-items: center;
`;

export const TitleBox = css`
  padding: 0 0 1rem;
`;

export const ActionBar = css`
  max-width: 60rem;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: solid 1px #ddd;
  background-color: #fff;
`;