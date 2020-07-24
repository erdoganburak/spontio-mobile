
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faMale } from '@fortawesome/free-solid-svg-icons'
import { faFemale } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

/**
 * Manages icons
 */
class IconManagerInstance {

    /**
    * Adds icons to library.
    */
    public addIconToLibrary(): void {
        library.add(fab, faTimes);
        library.add(fab, faGripLines);
        library.add(fab, faQuestionCircle);
        library.add(fab, faCog);
        library.add(fab, faSignOutAlt);
        library.add(fab, faHome);
        library.add(fab, faUser);
        library.add(fab, faBriefcase);
        library.add(fab, faGlobe);
        library.add(fab, faChevronRight);
        library.add(fab, faChevronLeft);
        library.add(fab, faSmile);
        library.add(fab, faCamera);
        library.add(fab, faUser);
        library.add(fab, faFileImage);
        library.add(fab, faSyncAlt);
        library.add(fab, faCheck);
        library.add(fab, faBolt);
        library.add(fab, faCalendarAlt);
        library.add(fab, faMale);
        library.add(fab, faFemale);
        library.add(fab, faTag);
        library.add(fab, faMapMarkerAlt)
        library.add(fab, faClock)
    }

}

const IconManager = new IconManagerInstance();
export default IconManager;