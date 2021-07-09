import { useState, useEffect } from "react"

/*       NB: il custom hook deve iniziare con use !!!       */

const useFetch = (url) => {

    let [isLoading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let [data, setData] = useState(null)

    useEffect(() => {
        console.log('use effect in useFetch')

        const abortCtrl = new AbortController()

        setLoading(true)
        fetch(url, { signal: abortCtrl.signal })
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch data for that rsource')
                }
                return response.json()
            })
            .then(data => {
                setLoading(false)
                setData(data)
                setError(null)
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    console.error(error.message)
                    setLoading(false)
                    setError(error.message)
                }
            })

        return () => {
            abortCtrl.abort()
            console.log('cleanup')
        }
    }, [url])   // tutte le volte che cambia l'url si deve 

    return {
        isLoading, error, data, setData
    }
}

export default useFetch