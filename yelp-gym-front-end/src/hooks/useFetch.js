import { useState, useEffect } from 'react'

const useFetch = (url, method, headers) => {

    const [data, setData] = useState('');
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState('');


    const abortCont = new AbortController();
    async function fetchAllGyms() {
        const res = await fetch(url, {
            method: method,
            headers: headers,
            signal: abortCont.signal
        });
        return await res.json();
    }

    useEffect(() => {


        async function doStuff() {
            try {
                const gyms = await fetchAllGyms();
                setData(gyms);
                setPending(false)
                setError(null)
                return () => { abortCont.abort() };
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
                    console.log(e);
                }
            }
        }
        doStuff();
        

    }, [url]);



    return { data, isPending, error };
}

export default useFetch;