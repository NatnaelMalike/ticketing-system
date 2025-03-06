import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropDownProps {
    values: string[];
    onChange: (value: string) => void;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
}

function DropDown(props: DropDownProps) {
    const containerStyle : string = `
        rounded-xl shadow-full-lg
        absolute transition-all bg-white 
        overflow-hidden z-50
        `;

    const openStyle : string = "pointer-events-auto opacity-100 translate-y-5";
    const closedStyle : string = "pointer-events-none opacity-0 -translate-y-4";

    const myRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const motherRef = useRef<HTMLDivElement>(null);

    const [current, setCurrent] = useState<string | null>(props.defaultValue ?? null);
    const [open, setOpen] = useState<boolean>(false);
    const [currentStyle, setCurrentStyle] = useState<string>(containerStyle + closedStyle);
    const [containerPosition, setContainerPosition] = useState<string>("");
    
    function getLeft() : string {
        if (myRef.current) {
            const rect = myRef.current.getBoundingClientRect();
            const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const leftSpace = rect.left;
            const rightSpace = viewWidth - rect.right;
            if (leftSpace > rightSpace) {
                return " right-0";
            }
            return " left-0";
        }
        console.log("no ref");
        return "";
    }

    function getTop() : string {
        if (myRef.current && containerRef.current) {
            const rect = myRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const bottomSpace = viewHeight - rect.bottom;

            if (bottomSpace < containerRect.height + 64) {
                return " bottom-[calc(100%+2.5rem)]";
            }

            return " top-[calc(100%+0rem)]";
        }
        return "";
    }

    const handleContainerClick = () => {
        if(open) {
            setOpen(false);
            setCurrentStyle(containerStyle + closedStyle);
            return;
        }
        setContainerPosition(getLeft() + getTop());
        setOpen(true);
        setCurrentStyle(containerStyle + openStyle);
    };

    const handleOptionClick = (value: string) => {
        setCurrent(value);
        props.onChange(value);
        setOpen(false);
    };

    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!motherRef.current?.contains(target) && !(motherRef.current === target)) {
            setCurrentStyle(containerStyle + closedStyle);
            setOpen(false);
            return;
        }
    
    });


    return (
        <div ref={motherRef} className={"select-none"}>
            <div
                tabIndex={0}
                data-dropdown="true"
                onClick={() => { handleContainerClick(); }}
                className={`pl-8 pr-4 py-2 bg-gray-100 group 
                        cursor-pointer text-left focus:outline
                        focus:outline-blue-300 
                    ` }>

                <span data-dropdown="true" className="w-max">{current ?? props.placeholder ?? "Select an option"}</span>

                <FiChevronDown 
                    data-dropdown="true" 
                    className={`
                        inline-block transition-all ${open ? "rotate-180" : ""}
                        text-right w-8 float-right mt-[.15rem] text-xl font-bold
                        `}
                />

                <div className="relative z-10" ref={myRef}>
                    <div
                        ref={containerRef}
                        className={currentStyle + containerPosition}>
                        {
                            props.values.map((value, index) => {
                                return (
                                <div
                                    key={index}
                                    tabIndex={0}
                                    onClick={() => { handleOptionClick(value); }}
                                    className={`
                                        px-8 py-2 text-sm text-left hover:bg-gray-200
                                        cursor-pointer min-w-[10rem] font-semibold z-50
                                        ` + (value === current ? "border-l-[.5rem] pl-6 border-blue-400" : "")}
                                >
                                    <span className="z-50">
                                        {value}
                                    </span>
                                </div>);
                            })
                        }
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default DropDown;