/* eslint-disable react/prop-types */
export default function Container({ children }) {
    return (
        <div className="w-full mx-auto px-4">
            {children}
        </div>
    )
}