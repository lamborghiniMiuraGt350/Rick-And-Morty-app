import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "formik";
import Spinner from "../spinner/spinner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComics, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateDate()
    }, [id])

    const updateDate = () => {
        clearError()
        switch (dataType) {
            case 'comic':
                getComics(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);

        }
    }
    const onDataLoaded = (data) => {
        setData(data);
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <div>
            {/* Your content here */}
        </div>
    );
};

export default SinglePage;