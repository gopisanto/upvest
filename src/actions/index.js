import axios from 'axios';

export const LOAD_CUSTOMERS = 'src.actions.loadCustomers';
export const LOAD_CUSTOMERS_ERROR = 'src.actions.loadCustomersError';

export const loadCustomers = () => async (dispatch) => {
  try {
    const customers = await axios.get('../../assets/data.json');

    dispatch({
      type: LOAD_CUSTOMERS,
      payload: customers.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CUSTOMERS_ERROR,
      payload: err,
    });
  }
};
