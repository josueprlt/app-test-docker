import { IconArrow } from "./icons";

const Button = ({ children, href = "", onClick = () => {}, blank = false, icon = "arrow", className = "", type = "button" }) => {
    
    const classBtn = "flex items-center gap-1 px-2 font-semibold bg-blue-500 text-blue-300 rounded hover:bg-blue-600 transition cursor-pointer";

    const iconBtn = {
        arrow: <IconArrow className="h-4" />,
        hidden: ''
    };

    if (href === "") {
        return (
            <button
                onClick={onClick}
                className={`${classBtn} ${className}`}
                type={type}
            >
                {children}
                {iconBtn[icon]}
            </button>
        );
    } else {
        return (
            <a
                href={href}
                target={blank ? '_blank' : undefined}
                className={`${classBtn} ${className}`}
            >
                {children}
                {iconBtn[icon]}
            </a>
        );
    }
};

export default Button;