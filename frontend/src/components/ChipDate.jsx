import { IconCalendar, IconCross, IconCheck, IconCollection, BracketArrow } from "./icons";

const ChipDate = ({ txt, color = "blue", direction = "left", icon = "calendar", className = "" }) => {

    const classColor = {
        blue: "text-blue-500 bg-blue-300",
        green: "text-green-500 bg-green-300",
        orange: "text-orange-500 bg-orange-300",
        red: "text-red-500 bg-red-300",
        black: "text-gray-500 bg-black-500",
    }

    const colorIcon = {
        blue: "#3E87F6",
        green: "#00B521",
        orange: "#eba800",
        red: "#EB0000",
        black: "#ffffff",
    }

    const colorBracket = {
        blue: "#E7F0FE",
        green: "#E7FEEF",
        orange: "#fef5e7",
        red: "#FEE7E7",
        black: "#000000",
    }

    const directionBracket = {
        left: "absolute -left-[6px]",
        right: "absolute -right-[6px] rotate-180",
        hidden: "hidden",
    }

    const chipIcon = {
        calendar: <IconCalendar fill={colorIcon[color]} />,
        cross: <IconCross className="w-3 h-3" />,
        check: <IconCheck className="w-3 h-3" />,
        collection: <IconCollection className="w-3 h-3" fill={colorIcon[color]} />,
        hidden: '',
    }

    return (
        <span className={`relative flex flex-row items-center w-max gap-2 text-xs font-semibold ${classColor[color]} ${className === '' ? 'rounded-md px-2 py-1' : className}`}>
            {chipIcon[icon]}
            <p>{txt}</p>
            <BracketArrow fill={colorBracket[color]} className={directionBracket[direction]} />
        </span>
    );
};

export default ChipDate;