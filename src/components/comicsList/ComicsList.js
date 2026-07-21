import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/error';
import Spinner from '../spinner/spinner';
import './comicsList.scss'
import { Link } from 'react-router-dom';
import episodesImg from '../../resources/img/episodes.webp'
const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
            break;
        case 'confirmed':
            return <Component />;
            break;
        case 'error':
            return <ErrorMessage />
            break;
        default:
            throw new Error("Unexpected process state")
    }
}



const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { error, loading, getAllComics, process, setProcess } = useMarvelService();
    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        //onCharListLoading()
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 20) {
            ended = true;
        }
        // this.setState(({ offset, charList }) => ({
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 1,
        //     charEnded: ended
        // }))
        setComicsList(prev => [...prev, ...newComicsList]);
        //setLoading(loading => false)
        setNewItemLoading(false)
        setOffset(offset => offset + 1)
        setComicsEnded(ended)
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/episodes/${item.id}`}>
                        <img src={episodesImg} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.name} {item.episode}</div>
                        <div className="comics__item-name">{item.air_date} </div>
                        {/* <div className="comics__item-price">{item.price}</div> */}
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comicsList);

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemLoading ? <Spinner /> : null;
    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            {/* {errorMessage}
            {spinner}
            {items} */}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;