import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../error/error';
// import Skeleton from '../skeleton/Skeleton'
// ES6

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = ({ charId }) => {



    const [char, setChar] = useState(null);
    const [episode, setEpisode] = useState([])
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }
    const { error, loading, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId])

    // componentDidMount() {
    //     this.updateChar();
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }



    const updateChar = () => {
        // const { charId } = props;
        if (!charId) {
            return;
        }

        //onCharLoading();
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharLoaded = (char) => {
        // console.log('update');
        // console.log(char);

        setChar(char)
        //setLoading(false)
        //this.setState({ char: char, loading: false })
        const getEpisodes = async () => {
            const response = await Promise.all(
                char.episodes.map(url =>
                    fetch(url).then(res => res.json())
                )
            )
            setEpisode(response)
        }
        getEpisodes();
    }

    // const onCharLoading = (char) => {
    //     setLoading(true)
    //     //this.setState({ loading: true })
    // }
    // const onError = () => {
    //     setError(true)
    //     setLoading(false)
    //     //this.setState({ loading: false, error: true })
    // }



    // const skeleton = char || loading || error ? null : <Skeleton />;
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !char) ? <View char={char} episode={episode} /> : null;

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, View, char, episode)}
        </div>
    )
}


const View = ({ data, episode }) => {
    const { id, name, status, thumbnail, homepage, wiki, episodes } = data;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <Link to={`/characters/${id}`} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="char__comics">Status: {status}</div>
            <ul className="char__comics-list">
                {episodes.length > 0 ? null : 'There is no episodes for this character'}
                {
                    episode.map((item, i) => {

                        if (i > 19) return;
                        return (
                            <li key={i} className="char__comics-item">
                                #{item.id} Episode name: {item.name} Data: {item.air_date}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
}

export default CharInfo;
