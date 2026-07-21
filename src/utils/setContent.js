
import ErrorMessage from "../components/error/error";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/spinner";


const setContent = (process, Component, data,episode) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} episode={episode} />;
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error("Unexpected process state")
    }
}

export default setContent;