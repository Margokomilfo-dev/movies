import React, { useState } from 'react'
import './App.css'
import API from './api'

function App() {
    const [searchName, setSearchName] = useState('');
    const [serachResult, setSerachResult] = useState('');

    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
            .then(res => {
                if (res.data.Response === 'True') {
                    setSerachResult(JSON.stringify(res.data.Search))
                } else {
                    setSerachResult(JSON.stringify(res.data.Error))
                }
            })
    };
    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={(e) => setSearchName(e.currentTarget.value)} />
                <button onClick={searchFilm}>Search</button>
                <div>
                    {serachResult}
                </div>
            </div>
        </div>
    )
}

export default App
