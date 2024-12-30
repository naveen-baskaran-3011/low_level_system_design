import { useEffect, useRef, useState } from "react";
import './TypeAheadOffline.css';

export default function TypeAheadOnline() {
    const [usrInputValue, setUsrInputValue] = useState('');
    const [suggestionList, setSuggestionList] = useState([]);
    const [focusId, setFocusId] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    const debounceTimer = useRef(null);

    return <div style={{
        flexBasis: "50%"
    }}>
        Online
        <input
            style={{
                width: "100%"
            }}
            onChange={(event) => {
                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current);
                }
                setShowLoader(true);

                if(event.target.value.length > 0) {
                    debounceTimer.current = setTimeout(async () => {
                        const response = await fetch(
                            `https://api.github.com/search/users?per_page=5&q=${event.target.value}`
                        );
    
                        if (response.status === 200) {
                            const data = await response.json();
                            setSuggestionList(data.items.map(el => el.login));
                            setShowLoader(false);
                        }
                    }, 300);
                } else {
                    setSuggestionList([]);
                    setShowLoader(false);
                }

                setFocusId(null);
                setUsrInputValue(event.target.value)
            }}
            onKeyDown={event => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setFocusId(prevFocusId => {
                        if (prevFocusId === null || prevFocusId === suggestionList.length - 1) {
                            return 0;
                        }

                        return ++prevFocusId;
                    });
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setFocusId(prevFocusId => {
                        if (prevFocusId === null || prevFocusId === 0) {
                            return suggestionList.length - 1;
                        }

                        return --prevFocusId;
                    });
                } else if (event.key === 'Enter' && focusId !== null) {
                    event.preventDefault();
                    setUsrInputValue(suggestionList[focusId]);
                    setSuggestionList([]);
                    setFocusId(null);
                }
            }}
            type="search"
            value={usrInputValue} />

        <div className="suggestions-list">
            {showLoader ? 'Loading...' : suggestionList.length > 0 && <ul>
                {suggestionList.map((filteredSuggestion, index) => (
                    <li
                        onMouseOver={() => {
                            setUsrInputValue(filteredSuggestion);
                            setFocusId(index);
                        }}
                        onClick={() => {
                            setFocusId(null);
                            setUsrInputValue(filteredSuggestion);
                            setSuggestionList([]);
                        }}
                        key={filteredSuggestion}
                        className={`suggestion ${focusId === index && 'focused'}`}>{filteredSuggestion}</li>
                ))}</ul>}
        </div>
    </div>
}