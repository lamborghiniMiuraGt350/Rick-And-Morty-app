import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Spinner from '../spinner/spinner'
import ErrorMessage from '../error/error';

// ES6
import useMarvelService from '../../services/MarvelService';
import './charList.scss';



const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error("Unexpected process state")
    }
}



const CharList = ({ onCharSelected }) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(40);
    const [charEnded, setCharEnded] = useState(false);

    const { error, loading, getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    // componentDidMount() {
    //     this.onRequest()
    // }

    const onRequest = (offset, initial) => {
        //onCharListLoading()
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    // const onCharListLoading = () => {
    //     // this.setState({
    //     //     newItemLoading: true
    //     // })
    //     setNewItemLoading(true);
    // }



    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 20) {
            ended = true;
        }
        // this.setState(({ offset, charList }) => ({
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 1,
        //     charEnded: ended
        // }))
        setCharList(charList => [...charList, ...newCharList])
        //setLoading(loading => false)
        setNewItemLoading(false)
        setOffset(offset => offset + 1)
        setCharEnded(charEnded => ended)

    }
    // const onError = () => {
    //     //this.setState({ loading: false, error: true })
    //     setLoading(false)
    //     setError(true)
    // }
    const itemRefs = useRef([]);
    //itemRefs = [];
    //Ref 

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, index) => {

            return (
                <li
                    key={item.id}
                    className="char__item"
                    onClick={() => { onCharSelected(item.id); focusOnItem(index) }}
                    ref={el => itemRefs.current[index] = el}
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemLoading ? <Spinner /> : null;
    //const content = !(loading || error) ? items : null;

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    }, [process])

    return ( 

        <div className="char__list">
            <ul className="char__grid">
                {elements}
                {/* {errorMessage}
                {spinner}
                {items} */}
                {/* {content} */}
            </ul>
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;