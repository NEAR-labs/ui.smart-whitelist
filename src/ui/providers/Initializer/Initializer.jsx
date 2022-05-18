import React, { cloneElement, useEffect } from 'react';
import Loader from '../../components/general/Loader/Loader';
import { useState } from 'react';

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();
  const onInitApp = actions.main.onInitApp;

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      await onInitApp({ history, setInit });
    })();
  }, [store, history, onInitApp]);

  return isInit ? cloneElement(children, { history }) : <Loader />;
};
