import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IconPlay, IconPause } from "./icons";
import SyncLoader from "react-spinners/SyncLoader";
import MoonLoader from "react-spinners/MoonLoader";
import ChipDate from "./ChipDate";
import LaunchOption from "./LaunchOption";
import Button from "./Button";

const InfoOptionLaunch = ({ optionsChoice }) => {

    return (
        <section className='rounded-md border border-gray-600'>
            {optionsChoice.map((option, index) => (
                index === 0 || index === optionsChoice.length - 1
                ? <span className='px-1'>{option}</span>
                : <span className='px-1 border-l border-r border-gray-600'>{option}</span>
            ))}
        </section>
    );
};

export default InfoOptionLaunch;