import {IconBack} from "../icons.jsx";
import {Link} from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

export const Header = ({ selectData, data, outputDate }) => {
    return (
        <section>
            <div className="flex flex-row gap-2">
                <Link to="/"
                      className="p-2 flex justify-center items-center rounded-md bg-white-500 shadow w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] hover:bg-gray-300">
                    <IconBack className="h-7 rotate-180 sm:h-8 md:h-9"/>
                </Link>
                <div className="w-full flex justify-center items-center rounded-md bg-white-500 shadow">
                    {data === null ? (
                        <SyncLoader color="#3C3C3C" size={8}/>
                    ) : (
                        <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">{selectData ? selectData[0].name : data.name}</h1>
                    )}
                </div>
            </div>
            <div className="w-full p-2 rounded-md bg-white-500 shadow mt-2">
                {outputDate === null && data === null ? (
                    <SyncLoader color="#3C3C3C" size={8}/>
                ) : (
                    <>
                        <p className='mb-5'>{selectData ? selectData[0].description : data.description}</p>
                        <Link to="testest" className='text-blue-500 underline'>url de test</Link>
                        <p>Rapport généré {outputDate}</p>
                    </>
                )}
            </div>
        </section>
    );
};