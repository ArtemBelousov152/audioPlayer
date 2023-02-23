import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { playerSlice } from '../../store/reducers/playerSlice';
// import classNames from 'classnames';

// import warning from '../../assets/warning.svg';
import arrow from '../../assets/arrow.svg';

import './input.scss';

export default function Input() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const { addSong } = playerSlice.actions;

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (value.slice(0, 8) !== 'https://') {
    //         setError(true);
    //     } else {
    //         setError(false);
    //     }
    // },[value]);

<<<<<<< HEAD:src/components/input/Input.js
=======
    useEffect(() => {
        if (error) {
            document.querySelector('.error').classList.add('error_active');
        }
    },[error])

>>>>>>> v2:react/src/components/input/Input.js
    const setLink = () => {
        if (value.slice(0, 8) !== 'https://') {
            setError(true);
            return;
        } else {
            setError(false);
        }

        dispatch(addSong(value));
        navigate('/player');

    }

    // const inputClass = classNames({
    //     'input__border': error
    // });

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
                    {/* {error ? <img className='input__error' src={warning} alt="warning" /> : null} */}
                </div>
                {/* {error ? <div className="input__warning">Wrong link</div> : null} */}
            </div>
        </div>
    )
}