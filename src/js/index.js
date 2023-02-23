import reactStart from '../../react/src/index';
import technicalSwitch from './modules/technialSwitch';
import closeError from './modules/closeError';

window.addEventListener('DOMContentLoaded', () => {
    reactStart();
    technicalSwitch();
    closeError();
})

import '../style/style.scss';