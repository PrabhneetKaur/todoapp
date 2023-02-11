import { useEffect, useState } from "react";

const ActionPalette = ({totalTasks, completedTasks}) => {
    const [actionState, setActionState] = useState(false);

    useEffect(() => {}, [totalTasks, completedTasks]);

    const changeActionState = (state) => {
        setActionState(state);
    };

    return (
        <section className={`action-palette self-start flex flex-col items-center sticky top-0 p-4 min-h-screen bg-gray-dark-600 ${actionState ? 'w-96' : 'w-20'} transition-[width] duration-1000`}>
            <button 
                onClick={() => changeActionState(!actionState)} 
                className={`h-14 ${actionState ? 'w-48 text-4xl' : 'pl-3 w-14 rounded-full text-5xl tracking-[1rem]'} overflow-hidden hover:bg-gray-dark-500 text-orange-dark font-bold transition-all duration-1000`}
            >
                todo.app
            </button>
            <div className={`my-6 mx-auto ${actionState ? 'w-48' : 'w-12'} border-b border-orange-dark transition-[width] duration-1000`}></div>
            <div className={`mt-8 min-w-max text-2xl text-orange-dark ${actionState ? 'translate-x-0' : '-translate-x-64'} transition-transform duration-1000`}>Task summary</div>
            <div className="flex justify-center items-center relative h-48 w-full">
                <div className={`absolute text-4xl text-orange-dark ${actionState ? 'translate-x-0' : '-translate-x-64'} transition-transform duration-1000`}>
                    <h2>{Math.round(completedTasks / Math.max(totalTasks, 1) * 100)}<span className="ml-1 text-2xl">%</span></h2>
                </div>
                <svg className="h-full w-full">
                    <circle style={{fill: 'none', strokeWidth: '8', strokeDasharray: '440', strokeLinecap: 'round', strokeDashoffset: '0', stroke: 'rgb(72,72,74)'}} cx="176" cy="96" r="70"></circle>
                    <circle style={{fill: 'none', strokeWidth: '8', strokeDasharray: '440', strokeLinecap: 'round', strokeDashoffset: `${440 - (440 * (completedTasks / Math.max(totalTasks, 1)))}`, stroke: 'rgb(255,159,10)'}} cx="176" cy="96" r="70"></circle>
                </svg>
            </div>
            <div className={`relative w-72 ${actionState ? 'translate-x-0' : '-translate-x-72'} place-self-start p-8 text-lg text-orange-dark transition-transform duration-1000`}>
                <div>Total tasks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalTasks}</div>
                <div>Completed tasks&nbsp;&nbsp;&nbsp;{completedTasks}</div>
                <div>Pending tasks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalTasks - completedTasks}</div>
            </div>
        </section>
    );
};

export default ActionPalette;