import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import morty from '../../resources/img/morty.png';

// import Spinner from '../spinner/spinner'
// import ErrorMessage from '../error/error';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
const RandomChar = () => {
    const [char, setChar] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }

    const { loading, error, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerID = setTimeout(updateChar, 10000);
        return () => clearTimeout(timerID);
    }, [])

    // componentDidMount() {
    //     this.updateChar();
    //     this.timerID = setInterval(this.updateChar, 10000);
    //     console.log('mount');
    // }

    // componentWillUnmount() {
    //     console.log('unmount');
    //     clearInterval(this.timerID);
    // }

    const onCharLoaded = (char) => {
        //console.log('update');
        setChar(char)
        //setLoading(false)
        //this.setState({ char: char, loading: false })
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

    const updateChar = () => {
        clearError();
        const id = Math.floor((Math.random() * 826) + 1);
        //onCharLoading();
        getCharacter(id).then(onCharLoaded).then(() => setProcess('confirmed'))
    }

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar" >
            {setContent(process, View, char)}
            {/* {errorMessage}{spinner}{content} */}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={morty} alt="morty" className="randomchar__decoration" width="200" />
            </div>
        </div>
    )

}
const View = ({ data }) => {
    const { id, name, status, thumbnail } = data;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {status}
                </p>
                <div className="randomchar__btns">
                    <Link to={`/characters/${id}`} className="button button__main">
                        <div className="inner">homepage</div>
                    </Link>
                    <Link to={`/characters/${id}`} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;