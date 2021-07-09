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
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000'
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
                    class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Author:</label>
                <div className="relative inline-block w-full text-gray-700">
                    <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                        <option value="Lorenzo">Lorenzo</option>
                        <option value="Chiara">Chiara</option>
                        <option value="Luce">Luce</option>
                        <option value="Gloria">Gloria</option>
                        <option value="Mimma">Mimma</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </div>
                </div>

                <label>Body:</label>
                <textarea
                    className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required />

                <button disabled={isLoading}
                    className="rounded-full mt-8 py-3 px-2 uppercase text-xs font-bold tracking-wider cursor-pointer mr-4 bg-red-500 text-gray-800"
                >Add item</button>

                {error && <div
                    className="px-4 py-3 leading-normal text-red-100 bg-red-900 rounded-lg" role="alert">
                    <p>{error}</p>
                </div>}

                {isLoading && <div className="flex">
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
            </form>
        </div>
    );
}

export default Create;