import { thunk } from 'easy-peasy';
import { routes } from '../../../config/routes';
import { getNearApi } from '../helpers/getNearApi';

export const onDisconnect = thunk(async (_, history, { getStoreActions }) => {
  const actions = getStoreActions();
  const { enableLoading, disableLoading } = actions.main;
  try {
    enableLoading();
    const resetState = actions.resetState;
    const setNearApi = actions.main.setNearApi;
    localStorage.clear();
    resetState();
    history.replace(routes.home);
    setNearApi(await getNearApi());
  } catch (e) {
    console.log(`Error: ${e}`);
  } finally {
    disableLoading();
    document.location.reload();
  }
});
