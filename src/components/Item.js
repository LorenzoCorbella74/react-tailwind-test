import { useState } from "react";

import { useParams, useHistory } from "react-router-dom";

import useFetch from "../hooks/useFetch";

const Item = () => {

    const { id } = useParams()

    const { data: item, isLoading, error } = useFetch(`http://localhost:8000/items/${id}`)

    const [isLoadingDelete, setLoadingDelete] = useState(false)
    const [errorDelete, setErrorDelete] = useState(null)

    const history = useHistory()

    // DELETE
    const handleDeleting = (e) => {
        e.preventDefault() // no page refresh
        setLoadingDelete(true)
        fetch(`http://localhost:8000/items/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not delete that resource')
                }
                return response.json()
            }).then(data => {
                setLoadingDelete(false)
                setErrorDelete(null)
                console.log('item deleted')
                history.push("/")
            }).catch(error => {
                setErrorDelete(error.message)
                setLoadingDelete(false)
                console.error(error.message)
            })
    }

    return (
        <div className="">

            {item && (
                <div>
                    <h1 className="text-gray-700 text-2xl font-bold mb-8">ID: <span>{id}</span></h1>
                    <h2 className="text-gray-700 text-xl font-bold">{item.title}</h2>
                    <h4 className="text-gray-400 text-lg mb-4">Author: {item.author}</h4>
                    <p>{item.body}</p>
                    <button
                        className="rounded-full mt-8 py-3 px-2 uppercase text-xs font-bold tracking-wider cursor-pointer mr-4 bg-red-500 text-gray-800"
                        onClick={handleDeleting}>
                        <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                        Cancel item</button>
                </div>
            )}

            {(error || errorDelete) && <div
                className="px-4 py-3 leading-normal text-red-100 bg-red-700 rounded-lg" role="alert">
                <p>A simple alert with text and an icon. Check it out!</p>{error}</div>}

            {(isLoading || isLoadingDelete) && <div className="flex">
                <span>
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        className="w-6 h-6" viewBox="0 0 50 50">
                        <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                            <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 25 25"
                                to="360 25 25"
                                dur="0.6s"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                </span>
                <span className="ml-4">
                    ...loading
                </span>
            </div>}
        </div>
    );
}

export default Item;