// class MarvelService {
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//   
//     _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';

//     getResource = async (url) => {
//         let res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }

//         return await res.json();
//     }

//     getAllCharacters = () => {
//         return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
//     }

//     getCharacter = (id) => {
//         return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
//     }
// }

// export default MarvelService;

import { useHttp } from "../hooks/http.hook";
const _apiBase = 'https://rickandmortyapi.com/api/';
const _baseOffset = 1;
const useMarvelService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp()

    // getResource = async (url) => {
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}episode?page=${offset}`);
        //return res.results.map(_transformCharacter);
        return res.results;
    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}episode/${id}`);
        return res;
    }
    const getAllCharacters = async (offset = _baseOffset) => {
        //const res = await getResource(`${_apiBase}character?page=${offset}`);
        const res = await request(`${_apiBase}character?page=${offset}`);
        return res.results.map(_transformCharacter);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}character?name=${name}`);
        console.log(res.results[0]);
        return res.results[0];
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}character/${id}`);
        return _transformCharacter(res);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            status: char.status === 'unknown' ? 'There is no description for this character' : char.status,
            thumbnail: char.image,
            homepage: char.url,
            wiki: char.episode[0],
            episodes: char.episode,
        }
    }
    return {
        loading,
        error,
        getComics,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getCharacterByName,
        process,
        setProcess
    }
}

export default useMarvelService;



// const response = await fetch('https://rickandmortyapi.com/api/character');
// const data = await response.json();
// console.log(data.results[0]);


// characters.forEach(character => {
//   console.log(character); // имя персонажа
// });