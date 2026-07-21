import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/spinner";

const SingleChar = lazy(() => import("../pages/SingleChar"));
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const SingleComicPage = lazy(() => import("../pages/SingleEpisode"));
const EpisodesPage = lazy(() => import("../pages/EpisodesPage"));

const App = () => {

    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/episodes' element={<EpisodesPage />} />
                            <Route path="/episodes/:episodeId" element={<SingleComicPage />} />
                            <Route exact path="/characters/:charId" element={<SingleChar />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;