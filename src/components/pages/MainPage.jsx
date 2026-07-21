import CharInfo from "../charInfo/CharInfo"
import CharList from "../charList/CharList"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import RandomChar from "../randomChar/RandomChar"
import decoration from '../../resources/img/bg.png';
import { useState } from "react";
import { CharSearchForm } from "../charSearchForm/CharSearchForm";
import { Helmet } from "react-helmet";



function MainPage() {
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Rick and morty information portal"
                />
                <title>Rick and morty information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" width="500" />
        </>
    )
}

export default MainPage;
