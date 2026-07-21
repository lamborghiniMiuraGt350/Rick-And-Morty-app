import { Link } from "react-router-dom"
import ErrorMessage from "../error/error"
 function Page404() {
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ErrorMessage />
        </div>
        <h1 style={{ textAlign: 'center' }}>404 Error</h1>
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page doesn't exist</p>
        <Link style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px',textDecoration:'underline' }} to='/'>Back to main page</Link>

    </div>

    )
}
export default Page404;