import { useState, useEffect } from 'react'

const useFetch = (url, method, headers) => {

    const [data, setData] = useState('');
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState('');


    


    useEffect(() => {

        const abortCont = new AbortController();
        async function fetchData() {
            try {
                const res = await fetch(url, {
                    method: method,
                    headers: headers,
                    signal: abortCont.signal
                });
                
                const gyms = await res.json();

                if (!res.ok) {
                    throw new Error(gyms.message || "unknow error");
                }
                setData(gyms);
                setPending(false)
                setError(null)
                
            }
            catch (e) {
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted')
                    setError('fetch aborted')
                    setPending(false);
                }
                else {
                    setPending(false);
                    setError(e.message);
                    
                }
            }
        }
        fetchData();
        return () => { abortCont.abort() };

    }, [url]);



    return { data, isPending, error };
}

export default useFetch;