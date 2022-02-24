export const isAccountExist = async (state, accountId) => {
  if (!accountId) return false;
  try {
    await state.main.entities.near.connection.provider.query({
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    });
    return true;
  } catch (e) {
    return false;
  }
};
