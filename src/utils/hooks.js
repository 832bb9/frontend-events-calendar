import { useState, useEffect, useMemo } from "react";

import { call } from "../utils/misc";

export const useResource = endpoint => {
  const [state, setState] = useState({ data: null, loading: false });
  useEffect(() => {
    let canceled = false;

    call(async () => {
      setState({ data: null, loading: true });
      const data = await (await fetch(endpoint)).json();
      if (canceled) {
        return;
      }
      setState({ data, loading: false });
    });

    return () => {
      canceled = true;
    };
  }, [endpoint]);
  return state;
};

export const useTransform = (fn, data, deps = []) =>
  useMemo(() => fn(data), [data, ...deps]);
