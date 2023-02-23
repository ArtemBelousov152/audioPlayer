import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './hisroty.scss';

export default function History({ setValueFromHistory }) {

    const { history } = useSelector(state => state)

    if (history.length === 0) {
        return null
    }

    return (
        <ul className="history">
            {
                history.map(elem => {
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