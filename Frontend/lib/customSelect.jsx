import { useState,useRef,useEffect } from "react";

export default function CustomSelect({ value,onChange,options,className="" }) {
    const [open,setOpen]=useState(false);
    const ref=useRef(null);

    useEffect(()=>{
        const handleClick=(e)=>{
            if(ref.current&&!ref.current.contains(e.target)){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown",handleClick);
        return()=>document.removeEventListener("mousedown",handleClick);
    },[]);

    const selected=options.find((option)=>String(option.value)===String(value));

    return(
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={()=>setOpen(!open)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 flex items-center gap-2"
            >
                {selected?.label}
            </button>

            {open&&(
                <div className="absolute right-0 top-full mt-2 min-w-full bg-white border border-gray-100 rounded-xl shadow-lg p-1 z-50 overflow-hidden">
                    {options.map((option)=>(
                        <button
                            key={option.value}
                            type="button"
                            onClick={()=>{
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-1 py-2 text-sm rounded-lg transition-all duration-150 ${
                                String(value)===String(option.value)
                                    ?"bg-amber-300 text-neutral-700 font-medium"
                                    :"text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}