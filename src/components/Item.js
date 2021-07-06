import { useState } from "react";

import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

import useFetch from "../hooks/useFetch";

const Item = () => {

    const { id } = useParams()

    const { data: item, isLoading, error } = useFetch(`http://localhost:8000/items/${id}`)

    const [isLoadingDelete, setLoadingDelete] = useState(false)
    const [errorDelete, setErrorDelete] = useState(null)

    const history = useHistory()

    const handleDeleting = (e) => {
        e.preventDefault() // no page refresh
        setLoadingDelete(true)
        fetch(`http://localhost:8000/items/${id}`, { method: 'DELETE'})
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
        <div className="item">
            <h3>Detail: <span>{id}</span></h3>

            {item && (
                <div>
                    <h2>{item.title}</h2>
                    <h4>{item.author}</h4>
                    <p>{item.body}</p>
                </div>
            )}
            <button onClick={handleDeleting}> Cancel item</button>

            {(error || errorDelete) && <div>{error}</div>}

            {(isLoading || isLoadingDelete) && <div>...loading</div>}
        </div>
    );
}

export default Item;