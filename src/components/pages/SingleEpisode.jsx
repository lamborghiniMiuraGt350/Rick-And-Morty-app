import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";

// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../error/error';
// import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';
import { AppBanner } from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import episodeImg from '../../resources/img/episode.jpg';
import './SingleEpisode.scss';


const SingleComicPage = () => {
    const { episodeId } = useParams()

    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([])
    const { error, loading, getComics, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateEpisode();
    }, [episodeId])

    const updateEpisode = () => {
        clearError();
        getComics(episodeId)
            .then(onEpisodeLoaded).then(() => setProcess('confirmed'))
    }
    const onEpisodeLoaded = (episode) => {

        setEpisode(episode)


        if (episode?.characters?.length) {
            Promise.all(
                episode.characters.map(url =>
                    fetch(url).then(res => res.json())
                )
            ).then(response => {
                setCharacters(response)
            }).catch(err => console.log(err))
        }

    }
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !episode) ? <View characters={characters} episode={episode} /> : null;

    return (
        <>
            {setContent(process, View, episode, characters)}
            {/* {errorMessage}
            {spinner}
            {content} */}
        </>
    )
}

const View = ({ data, episode: characters }) => {
    const { name, id, air_date } = data;
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} episode`}
                />
                <title>{name}</title>
            </Helmet>
            <AppBanner />
            <div className="single-comic">
                <img src={episodeImg} alt="x-men" className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">#{id} Episode name: {name}</h2>
                    <p className="single-comic__descr">Date: {air_date}</p>
                    <p className="single-comic__descr">{data.episode}</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">9.99$</div>
                    <ul className="char__comics-list">
                        <li>Characters:</li>
                        {
                            characters.map((item, i) => {

                                if (i > 19) return;
                                return (
                                    <li key={i} className="char__comics-item">
                                        #{item.id} <b>Character name:</b> {item.name} <b>Status:</b> {item.status}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Link to="/episodes" className="single-comic__back">Back to all</Link>
            </div></>
    )
}

export default SingleComicPage;




