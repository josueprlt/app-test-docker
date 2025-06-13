const Input = ({ label, type, placeholder, color = "default", required = false }) => {

    const classInput = {
        default: "p-1 border-1 border-gray-500 text-gray-500 bg-gray-300 max-w-3xs",
        red: "text-red-500 bg-red-300",
    }

    return (
        <>
            <label
                className={`p-1 ${required ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ""}`}
                htmlFor={label}
            >
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={label}
                    name={label}
                    placeholder={placeholder}
                    required={required}
                    className={classInput[color]}
                ></textarea>
            ) : (
                <input
                    type={type}
                    id={label}
                    name={label}
                    placeholder={placeholder}
                    required={required}
                    className={classInput[color]}
                />
            )}
        </>
    );
};

export default Input;