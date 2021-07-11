import {put, takeLatest, select} from 'redux-saga/effects';
import * as actions from '../../actions';
import {StoreState} from '../../configureStore';

export function* getBooks() {
  try {
    // const { session_id } = yield select((state: StoreState) => state.auth);
    // const body = new JSONFormData(session_id);
    // const response: AxiosResponse<{
    //     callqueue_list: CallQueue[];
    // }> = yield api.post(Customer.GetCallQueueList, body);
    // yield put(actions.getCallQueues.success(response.data.callqueue_list));
  } catch (err) {
    // yield put(actions.getCallQueues.failure());
  }
}

export const booksSaga = [takeLatest(actions.getBooks.request, getBooks)];
