import reactStart from '../../react/src/index';
import technicalSwitch from './modules/technialSwitch';
import closeError from './modules/closeError';

import '../style/style.scss';


window.addEventListener('DOMContentLoaded', () => {
    reactStart();
    technicalSwitch();
    closeError();
})