import React, { useEffect, useState } from 'react'

const useSideBar = (open: boolean): { sideBarOpened: boolean, openSideBar: Function, closeSideBar: Function } => {
  const [ sideBarOpened, setSideBarOpened ] = useState<boolean>(open);

  const openSideBar = () => {
    setSideBarOpened(true);
  }

  const closeSideBar = () => {
    setSideBarOpened(false);
  }

  return { sideBarOpened, openSideBar, closeSideBar };
}

export default useSideBar