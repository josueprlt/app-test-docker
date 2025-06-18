import {IconBack} from "../icons.jsx";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <section>
            <div className="flex flex-row gap-2">
                <Link to="/"
                      className="p-2 flex justify-center items-center rounded-md bg-white-500 shadow w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] hover:bg-gray-300">
                    <IconBack className="h-7 rotate-180 sm:h-8 md:h-9"/>
                </Link>
                <div className="w-full flex justify-center items-center rounded-md bg-white-500 shadow">
                    <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">Batterie de
                        tests</h1>
                </div>
            </div>
        </section>
    );
};