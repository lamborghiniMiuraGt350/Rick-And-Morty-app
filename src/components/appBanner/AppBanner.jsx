import decor from '../../resources/img/decor.png';
import banner from '../../resources/img/banner.png';

import './appBanner.css'
export function AppBanner() {
    return (
        <div className="app__banner">
            <img src={banner} alt="image" />
            <div className="app__banner-text">
                New episode every week!<br />
                Stay tuned!
            </div>
            <img src={decor} alt="image" />
        </div>
    )
}
