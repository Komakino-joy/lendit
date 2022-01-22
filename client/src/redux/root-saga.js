import { all, call } from 'redux-saga/effects';

import { dropDownSagas } from '../redux/drop-downs/drop-downs.sagas';
import { siteMemberSagas } from '../redux/site-member/site-member.sagas';
import { modalSagas } from './modal/modal.sagas';
import { userSagas } from './user/user.sagas';
import { assetSagas } from './asset/asset.sagas';

export default function* rootSaga() {
    yield all(
        [
            call(dropDownSagas),
            call(siteMemberSagas),
            call(modalSagas),
            call(userSagas),
            call(assetSagas),
        ]);
};
  