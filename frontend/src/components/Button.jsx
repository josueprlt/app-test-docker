import { IconArrow } from "./icons";

const Button = ({ children, href = null, blank = false, icon = "arrow" }) => {

    const classBtn = "flex items-center gap-1 px-2 text-xs font-semibold bg-blue-500 text-blue-300 rounded hover:bg-blue-600 transition cursor-pointer";

    const iconBtn = {
        arrow: <IconArrow className="h-4" />,
    }

    if (href) {
        return (
            <a href={href} target={blank ? '_blank' : ''} className={classBtn}>
                {children}
                {iconBtn[icon]}
            </a>
        );
    } else {
        return (
            <button className={classBtn} type="button">
                {children}
            </button>
        );
    }
};

export default Button;