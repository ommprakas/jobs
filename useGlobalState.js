import { useState } from "react";

export const useGlobalState = () => {
  const [state, setState] = useState({});

  const setGlobalState = (payload) => {
    setState(payload);
    return state;
  };
  return { state, setGlobalState };
};
