import { css, keyframes } from "@emotion/react";

export const WriteAreaBox = css`
  width: 100%;
  max-width: 60rem;
  background-color: #fff;
  box-shadow: 0.4rem 0.4rem 0.7rem rgb(0, 0, 85, 0.05);
  margin-top: 1rem;
  padding: 2rem 4rem;

  @media screen and (max-width: 960px) {
    padding: 1rem 0;
  }
`;

export const WriteInputBox = (widths: string[] | number[]) => css`
  display: grid;
  grid-template-columns: ${widths.map(size => `${size}px`).join(' ')};
  grid-template-rows: auto;
`

export const TitleBox = css`
  padding: 0 1rem 1rem;

  @media screen and (max-width: 960px) {
    padding-bottom: 0.5rem;
  }
`;

export const ColumnDisplay = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 2.25rem;
  padding: 0.2rem 0.5rem;
  margin-right: 1rem;
  font-size: 1rem;
  border-bottom: solid 1px #ddd;
  cursor: pointer;
`

export const SongInfoBox = css`
  margin: 2rem 0;
`

export const FlexVert = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FlexHoriz = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const SliderBox = css`
  position: relative;
  padding: 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    height: 0.5rem;
    border-right: solid 1px #11aaff;
    border-left: solid 1px #11aaff;
    border-bottom: solid 1px #11aaff;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 0
  }
  1% {
    opacity: 1
  }
  50% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`

export const SaveSuccessBox = css`
  display: flex;
  align-items: center;
  padding: 0.1rem 0.3rem;
  margin-left: 1rem;
  font-size: 0.7rem;
  background-color: #27a76f;
  border-radius: 0.5rem;
  animation: ${fadeOut} 4s ease-out forwards; 

  @media screen and (max-width: 960px) {
    padding: 0 0.1rem;
    margin-left: 0.5rem;
    font-size: 0.6rem;
  }
`

export const MenuMailAddressBox = css`
  padding: 0.5rem 0.5rem 1rem;
  max-width: 90vw;
  font-size: 0.8rem;
`;

export const SideBarHeadingBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: initial;
  height: 3rem;
  padding: 0 0.5rem 0 1rem;
`;

export const WriteBox = (width: number) => css`
  width: ${width}px;
`;

export const EditBox = (width: number, selected: boolean) => css`
  width: calc(${width}px - 0.5rem);
  position: relative;
  border: solid 1px #eee;
  transition: border-color 0.2s ease;
  margin-right: 0.5rem;
  font-size: 1rem;

  &:hover {
    border-color: #11aaff;
    svg {
      opacity: 1;
    }
  }

  ${selected && `
    border-color: #11aaff;
    svg {
      opacity: 1;
    }
  `}

  @media screen and (max-width: 960px) {
    font-size: 0.75rem;
  }
`;

export const EditBoxWrite = css`
  width: 100%;
  height: 1.625rem;
  white-space: nowrap;
  overflow: hidden;
  padding: 1px 0 2px;
`;