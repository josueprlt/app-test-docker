const BarProgressComponent = ({logs}) => {
    return (
        <>
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