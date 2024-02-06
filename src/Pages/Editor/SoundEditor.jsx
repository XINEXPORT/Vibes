import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SoundAccordion from './SoundAccordion.jsx';
import './SoundEditor.css';


const SoundEditor = ({
    isPlaying,
    sounds,
    setSelectedSounds,
    selectedSounds,
    soundOne,
    fxOne,
    soundTwo,
    fxTwo,
    soundThree,
    fxThree,
    soundFour,
    fxFour,
    setSoundOne,
    setFxOne,
    setSoundTwo,
    setFxTwo,
    setSoundThree,
    setFxThree,
    setSoundFour,
    setFxFour,
    setBroadcastOne,
    broadcastOne,
    activeIndex, 
    setActiveIndex
    }) => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal);

    return (
        <section id="editor">
        <div className = "sound-btns">
            {isPlaying ?
            <>
                <button
                    className={activeIndex === 1 ? 'btn-active btn-playing' : 'btn-playing'}
                    onClick={() => activeIndex === 1 ? setActiveIndex(null) : setActiveIndex(1)}
                >{soundOne ? soundOne.name : 'Empty'}</button>
                <button
                    className={activeIndex === 2 ? 'btn-active btn-playing' : 'btn-playing'}
                    onClick={() => activeIndex === 2 ? setActiveIndex(null) : setActiveIndex(2)}
                >{soundTwo ? soundTwo.name : 'Empty'}</button>
                <button
                    className={activeIndex === 3 ? 'btn-active btn-playing' : 'btn-playing'}
                    onClick={() => activeIndex === 3 ? setActiveIndex(null) : setActiveIndex(3)}
                >{soundThree ? soundThree.name : 'Empty'}</button>
                <button
                    className={activeIndex === 4 ? 'btn-active btn-playing' : 'btn-playing'}
                    onClick={() => activeIndex === 4 ? setActiveIndex(null) : setActiveIndex(4)}
                >{soundFour ? soundFour.name : 'Empty'}</button>
            </>
            :
            <>
                <button
                    className={activeIndex === 1 ? 'btn-active' : ''}
                    onClick={() => activeIndex === 1 ? setActiveIndex(null) : setActiveIndex(1)}
                >{soundOne ? soundOne.name : 'Empty'}</button>
                <button
                    className={activeIndex === 2 ? 'btn-active' : ''}
                    onClick={() => activeIndex === 2 ? setActiveIndex(null) : setActiveIndex(2)}
                >{soundTwo ? soundTwo.name : 'Empty'}</button>
                <button
                    className={activeIndex === 3 ? 'btn-active' : ''}
                    onClick={() => activeIndex === 3 ? setActiveIndex(null) : setActiveIndex(3)}
                >{soundThree ? soundThree.name : 'Empty'}</button>
                <button
                    className={activeIndex === 4 ? 'btn-active' : ''}
                    onClick={() => activeIndex === 4 ? setActiveIndex(null) : setActiveIndex(4)}
                >{soundFour ? soundFour.name : 'Empty'}</button>
            </>
            }
        </div>
                <SoundAccordion 
                    hidden={activeIndex === null}
                    sounds={sounds}
                    activeIndex={activeIndex}
                    setActiveIndex = {setActiveIndex}
                    selectedSounds={selectedSounds}
                    setSelectedSounds={setSelectedSounds}
                    soundOne={soundOne}
                    fxOne={fxOne}
                    soundTwo={soundTwo}
                    fxTwo={fxTwo}
                    soundThree={soundThree}
                    fxThree={fxThree}
                    soundFour={soundFour}
                    fxFour={fxFour}
                    setSoundOne={setSoundOne}
                    setFxOne={setFxOne}
                    setSoundTwo={setSoundTwo}
                    setFxTwo={setFxTwo}
                    setSoundThree={setSoundThree}
                    setFxThree={setFxThree}
                    setSoundFour={setSoundFour}
                    setFxFour={setFxFour}
                    setBroadcastOne={setBroadcastOne}
                    broadcastOne={broadcastOne}
                />
            
        </section>
    )
}

export default SoundEditor  