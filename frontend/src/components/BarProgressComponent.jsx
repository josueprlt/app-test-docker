const BarProgressComponent = ({ logs }) => {
    return (
        <>
            {/* <section className="flex gap-[2px] h-[18px] rounded-full overflow-hidden">
                {(success === null || success === 0) && (errors === null || errors === 0) ? (
                    <div className="w-full h-full bg-white-500"></div>
                ) : (
                    <>
                        {Array.from({ length: success }, (_, index) => (
                            <div key={`success-${index}`} className="w-full h-full bg-green-500"></div>
                        ))}
                        {Array.from({ length: errors }, (_, index) => (
                            <div key={`error-${index}`} className="w-full h-full bg-red-500"></div>
                            ))}
                            </>
                            )}
            </section> */}

            <section className="flex gap-[2px] h-[18px] rounded-full overflow-hidden">
                {(logs.length < 1) ? (
                    <div className="w-full h-full bg-orange-500"></div>
                ) : (
                    <>
                        {logs.map((log, index) => (
                            log.success === true ? (
                                <div key={`success-${index}`} className="w-full h-full bg-green-500"></div>
                            ) : (
                                <div key={`error-${index}`} className="w-full h-full bg-red-500"></div>
                            )
                        ))}
                    </>
                )}
            </section>
        </>
    );
};

export default BarProgressComponent;