import { useState, useEffect } from "react";
import { IconCheck, IconCross, IconBack, IconWarn } from "../icons";
import { DiffBetweenTwoDates } from "../../utils/DiffBetweenTwoDates";
import ChipDate from "../ChipDate";
import { Link } from "react-router";
import MoonLoader from "react-spinners/MoonLoader";

const PlanElement = () => {
    return (
        <Link className={`flex justify-between gap-4 rounded-md overflow-hidden bg-gray-500 cursor-pointer hover:bg-gray-300`}>
            
        </Link>
    );
};

export default PlanElement;