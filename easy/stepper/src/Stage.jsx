const IconTick = (props) => (
    <svg
        width="1em"
        height="1em"
        fill="currentColor"
        baseProfile="tiny"
        viewBox="0 0 24 24"
    >
        <path d="M11 20a2.978 2.978 0 0 1-2.121-.879l-4-4C4.312 14.555 4 13.801 4 13s.312-1.555.879-2.122c1.133-1.133 3.109-1.133 4.242 0l1.188 1.188 3.069-5.523a2.999 2.999 0 0 1 5.507.632 2.975 2.975 0 0 1-.263 2.282l-5 9A3.015 3.015 0 0 1 11 20zm-4-8c-.268 0-.518.104-.707.293S6 12.732 6 13s.104.518.293.707l4 4a1.002 1.002 0 0 0 1.581-.221l5-9a.993.993 0 0 0 .088-.76.992.992 0 0 0-.478-.6 1.015 1.015 0 0 0-1.357.388l-4.357 7.841-3.062-3.062A.996.996 0 0 0 7 12z" />
    </svg>
);


export default function Stage({ currentStageIndex, stageConfig, index, onClick }) {
    let classToApply = 'number';
    let completed = index < currentStageIndex;
    if (index === currentStageIndex) {
        classToApply += ' current-stage'
    } else if (completed) {
        classToApply += ' completed'
    }

    return <div key={stageConfig.id} className='stage' onClick={onClick}>
        <div className={classToApply}>
            {completed ? <IconTick /> : stageConfig.id}
        </div>
        <div className="label">
            {stageConfig.name}
        </div>
    </div>;
}