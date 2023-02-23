import { Link } from 'react-router-dom';
import { playerSlice } from '../../store/reducers/playerSlice';
import { useDispatch } from 'react-redux';
import Player from '../player/Player';

import smallArrow from '../../assets/smallArrow.svg';

import './PlayerWrapper.scss';

export default function PlayerWrapper() {

    const dispatch = useDispatch();
    const { clearLink } = playerSlice.actions;

    const backToInput = () => {
        dispatch(clearLink());
    }

    return (
        <div className="playerWrapper">
            <Link
                to={'/'}
                className="playerWrapper__back"
                onClick={backToInput}
            >
                <img src={smallArrow} alt="arrow" />
                Back
            </Link>
            <Player/>
            <Player/>
        </div>
    )
}