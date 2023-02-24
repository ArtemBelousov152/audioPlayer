import { v4 as uuidv4 } from 'uuid';

import './hisroty.scss';

export default function History({ setValueFromHistory, value, className, history }) {

    const filteredHistory = value === '' ? history :
        history.filter(elem => {
            return elem.includes(value);
        })

    if (filteredHistory.length === 0) {
        return null
    }

    const bottomMultiplier = filteredHistory.length >= 4 ? 4 : filteredHistory.length;

    return (
        <ul
            className={`history ${className}`}
            style={{ bottom: `${-48 * bottomMultiplier}px` }}>
            {
                filteredHistory.map((elem, index) => {
                    if (index >= 4) {
                        return;
                    }
                    return (
                        <li
                            key={uuidv4()}
                            className='history__item'
                            onClick={setValueFromHistory}>
                            {elem}
                        </li>
                    )

                })
            }
        </ul>
    )
}