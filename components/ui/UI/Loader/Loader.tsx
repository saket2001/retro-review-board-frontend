import React from 'react'
import "./Loader.css"

export const Loader = (props: { text?: string }) => {
    return (
        <div className="w-full h-full z-50 fixed inset-0 bg-gray-900 flex flex-col justify-center items-center top-0 left-0 bg-opacity-50">
            <div className="flex flex-col justify-center items-center w-full gap-y-3">
                <span className="loader relative opacity-100"></span>
                <p className="text-lg text-gray-200 opacity-100">
                    {props.text && props.text?.length > 0 ? props.text : "Loading Please Wait..."}
                </p>
            </div>
        </div>
    )
}
