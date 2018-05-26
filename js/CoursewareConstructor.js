'use strict'

function QuizConstructor ( parentElement ) {
		this.parentElement = parentElement || document.body
		this.root = document.querySelector(':root')
		this.createMainScene ()
		this.setButtonToNextLevelPicture ( "images/next-level.png" )
		this.setButtonTestAnswerPicture ( "images/test-answer.png" )
}
QuizConstructor.prototype.setLifePicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-life-picture', "url(" + val + ")" )
}
QuizConstructor.prototype.setRightPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-right-picture', "url(" + val + ")" )
}
QuizConstructor.prototype.setWrongPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-wrong-picture', "url(" + val + ")" )
}
QuizConstructor.prototype.setCentralPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-central-picture', "url(" + val + ")" )
}
QuizConstructor.prototype.setTargetPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-target-picture', "url(" + val + ")" )
}
QuizConstructor.prototype.setButtonToNextLevelPicture = function ( val ) {
		this.root.style.setProperty ( '--button-to-next-level', "url(" + val + ")" )
}
QuizConstructor.prototype.setButtonTestAnswerPicture = function ( val ) {
		this.root.style.setProperty ( '--button-test-answer', "url(" + val + ")" )
}
QuizConstructor.prototype.setGameOverPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-game-over', "url(" + val + ")" )
}
QuizConstructor.prototype.setWinPicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-game-win', "url(" + val + ")" )
}
QuizConstructor.prototype.setFailurePicture = function ( val ) {
		this.root.style.setProperty ( '--quiz-game-fail', "url(" + val + ")" )
}
QuizConstructor.prototype.createPanels = function () {
		this.livesPanel = document.createElement ( 'aside' )
		this.livesPanel.className = "livesPanel"
		document.body.appendChild ( this.livesPanel )
		this.scorePanel = document.createElement ( 'aside' )
		this.scorePanel.className = "scorePanel"
		document.body.appendChild ( this.scorePanel )
		this.scorePanel.progressBar = document.createElement ( 'progress' )
		this.scorePanel.appendChild ( this.scorePanel.progressBar )
		for ( var j = 0; j < this.lives; j++ ) {
				var life = document.createElement ( 'div' )
				this.setLifePicture ( this.livesPictureURL )
				this.livesPanel.appendChild ( life )
		}
		this.scorePanel.progressBar.max = this.maxScore
		this.scorePanel.progressBar.value = 0
		this.testResultButton.scorePanel = this.scorePanel
}
QuizConstructor.prototype.createMainScene = function () {
		this.mainScene = document.createElement ( 'figure' )
		this.mainScene.className = "mainScene"
		this.parentElement.appendChild ( this.mainScene )
		this.mainScene.style.display = 'none'
		this.mainScene.parentObject = this
		this.mainScene.addEventListener ( 'nextQuizLevel', function ( event ) {
				event.target.parentObject.nextLevel ()
		})
		this.centralPicture = document.createElement ( 'div' )
		this.centralPicture.className = 'centralImage'
		this.mainScene.appendChild ( this.centralPicture )

		this.question = document.createElement ( 'p' )
		this.question.className = 'coursewareQuest'
		this.mainScene.appendChild ( this.question )
		this.questContainer = document.createElement ( 'div' )
		this.questContainer.className = "questContainer"
		this.mainScene.appendChild ( this.questContainer )
		this.nav = document.createElement ( 'nav' )
		this.mainScene.appendChild ( this.nav )

		this.testResultButton = document.createElement ( 'div' )
		this.testResultButton.className = "testResultButton"
		this.nav.appendChild ( this.testResultButton )
		this.testResultButton.parentObject = this
		this.testResultButton.looser = this.looser.bind ( this )
		this.testResultButton.finish = this.finish.bind ( this )
		this.testResultButton.answerElem = this.inputElement
		// this.testResultButton.rightAnswer  should be defined
		// this.testResultButton.levelBalls   should be defined
		this.testResultButton.rightAnswerPicture = "url(images/smile-01.gif)"           // default value
		this.testResultButton.wrongAnswerPicture = "url(images/simpson-and-ball.gif)"   // default value
		this.testResultButton.onclick = function ( event ) {
				var answer = event.target.answerElem.tagName === "PRE" ?
							event.target.answerElem.innerHTML.split('<br>').join("").split('\n').join("").split("&lt;").join("<").split("&amp;").join("&").split(" ").join("") :
							event.target.answerElem.value
				if ( answer === event.target.rightAnswer ) {
							event.target.parentObject.setCentralPicture ( event.target.rightAnswerPicture )
							event.target.scorePanel.progressBar.value += event.target.levelBalls
				}
				else {
							event.target.parentObject.setCentralPicture ( event.target.wrongAnswerPicture )
							event.target.looser()
				}
				event.target.style.display = "none"
		}

		this.buttonToNextLevel = document.createElement ( 'div' )
		this.buttonToNextLevel.className = "buttonToNextLevel"
		this.nav.appendChild ( this.buttonToNextLevel )
		this.buttonToNextLevel.mainScene = this.mainScene
		this.buttonToNextLevel.parentObject = this
		this.buttonToNextLevel.onclick = function ( event ) {
				if ( event.target.parentObject.levelNum === event.target.parentObject.levels.length-1 )
						event.target.parentObject.finish()
				else {
						event.target.mainScene.style.display = 'none'
						var event = new Event ( "gotoNextLevel" )
						___fone___.container.dispatchEvent ( event )
				}
		}
}
QuizConstructor.prototype.looser = function () {
		this.livesPanel.removeChild ( this.livesPanel.children [0] )
		this.lives--
		if ( this.lives == 0 ) {
				this.mainScene.innerHTML = ''
				this.mainScene.className = "mainScene  garevna_gameOver"
				this.formatExit ( "red" )
				this.buttonToNextLevel.innerHTML = "FAILURE"
				this.mainScene.appendChild ( this.buttonToNextLevel )
		}
		else this.finish ()
}
QuizConstructor.prototype.finish = function () {
		if ( this.levelNum === this.levels.length - 1 ) {
				this.mainScene.innerHTML = ''
				if ( this.scorePanel.progressBar.value == this.maxScore ) {
						this.style = ""
						this.mainScene.className = "mainScene  garevna_gameVictory"
						this.buttonToNextLevel.innerHTML = "YOU WIN!"
						this.formatExit ( "white" )
				}
				else {
						this.mainScene.className = "mainScene  garevna_gameFailure"
						this.buttonToNextLevel.innerHTML = "GAME OVER"
						this.formatExit ( "#2BF513" )
				}
				this.mainScene.innerHTML += '<h1>Набрано очков: ' + this.scorePanel.progressBar.value
				this.mainScene.innerHTML += ' из ' + this.maxScore + ' возможных</h1>'
				this.mainScene.innerHTML += '<h1>Осталось жизней: ' + this.lives
				this.mainScene.innerHTML += ' из ' + this.maxLives + '</h1>'

				this.mainScene.appendChild ( this.buttonToNextLevel )
		}
		else this.nextLevelAvailiable = true
}
QuizConstructor.prototype.formatExit = function ( color ) {
		this.buttonToNextLevel.style.backgroundImage = "none"
		this.buttonToNextLevel.style.fontSize = "50px"
		this.buttonToNextLevel.style.width = "100%"
		this.buttonToNextLevel.style.textShadow = "5px 5px 5px rgba(0,0,0,0.7)"
		this.buttonToNextLevel.style.border = 'none'
		this.buttonToNextLevel.style.color = color
		this.buttonToNextLevel.style.textAlign = "center"
		this.buttonToNextLevel.onclick = function ( event ) {
				location.reload()
		}
}
QuizConstructor.prototype.constructChoiceLevel = function ( levelData ) {
		this.setTargetPicture ( levelData.choicePicture.url )
		this.testResultButton.display = "none"
		this.choiceLevelElements = []
		for ( var x of levelData.choiceVariants ) {
				var elem = document.createElement( 'div' )
				elem.className =  'targetElement'
				elem.innerHTML = '<p>' + x + '</p>'
				elem.looser = this.looser.bind ( this )
				elem.finish = this.finish.bind ( this )
				elem.scorePanel = this.scorePanel
				elem.onclick = function ( event ) {
						if ( event.target.disabled ) return
						event.target.disabled = true
						var targetElem = event.target.tagName === "P" ? event.target.parentNode : event.target
						var num = levelData.choiceVariants.indexOf ( targetElem.children [0].innerHTML )
						if ( levelData.rightChoicesNums.indexOf ( num ) < 0 ) {
								targetElem.style.backgroundImage = 'url(' + levelData.wrongAnswerPicture.url + ')'
								targetElem.style.width = levelData.wrongAnswerPicture.width + 'px'
								targetElem.style.height = levelData.wrongAnswerPicture.height + 'px'
								targetElem.looser()
						}
						else {
								targetElem.style.backgroundImage = 'url(' + levelData.rightAnswerPicture.url + ')'
								targetElem.style.width = levelData.rightAnswerPicture.width + 'px'
								targetElem.style.height = levelData.rightAnswerPicture.height + 'px'
								targetElem.scorePanel.progressBar.value += levelData.balls
								targetElem.finish()
						}
				}
				this.choiceLevelElements.push ( elem )
				this.questContainer.appendChild ( elem )
		}
		this.resizeChoiceLevel ()
}
QuizConstructor.prototype.resizeChoiceLevel = function () {
		var center = { top: Math.round ( window.innerHeight/2 ) - 30, left: Math.round ( window.innerWidth/2 ) }
		var radius = Math.round ( Math.min( window.innerHeight, window.innerWidth ) * 0.3 )
		var delta = Math.round( radius/Math.sqrt(2) )
		var points = [
				{ top: center.top - radius, left: center.left },
				{ top: center.top - delta, left: center.left + delta },
				{ top: center.top, left: center.left + radius },
				{ top: center.top + delta, left: center.left + delta },
				{ top: center.top + radius, left: center.left },
				{ top: center.top + delta, left: center.left - delta },
				{ top: center.top, left: center.left - radius },
				{ top: center.top - delta, left: center.left - delta }
		]
		for ( var j = 0; j < this.choiceLevelElements.length; j++ ) {
				this.choiceLevelElements [j].style.top = points[j].top + 'px'
				this.choiceLevelElements [j].style.left = points[j].left + 'px'
		}
}
QuizConstructor.prototype.constructInputLevel = function ( levelData ) {
		var container = document.createElement ( 'div' )
		container.className = "inputContainer"
		var label = document.createElement ( 'span' )
		label.innerHTML = levelData.inputLegend.before
		container.appendChild ( label )
		this.inputElement = document.createElement ( 'input' )
		this.inputElement.className = "coursewareInputElement"
		this.inputElement.type = 'text'
		this.inputElement.size = "1"
		this.inputElement.placeholder = "?"
		this.inputElement.oninput = function ( event ) {
				event.target.size = Math.max ( event.target.value.length-1, 1 )
		}
		container.appendChild ( this.inputElement )
		var label = document.createElement ( 'span' )
		label.innerHTML = levelData.inputLegend.after
		container.appendChild ( label )
		this.questContainer.appendChild ( container )
		this.testResultButton.rightAnswer = levelData.rightInput
		this.testResultButton.answerElem = this.inputElement
		this.testResultButton.levelBalls = levelData.balls
}
QuizConstructor.prototype.constructFindErrorLevel = function ( levelData ) {
		this.textArea = document.createElement ( 'pre' )
		this.questContainer.appendChild ( this.textArea )
		this.textArea.className = "inputContainer"
		this.textArea.innerHTML = ""
		this.textArea.contentEditable = true
		for ( var x of levelData.wrongContent ) {
				this.textArea.innerHTML += x + "\n"
		}
		this.testResultButton.rightAnswer = levelData.rightContent.join ( "" ).split ( " " ).join ( "" )
		this.testResultButton.answerElem = this.textArea
}
QuizConstructor.prototype.nextLevel = function () {
		this.mainScene.style.display = 'block'
		this.questContainer.innerHTML = ''
		this.levelNum++
		if ( this.levelNum === this.levels.length-1 ) this.finish ()
		var levelData = this.levels [ this.levelNum ]
		this.setCentralPicture ( levelData.centralPicture )
		this.setRightPicture ( levelData.rightAnswerPicture.url )
		this.setWrongPicture ( levelData.wrongAnswerPicture.url )
		if ( levelData.choicePicture ) this.setTargetPicture ( levelData.choicePicture.url )
		this.testResultButton.rightAnswerPicture = levelData.rightAnswerPicture.url
		this.testResultButton.wrongAnswerPicture = levelData.wrongAnswerPicture.url
		this.testResultButton.levelBalls = levelData.balls
		this.question.innerHTML = levelData.question
		if ( this.levelNum === this.levels.length ) {
				this.success ()
				this.nextLevelAvailiable = false
		}
		else {
				this.nextLevelAvailiable = true
				switch ( levelData.type ) {
					case 'choice':
							this.constructChoiceLevel ( levelData )
							this.testResultButton.style.display = "none"
							break
					case 'input':
							this.constructInputLevel ( levelData )
							this.testResultButton.style.display = "inline-block"
							break
					case 'findError':
							this.constructFindErrorLevel ( levelData )
							this.testResultButton.style.display = "inline-block"
							break
					default:
							break
				}
		}
		return this.nextLevelAvailiable
}
QuizConstructor.prototype.success = function () {
		this.mainScene.backgroundImage = 'url(' + this.successPictureURL + ')'
}
QuizConstructor.prototype.getLevelType = function () {
		return this.levelNum < 0 ? undefined : this.levels [ this.levelNum ].type
}
QuizConstructor.prototype.init = function ( $data ) {
				this.levels = $data.levels
				this.lives = $data.lives
				this.maxLives = $data.lives
				var sheet = document.createElement ( 'style' )
				sheet.innerHTML = '.livesPanel > div { background-image: url(' + $data.livesPictureURL  + ') }'
				document.head.appendChild ( sheet )
				this.setGameOverPicture ( $data.gameOverPictureURL )
				this.setWinPicture ( $data.successPictureURL )
				this.setFailurePicture ( $data.failurePictureURL )
				this.maxScore = 0
				for ( var x of this.levels ) {
						this.maxScore += x.balls
				}
				this.ready = true
				this.createPanels ()
				this.levelNum = -1
				this.score = 0
				this.nextLevelAvailiable = true
}
QuizConstructor.prototype.resizeMainScene = function () {
		if ( this.getLevelType () === "choice" ) this.resizeChoiceLevel ()
		// if ( this.getLevelType () === "input" ) this.resizeInputLevel ()
}

export default QuizConstructor
