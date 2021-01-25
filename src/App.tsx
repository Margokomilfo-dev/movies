import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './App.module.sass'
import API from './api'
import Button from '@material-ui/core/Button/Button'
import { TextField } from '@material-ui/core'

export type MovieType = {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}

function App() {
    const [searchName, setSearchName] = useState('')
    const [searchResult, setSearchResult] = useState<Array<MovieType>> ([])
    const [error, setError] = useState<string>('')

    console.log(searchResult)
    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
            .then(res => {
                if (res.data.Response === 'True') {
                    setSearchResult(res.data.Search)
                    setSearchName('')
                } else {
                    setError(res.data.Error)
                }
            })
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setSearchResult([])
        setSearchName(e.currentTarget.value)
    }
    const enterDone = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchFilm()
        }
    }

    return (
        <div className={s.app}>
            <h1>Search movies: </h1>
            <div className={s.container}>

                <div className={s.formEls}>
                    <h3>by title:</h3>
                    <div className={s.inp}>
                        <TextField id="outlined-helperText" label="Movies name" placeholder="name"
                                   variant="outlined" value={searchName} onChange={onChangeInput}
                                   onKeyPress={enterDone}
                        />

                    </div>

                    <Button variant="contained" color="secondary" onClick={searchFilm}>
                        Search
                    </Button>

                </div>
                <div className={s.result}>
                    {error
                        ? <span className={s.err}>{error}</span>
                        : (searchResult.length && !error)
                            ? searchResult.map(movie => <div>{movie.Title}</div>)
                            : 'Result will be here!'}
                </div>

            </div>
        </div>
    )
}

export default App
