//import { TweenMax, Power2, TimelineLite } from "gsap"
//import CoursewarePerspectiveConstructor from '/js/CoursewarePerspectiveConstructor.js'
//import CoursewareConstructor from '/js/CoursewareConstructor.js'
import styles from '../css/perspective.css'
import styles from '../css/courseware.css'

var garevnaCourseware = {
    defaultCentralImage: undefined,
    defaultSideImage: undefined,
    mainContainer: null,
    images: [],
    ready: false,
    persp: [],
    loadData: function ( sourceDataURL, callback ) {
        try {
            var worker = new Worker( 'json_loader.js' )
            worker.postMessage ( sourceDataURL )
            worker.addEventListener('message', function( event ) {
                if (event.data) callback ( event.data )
                worker.terminate()
                worker = undefined
            })
        }
        catch (err) { console.log (err.message) }
    }
}
