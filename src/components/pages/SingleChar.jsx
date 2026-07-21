import { useParams, Link } from 'react-router-dom'
import './SingleEpisode.scss'
import { useEffect, useState } from 'react';

// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../error/error';
// import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';
import { AppBanner } from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import { Helmet } from 'react-helmet';

const SingleChar = () => {
    const { charId } = useParams()

    const [char, setChar] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const { error, loading, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded).then(() => setProcess('confirmed'))
    }
    const onCharLoaded = (char) => {

        setChar(char);

        if (char?.episodes?.length) {
            Promise.all(
                char.episodes.map(url =>
                    fetch(url).then(res => res.json())
                )
            ).then(response => {
                setEpisodes(response)
            }).catch(err => console.log(err))
        }
        setEpisodes([]);
    }
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {setContent(process, View, char, episodes)}
            {/* {errorMessage}
            {spinner}
            {content} */}
        </>
    )
}

const View = ({ data: char, episode: episodes }) => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${char.name} character`}
                />
                <title>{char.name}</title>
            </Helmet>
            <AppBanner />
            <div className="single-comic">
                <div className="single-comic">
                    <img src={char.thumbnail} alt={char.name} className="single-comic__char-img" />
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{char.name}</h2>
                        <p className="single-comic__descr"><b>Status:</b> {char.status}</p>
                        <ul className="char__comics-list">
                            <li>Episodes:</li>
                            {
                                (episodes || []).map((item, i) => {

                                    if (i > 19) return;
                                    return (
                                        <li key={i} className="char__comics-item">
                                            #{item.episode} <b>Episode name:</b> {item.name} <b>Air date:</b> {item.air_date}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleChar;




