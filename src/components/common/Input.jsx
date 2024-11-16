const Input = ({ 
    label, 
    id, 
    error, 
    className = '', 
    type = 'text',
    required = false,
    ...props 
}) => {
    return (
        <div className="space-y-1">
            {label && (
                <label 
                    htmlFor={id} 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={id}
                type={type}
                required={required}
                className={`
                    w-full px-3 py-2 border rounded-md shadow-sm
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default Input;