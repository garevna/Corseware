'use strict'

import { TweenMax, Power2, TimelineLite } from "gsap"

import PerspectiveConstructor from 'js/PerspectiveConstructor.js'
import QuizConstructor from 'js/CoursewareConstructor.js'
import perspective_css from 'css/perspective.css'
import quiz from 'css/courseware.css'

var sourceNum = location.hash.substr ( 1, location.hash.length )

function loadQuizData ( sourceDataURL ) {
    return new Promise ( function ( resolve, reject ) {
      try {
          var worker = new Worker( './js/json_loader.js' )
          worker.postMessage ( sourceDataURL )
          worker.addEventListener( 'message', function ( event ) {
              if ( event.data ) {
                resolve ( event.data )
                worker.terminate()
                worker = undefined
              }
          })
      }
      catch ( err ) { reject ( err.message ) }
    } )
}

window.___quiz___ = new QuizConstructor ()
loadQuizData ( '../json/courseware_' + sourceNum + '.json' ).then ( response => {
    ___quiz___.init ( JSON.parse ( JSON.stringify ( response ) ) )
})

window.___fone___ = new PerspectiveConstructor ()

loadQuizData ( '../json/perspectivePictures.json' ).then ( $data => {
    ___fone___.pictures = JSON.parse ( JSON.stringify ( $data ) )
    ___fone___.init ( document.getElementById ( "main_perspective" ) )
})

window.addEventListener ( 'resize', function ( event ) {
    ___fone___.perspectiveObjectSize ()
    ___quiz___.resizeMainScene ()
})
