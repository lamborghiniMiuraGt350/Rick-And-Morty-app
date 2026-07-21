import { AppBanner } from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import { Helmet } from "react-helmet";
function EpisodesPage() {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our episodes"
                />
                <title>Episodes page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>)
}
export default EpisodesPage;
