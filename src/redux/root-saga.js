import { all, call } from 'redux-saga/effects';

import { assetSagas } from '../redux/asset/asset.sagas';
import { userSagas } from "../redux/user/user.sagas";
import { dropDownSagas } from "../redux/drop-downs/drop-downs.sagas";

export default function* rootSaga() {
    yield all(
        [
            call(assetSagas),
            call(userSagas),
            call(dropDownSagas)
        ]);
};
  