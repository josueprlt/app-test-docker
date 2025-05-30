
const InfoOptionLaunch = ({ optionsChoice }) => {
    console.log(optionsChoice);
    return (
        <>
            {
                optionsChoice.length > 1 && (
                    <section className='flex items-center rounded-md border border-gray-600'>
                        {optionsChoice.map((option, index) => (
                            index === 0 || index === optionsChoice.length - 1
                                ? <span key={index} className='h-full px-1'>{option}</span>
                                : <span key={index} className='h-full px-1 border-l border-r border-gray-600'>{option}</span>
                        ))}
                    </section>
                )
            }
        </>
    );
};

export default InfoOptionLaunch;