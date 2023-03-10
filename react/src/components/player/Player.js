import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timeFormat } from '../../utils/timeFormat';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';
import { playerSlice } from '../../store/reducers/playerSlice';

import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';

import './player.scss';

export default function Player({ playerNumber }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTime, setSongTime] = useState(0);
    const [seconds, setSeconds] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [volume, setVolume] = useState(20);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const { songLink, activePlayer } = useSelector(state => state);
    const dispatch = useDispatch();
    const { setActivePlayer } = playerSlice.actions;

    const audioElem = useRef();

    const playPause = () => {
        dispatch(setActivePlayer(playerNumber));

        setIsPlaying(isPlaying => !isPlaying);
    }

    useEffect(() => {
        let checkLoading;
        if (isPlaying === false && audioElem.current.networkState === 2) {
            setLoading(true);

            checkLoading = setInterval(() => {
                if (audioElem.current.networkState === 2) {
                    return;
                }

                if (audioElem.current.networkState !== 2) {
                    setLoading(false);
                    clearTimeout(checkLoading);
                }
            }, 100)
        }

        if (isPlaying === true) {
            clearTimeout(checkLoading);
            setLoading(false);
        }

        return () => {
            clearTimeout(checkLoading);
        }

    }, [isPlaying]);

    useEffect(() => {
        audioElem.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (activePlayer === playerNumber) {
            setIsPlaying(true);
        }

        if (activePlayer !== playerNumber) {
            setIsPlaying(false);
        }
    }, [activePlayer])

    useEffect(() => {
        if (isPlaying && activePlayer === playerNumber) {
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
        } else if (time === Infinity) {
            setProgress(100);
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

    const loaderClass = classNames({
        'player__loader_animated': loading
    })

    const onProgressChange = (event, value) => {
        if (duration === 0) {
            return;
        }

        setIsPlaying(false);
        setProgress(value);

        let newTime = duration * (value / 100);
        let newMinutes = 0;
        let newSeconds = 0;

        audioElem.current.currentTime = newTime;

        if (newTime > 60) {
            while (newTime > 60) {
                newMinutes += 1;
                newTime -= 60;
            }
        }

        newSeconds = timeFormat(Math.floor(newTime));
        newMinutes = timeFormat(newMinutes);

        setSeconds(newSeconds);
        setMinutes(newMinutes);
    }

    const onProgressChangeCommitted = (event, value) => {
        if (duration === 0) {
            return;
        }

        setIsPlaying(true);
    }

    return (
        <div className="player">
            <audio
                id="music"
                src={songLink}
                ref={audioElem}
                onTimeUpdate={onPlaying}
                preload='metadata' />
            <div className="player__wrapper">
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
                            value={progress}
                            onChange={onProgressChange}
                            onChangeCommitted={onProgressChangeCommitted}
                        />
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
            </div>
        </div>
    )
}
