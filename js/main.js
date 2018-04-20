var garevnaCourseware = {
    defaultCentralImage: undefined,
    defaultSideImage: undefined,
    mainContainer: null,
    images: [],
    ready: false,
    persp: [],
    loadData: function ( sourceDataURL, callback ) {
        try {
            var worker = new Worker( 'js/json_loader.js' )
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
