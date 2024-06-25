function update()
{
	if(key[38]) {	// Up
		console.log("presionada Up");
	}
	if(key[40]) {	// Down
		console.log("presionada Down");
	}
	if(key[37]) {	// Left
		console.log("presionada Left");
	}
	if(key[39]) {	// Right
		console.log("presionada Right");
	}
	if(key[32]) {	// Space
		console.log("presionada Space");
	}
	if(key[13]) {	// Enter
		console.log("presionada Enter");
	}
	if(key[83]) {	// S
		console.log("presionada S");
	}
	if(key[65]) {	// A
		console.log("presionada A");
	}
	if(key[27]) {	// Escape
		console.log("presionada Esc");
	}
}

var frameCount = 0;

function title_screen(config, ALVAR) {
	if(key[32] && pressed[32]) {		// Space (down)
		config.screen_sate++;
		play_sample(ALVAR.okaySound,0.4,1,false);
		play_sample(ALVAR.menuSound,0.4,1,true);
	}
	if (frameCount >= config.FPS) {		// Si paso 1 segundo, reinicio
		frameCount = 0;
	}
	if(frameCount >= config.FPS/2) {	// Si paso 0.5 segundos desde reinicio
		blit(ALVAR.titleScreenImage,canvas,config.SCREEN_W,0,0,0,config.SCREEN_W,config.SCREEN_H);
	}
	if (frameCount < config.FPS/2) {
		blit(ALVAR.titleScreenImage,canvas,0,0,0,0,config.SCREEN_W,config.SCREEN_H);
	}
	frameCount++;
}

var curFrame = 0;

function menu_screen(config, ALVAR, p) {

	if(key[38] && pressed[38]) {		// Up (down)
		if (curFrame > 0) {
			curFrame--;
		}
	}
	else if(key[40] && pressed[40]) {	// Down (down)
		if (curFrame < 4) {
			curFrame++;
		}
	}
	else if(key[13] && pressed[13]) {	// Enter (down)
		switch(curFrame) {
			case 0:			// Mision principal (un jugador)
			config.NUM_PLAYERS = 1;
			config.screen_sate++;
			stop_sample(ALVAR.menuSound);
			play_sample(ALVAR.soldierSelectionSound, 0.4, 1.0, true);
			break;

			case 1:			// Multijugador
			// Pendiente Desarrollo (debe reemplazar los sockets de C)
			break;

			case 2:			// Leaderborads
			config.screen_sate = config.screen_sate + 3;
			break;

			case 3:			// Opciones
			// Nunca hizo nada
			break;

			case 4:			// Salir
			stop_sample(ALVAR.menuSound);
			config.screen_sate--;
			curFrame = 0;
			// Aca deberia ir delay de 0.3 segundos
			break;
		}
		play_sample(ALVAR.rechargeSound,0.4,1,false);
	}

	blit(ALVAR.menuImage,canvas,config.SCREEN_W*curFrame,0,0,0,config.SCREEN_W,config.SCREEN_H);
}

var animationRow = 0;
var selectImage = 0;

function selection_screen(config, ALVAR) {

	if(key[37] && pressed[37]) {		// Left (down)
		play_sample(ALVAR.swapSelectionSound, 0.4, 1, false);
		frameCount = 0;
		animationRow = 0;
	}
	else if(key[39] && pressed[39]) {	// Right (down)
		play_sample(ALVAR.swapSelectionSound, 0.4, 1, false);
		frameCount = 0;
		animationRow = 1;
	}
	else if(key[27] && pressed[27]) {	// Escape (down)
		stop_sample(ALVAR.soldierSelectionSound);
		play_sample(ALVAR.swapSelectionSound, 0.4, 1, false);
		play_sample(ALVAR.menuSound,0.4,1,true);
		config.screen_sate--;
	}
	else if(key[13] && pressed[13]) {	// Enter (down)
		stop_sample(ALVAR.soldierSelectionSound);
		config.screen_sate++;
		switch (animationRow) {
			case 0:	// Si esta parado en marco
			play_sample(ALVAR.marcoSound, 0.4, 1, false);
			selectImage = 0;
			break;

			case 1:	// Si esta parado en tarma
			play_sample(ALVAR.tarmaSound, 0.4, 1, false);
			selectImage = 1;
			break;
		}
		// Aca deberia ir delay de 1 segundo
	}

	if (frameCount <= config.FPS/2) {		// Si paso 0.5 segundos, reinicio
		frameCount++;
	}
	if(frameCount >= config.FPS/4) {	// Si paso 0.25 segundos desde reinicio
		blit(ALVAR.selectionImage,canvas,config.SCREEN_W,config.SCREEN_H*animationRow,0,0,config.SCREEN_W,config.SCREEN_H);
	}
	if (frameCount < config.FPS/2) {
		blit(ALVAR.selectionImage,canvas,0,config.SCREEN_H*animationRow,0,0,config.SCREEN_W,config.SCREEN_H);
	}

}

function leader_screen(config, ALVAR) {
	// Pendiente Desarrollo (debe reemplazar el file de C con localstorage)
	if(key[27] && pressed[27]) {	// Escape (down)
		play_sample(ALVAR.swapSelectionSound, 0.4, 1, false);
		config.screen_sate = config.screen_sate - 3;
	}
	blit(ALVAR.gameOverImage,canvas,0,0,0,0,config.SCREEN_W,config.SCREEN_H);
}

function gameLoop() {
	// Pendiente Desarrollo
}