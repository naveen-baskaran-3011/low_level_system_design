const Accordian = ({ config, onClick }) => {
    return <div className="accordian-container">
        <div className="heading">
            {config.heading}
            <span className="symbol" onClick={onClick}>
                {config.show ? '-' : '+'}
            </span>
        </div>
        {config.show && <div className="content">
            {config.content}
        </div>}
    </div>
};

export default Accordian;