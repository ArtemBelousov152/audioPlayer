import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { playerSlice } from '../../store/reducers/playerSlice';
import { timeFormat } from '../../utils/timeFormat';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';

import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import smallArrow from '../../assets/smallArrow.svg';

import './player.scss';

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTime, setSongTime] = useState(0);
    const [seconds, setSeconds] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [volume, setVolume] = useState(20);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);

    const { songLink } = useSelector(state => state);
    const dispatch = useDispatch();
    const { clearLink } = playerSlice.actions;

    const audioElem = useRef();

    const playPause = () => {
        setIsPlaying(isPlaying => !isPlaying);
    }

    useEffect(() => {
        const checkLoad = setInterval(() => {
            console.log('interval');
            if (audioElem.current.networkState === 2) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        }, 2000);

        return () => clearInterval(checkLoad);
    }, []);

    useEffect(() => {
        audioElem.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }, [isPlaying]);

    const onPlaying = () => {
        const ct = Math.floor(audioElem.current.currentTime);
        const time = (ct / duration * 100)

        if (!isNaN(time) && time !== Infinity) {
            setProgress(time);
        }


        if (ct !== songTime) {
            setSongTime(ct);
            setSeconds(state => {
                if (+state + 1 === 60) {
                    setMinutes(state => timeFormat(+state + 1));
                    return '00';
                }

                return timeFormat(+state + 1);
            })
        }


        if (audioElem.current.duration === Infinity || isNaN(audioElem.current.duration)) {
            return;
        } else {
            setDuration(audioElem.current.duration);
        }
    }



    const changeVolume = (event, value) => {
        setVolume(value);
    }

    const backToInput = () => {
        dispatch(clearLink());
    }

    const loaderClass = classNames({
        'player__loader_animated': loading
    })

    return (
        <div className="player">
            <audio
                id="music"
                src={songLink}
                ref={audioElem}
                onTimeUpdate={onPlaying} />
            <div className="player__wrapper">
                <div className='player__title'>{songLink}</div>
                <div className="player__container">
                    <div className={`player__loader ${loaderClass}`}></div>
                    <div className="player__btn">
                        <img
                            src={isPlaying ? pause : play}
                            alt="play"
                            onClick={playPause} />
                    </div>
                    <div className="player__progress">
                        <Slider
                            value={progress} />
                    </div>
                    <div className="player__footer">
                        <div className="player__time">
                            <span id='minutes'>{minutes}</span>
                            :
                            <span id='seconds'>{seconds}</span>
                        </div>
                        <div className="player__volume">
                            <Slider
                                onChange={changeVolume}
                                value={volume} />
                        </div>
                    </div>
                </div>
                <Link
                    to={'/'}
                    className="player__back"
                    onClick={backToInput}
                >
                    <img src={smallArrow} alt="arrow" />
                    Back
                </Link>
            </div>
        </div>
    )
}