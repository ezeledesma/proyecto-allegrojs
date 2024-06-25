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
			// Pendiente Desarrollo
			break;

			case 1:			// Multijugador
			// Pendiente Desarrollo
			break;

			case 2:			// Leaderborads
			// Pendiente Desarrollo
			break;

			case 3:			// Opciones
			// Nada
			break;

			case 4:			// Salir
			config.screen_sate = -1;
			curFrame = 0;
			break;
		}
		stop_sample(ALVAR.menuSound);
		play_sample(ALVAR.rechargeSound,0.4,1,false);
		config.screen_sate++;
	}

	blit(ALVAR.menuImage,canvas,config.SCREEN_W*curFrame,0,0,0,config.SCREEN_W,config.SCREEN_H);
}

