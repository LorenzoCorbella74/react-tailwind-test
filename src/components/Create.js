import { useState } from "react";

import { useHistory } from "react-router";

const Create = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Lorenzo')

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault() // no page refresh
        const item = { title, author, body }
        setLoading(true)
        fetch('http://localhost:8000/items', {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json', 
                'Access-Control-Allow-Origin':'http://localhost:8000'
            },
            body: JSON.stringify(item)
        })
        .then(response => {
            if (!response.ok) {
                throw Error('Could not fetch data for that rsource')
            }
            return response.json()
        }).then(data => {
            setLoading(false)
            setError(null)
            console.log('item created')
            // history.goBack()
            // history.go(-1)
            history.push("/")
        }).catch(error => {
            setError(error.message)
            setLoading(false)
            console.error(error.message)
        })
    }

    return (
        <div className="create">
            <h4>Create item:</h4>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Lorenzo">Lorenzo</option>
                    <option value="Chiara">Chiara</option>
                    <option value="Luce">Luce</option>
                    <option value="Gloria">Gloria</option>
                    <option value="Mimma">Mimma</option>
                </select>

                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required />

                <button disabled={isLoading}>Add item</button>

                {error && <div>{error}</div>}

                {isLoading && <div>...loading</div>}
            </form>
        </div>
    );
}

export default Create;