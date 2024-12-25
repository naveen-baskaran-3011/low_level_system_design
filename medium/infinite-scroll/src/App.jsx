import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
export default function App() {
    const [page, setPage] = useState(1);
    const [res, setRes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const lastRef = useRef(null);

    useEffect(() => {
        let intersectionObserver
        if(!isLoading) {
            intersectionObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting && res.length !== 5000)
                    setPage(prev => prev + 1);
            });
    
            intersectionObserver.observe(lastRef.current);
        }

        return () => intersectionObserver && intersectionObserver.unobserve(lastRef.current);
    }, [res, isLoading]);

    useEffect(() => {
        let abortController = new AbortController();
        setIsLoading(true);
        axios({
            url: 'https://jsonplaceholder.typicode.com/photos',
            method: 'get',
            params: { _page: page, _limit: 1000 },
            signal: abortController.signal
        }).then((res) => {
            setIsLoading(false);
            setRes(prev => [...(new Set([...prev, ...res.data.map(el => el.title)]))]);
        });

        return () => abortController && abortController.abort && abortController.abort();
    }, [page]);

    return <div>
        {res.map((el, idx) => (
            <div
                style={{
                    padding: '10px',
                    margin: '10px',
                    border: '1px solid'
                }}
                key={idx}
                ref={idx === res.length - 1 ? lastRef : null}
            >
                {el}
            </div>
        ))}
        {isLoading && <div>Loading</div>}
    </div>
}