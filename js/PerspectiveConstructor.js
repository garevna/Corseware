'use strict'

function PerspectiveConstructor ( params ) {
		this.initialPosition = function () {
				this.container.style.marginTop = Math.round ( window.innerHeight*0.45 ) + 'px'
				this.container.style.marginLeft = Math.round ( window.innerWidth*0.45 ) + 'px'
				this.container.style.width = Math.round ( window.innerWidth*0.1 ) + 'px'
				this.container.style.height = Math.round ( window.innerHeight*0.1 ) + 'px'
		}
		this.perspectiveObjectSize = function () {

			var parentSize = this.parentElement.getBoundingClientRect()

			this.container.normalSize = Math.round ( Math.min ( parentSize.width, parentSize.height ) * 0.2 )
			this.container.largeSize = this.container.normalSize * 3
			this.container.largeSizeTop = Math.round ( ( parentSize.height - this.container.largeSize )/2 )
			this.container.largeSizeLeft = Math.round ( ( parentSize.width - this.container.largeSize )/2 )
			this.container.top = Math.round ( ( parentSize.height - this.container.normalSize )/2 )
			var dy = Math.round ( this.container.top*0.5 )
			this.container.left = Math.round ( ( parentSize.width - this.container.normalSize )/2 )
			var dx = Math.round ( this.container.left*0.5 )
			this.container.coords = {
					garevna_perspectiveCenterSide: [
					    this.container.largeSizeTop + 'px',
							this.container.largeSizeLeft + 'px',
							this.container.largeSize + 'px'
					],
					garevna_perspectiveTopSide:    [
					    this.container.top - dy + 'px',
							this.container.left + 'px',
							this.container.normalSize + 'px'
					],
					garevna_perspectiveRightSide:  [
					    this.container.top + 'px',
							this.container.left + dx + 'px',
							this.container.normalSize + 'px'
					],
					garevna_perspectiveBottomSide: [
					    this.container.top + dy + 'px',
							this.container.right + 'px',
							this.container.normalSize + 'px'
					],
					garevna_perspectiveLeftSide:   [
					    this.container.top + 'px',
							this.container.left - dx + 'px',
							this.container.normalSize + 'px'
					]
			}
			TweenLite.to ( this.container, 2, {
					marginTop:  this.container.top,
					marginLeft: this.container.left,
					width:      this.container.normalSize + 'px',
					height:     this.container.normalSize + 'px'
			} )
		}
}

PerspectiveConstructor.prototype.init = function ( parentElement ) {
		this.parentElement = parentElement || document.body
		this.container = document.createElement ( 'div' )
		this.container.className = 'garevna_perspectiveContainer'
		this.parentElement.appendChild ( this.container )
		this.container.parentObject = this
		this.container.addEventListener ( "gotoNextLevel", function ( event ) {
				event.target.parentObject.level ()
		})

		var names = [ 'leftSide', 'rightSide', 'topSide', 'bottomSide', 'centralSide' ]
		var classes = {
				leftSide: 'garevna_perspectiveLeftSide',
				rightSide: 'garevna_perspectiveRightSide',
				topSide: 'garevna_perspectiveTopSide',
				bottomSide: 'garevna_perspectiveBottomSide',
				centralSide: 'garevna_perspectiveCenterSide'
		}
		for ( var name of names ) {
				this [ name ] = document.createElement ( 'div' )
				this.container.appendChild ( this [ name ] )
				this [ name ].className = classes [ name ]
				this [ name ].container = this.container
				this [ name ].onmouseover = function ( event ) {
						var container = event.target.container
						var theClass = this.className
						TweenLite.to ( container, 2, {
								marginTop:  container.coords [ theClass ][0],
								marginLeft: container.coords [ theClass ][1],
								width:      container.coords [ theClass ][2],
								height:     container.coords [ theClass ][2]
						})
				}
		}

		this.initialPosition ()
		this.default = {
          center: "0BxaMB69y7fvSQmJOTU52QWhHZXM",
          sides: [
                  "0BxaMB69y7fvSZnFzeTBDSVRXYTg",
                  "1eFNeW_F3LeSDV21aPbrhlZ17KokAsWQE",
                  "1G4YGTxeOdQHUALmUj16rNHFEw3Ddh_QR",
                  "1CbI646IxKLmIl11rf1kap3Tt9upudXyO"
          ]
    }
		this.level ()
		this.perspectiveObjectSize ()
		this.centralSide.onclick = function ( event ) {
				___quiz___.mainScene.style.display = "block"
				var event = new Event ( 'nextQuizLevel' )

				___quiz___.mainScene.dispatchEvent ( event )
		}
		this.personage = document.createElement ( 'div' )
		this.parentElement.appendChild ( this.personage )
		this.personage.id = "perspectivePersonage"
		this.personage.className = "personage"
		this.personage.style.backgroundImage = 'url(images/astronaut.gif)'
		this.parentElement.onmousemove = function ( event ) {
				var elem = document.getElementById ( "perspectivePersonage" )
				elem.style.left = event.clientX + "px"
				elem.style.top = event.clientY + "px"
		}
}
PerspectiveConstructor.prototype.getItem = function () {
			if ( this.pictures.length === 0 ) return this.default
			var num = this.pictures.length === 1 ? 0 :
						Math.round ( Math.random () * ( this.pictures.length - 1 ) )
			return this.pictures.splice ( num, 1 )[0]
}
PerspectiveConstructor.prototype.getPictures = function () {
			var rec = this.getItem ()
			var ind = Math.round ( Math.random () * ( rec.sides.length - 1 ) )
			return {
					center: "https://drive.google.com/uc?export=download&id=" + rec.center,
					side: "https://drive.google.com/uc?export=download&id=" + rec.sides [ ind ]
			}
}
PerspectiveConstructor.prototype.level = function () {
			var pict = this.getPictures ()
			this.leftSide.style.backgroundImage = "url(" + pict.side + ")"
			this.rightSide.style.backgroundImage = "url(" + pict.side + ")"
			this.topSide.style.backgroundImage = "url(" + pict.side + ")"
			this.bottomSide.style.backgroundImage = "url(" + pict.side + ")"
			this.centralSide.style.backgroundImage = "url(" + pict.center + ")"
}

export default PerspectiveConstructor
