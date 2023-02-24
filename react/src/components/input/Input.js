import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerSlice } from '../../store/reducers/playerSlice';
import History from '../history/History';

import arrow from '../../assets/arrow.svg';

import './input.scss';

export default function Input() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const { addSong, addLinkOnHistory, setActivePlayer } = playerSlice.actions;
    const { history } = useSelector(state => state)

    const navigate = useNavigate();

    const setLink = () => {
        if (value.slice(0, 8) !== 'https://') {
            // document.querySelector('.error').classList.add('error_active');
            setError(true);
            return;
        } else {
            setError(false);
        }

        dispatch(addSong(value));

        // document.querySelector('.error').classList.remove('error_active');

        if (!history.includes(value)) {
            dispatch(addLinkOnHistory(value));
        }

        navigate('/player');
    }

    const setValueFromHistory = (e) => {
        setValue(e.target.innerHTML);
    }

    return (
        <div className="input">
            <div className="input__wrapper">
                <h1 className='input__title'>Insert the link</h1>
                <div className="input__form">
                    <input
                        className={`input__input`}
                        placeholder='https://'
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <button
                        to={'/player'}
                        className='input__btn'
                        onClick={setLink}>
                        <img src={arrow} alt="arrow" />
                    </button>
                </div>
                <History
                    setValueFromHistory={setValueFromHistory}
                    value={value} 
                    className="input__history"
                    history={history}/>
            </div>
        </div>
    )
}