/* TODO

- Reescalar imagenes de explosiones y balas
- Mejorar movimiento de granada, para que tome velocidad que tiene el jugador (deberia llegar mas lejos si la lanza moviendose)
- Mejorar todas las colisiones
- Mostrar score, balas, vida, etc
- Que el juego finalice al llegar al final del mapa
- No permitir avanzar si existen enemigos con vida?
	-> Si se puede avanzar entonces corregir posicion en x de enemigo, sus balas y muertes al desplazarse
- Agregar cambio de nivel?

- Terminar funcionalidad Multijugador
- Terminar funcionalidad LeaderBoard

*/

var LEFT = 0;
var RIGHT = 0;
var SPACE = 0;
var S = 0;
var A = 0;

function updateKeys(ALVAR, config) {
	jugador = ALVAR.jugador;

	if(key[37] && pressed[37]) {	// Left (down)
		jugador[0].key.left = true;
		LEFT = 1;
	}
	else if (!key[37]) {		// Left (up)
		jugador[0].key.left = false;
	}
	
	if(key[39] && pressed[39]) {	// Right (down)
		jugador[0].key.right = true;
		RIGHT = 1;
	}
	else if (!key[39]) {		// Right (up)
		jugador[0].key.right = false;
	}
	
	if(key[27] && pressed[27]) {	// Escape (down)
		jugador[0].key.escape = true;
	}
	else if (!key[27]) {		// Escape (up)
		jugador[0].key.escape = false;
	}
	
	if(key[32] && pressed[32]) {	// Space (down)
		jugador[0].key.space = true;
		SPACE = 1;
	}
	else if (!key[32]) {		// Space (up)
		jugador[0].key.space = false;
	}
	
	if(key[83] && pressed[83]) {	// S (down)
		jugador[0].key.s = true;
		S = 1;
		if (!jugador[0].machineGun) {																			// Si no tiene machinGun
			if (!jugador[0].animationDirection) {														// Si el jugador esta mirando hacia la derecha
				FireBullet(ALVAR, 1, 0, config, 0);
			}
			else {
				FireBullet(ALVAR, -1, 0, config, 0);
			}
		}
	}
	else if(!key[83]) {		// S (up)
		jugador[0].key.s = false;
	}
	
	if(key[65] && pressed[65]) {	// A (down)
		jugador[0].key.a = true;
		A = 1;
		if (ALVAR.jugador[0].bombs > 0) {																				// Si tiene municion
			if (ALVAR.jugador[0].count2 < 0/*ALVAR.jugador[0].shoot_delay*2*/) {
				ALVAR.jugador[0].count2++;
			}
			else {
				if (!ALVAR.jugador[0].animationDirection) {													// Si el jugador esta mirando hacia la derecha
						FireBullet(ALVAR, 1, 1, config, 0);
					}
				else {
						FireBullet(ALVAR, -1, 1, config, 0);
				}
				ALVAR.jugador[0].bombs--;
				ALVAR.jugador[0].count2 = 0;
			}
		}
	}
	else if (!key[65]) {		// A (up)
		jugador[0].key.a = false;
	}

}

var frameCount = 0;

function title_screen(config, ALVAR) {
	if(key[32] && pressed[32]) {		// Space (down)
		config.screen_state++;
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
			config.screen_state++;
			stop_sample(ALVAR.menuSound);
			play_sample(ALVAR.soldierSelectionSound, 0.4, 1.0, true);
			break;

			case 1:			// Multijugador
			// Pendiente Desarrollo? (debe reemplazar los sockets de C)
			// No se espera conexion, se toma conectado por defecto
			config.NUM_PLAYERS = 2;
			config.screen_state++;
			stop_sample(ALVAR.menuSound);
			play_sample(ALVAR.soldierSelectionSound, 0.4, 1.0, true);
			break;

			case 2:			// Leaderborads
			config.screen_state = config.screen_state + 3;
			break;

			case 3:			// Opciones
			// Nunca hizo nada
			break;

			case 4:			// Salir
			stop_sample(ALVAR.menuSound);
			config.screen_state--;
			curFrame = 0;
			al_rest(config, 0.3);
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
		config.screen_state--;
	}
	else if(key[13] && pressed[13]) {	// Enter (down)
		stop_sample(ALVAR.soldierSelectionSound);
		config.screen_state++;
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
		InitPlayer(ALVAR, ALVAR.playerImage, ALVAR.player2Image, ALVAR.foot_playerImage, selectImage, config);
		InitBullet(ALVAR, ALVAR.bulletImage, ALVAR.playerGrenadeImage, ALVAR.bulletSound, config);
		InitEnemy(ALVAR.enemies, ALVAR.enemyImage, config);
		InitEnemyDead(ALVAR.enemiesDead, ALVAR.enemyImage, ALVAR.enemyDeadSound, config);
		Enemy_InitBullet(ALVAR.enemiesBullet, ALVAR.grenadeImage, ALVAR.rocketImage, config);
		InitExplosions(ALVAR.explosions, ALVAR.explosionImage, ALVAR.explosionSound, config);
		al_rest(config, 0.7); // Puedo pasar una fn para que se ejecute
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
		config.screen_state = config.screen_state - 3;
	}
	//blit(ALVAR.gameOverImage,canvas,0,0,0,0,config.SCREEN_W,config.SCREEN_H);
	stretch_blit(ALVAR.gameOverImage,canvas,0,0,config.gameOverWidth,config.gameOverHeight,0,0,config.SCREEN_W,config.SCREEN_H);
}

function gameLoop(config, ALVAR, p) {
	// Pendiente Desarrollo
	//blit(ALVAR.fondoImage,canvas,0,0,0,0,config.SCREEN_W,config.SCREEN_H);
	
	if(config.NUM_PLAYERS > 1) {
		// Si estoy conectado a cliente, recibir datos
		config.netCount++;
		if(config.netCount == config.FPS) {
			//get_network_data(config.buffer); // Descomentar para comenzar a realizar las consultas
			ALVAR.jugador[1].key = config.buffer[0];
			config.netCount = 0;
		}
	}

	updateKeys(ALVAR, config);

	if(ALVAR.jugador[0].key.escape) {
	}

	if(ALVAR.jugador[0].key.left && LEFT) {
		if(ALVAR.jugador[0].x >= ALVAR.jugador[0].speed) {												// Mientras este presionada la izquierda
			MovePlayerLeft(ALVAR.jugador, 0, config);
		}
	}
	else if (!ALVAR.jugador[0].key.left && LEFT) {
		LEFT = 0;
		ALVAR.jugador[0].isMoving = 0;
		ALVAR.jugador[0].foot_curFrame = 0;
		ALVAR.jugador[0].foot_frameCount = 0;
	}

	if(ALVAR.jugador[0].key.right && RIGHT) {
		MovePlayerRight(ALVAR.jugador, 0, ALVAR.enemiesDead, config, ALVAR.enemies);
	}
	else if (!ALVAR.jugador[0].key.right && RIGHT) {
		RIGHT = 0;
		ALVAR.jugador[0].isMoving = 0;
		ALVAR.jugador[0].foot_curFrame = 0;
		ALVAR.jugador[0].foot_frameCount = 0;
	}

	if(ALVAR.jugador[0].key.space && SPACE) {
		if (ALVAR.jugador[0].jump_allowed) {
			ALVAR.jugador[0].jump = 1;
		}
	}
	else if (!ALVAR.jugador[0].key.space && SPACE) {
		SPACE = 0;
	}

	if(ALVAR.jugador[0].key.s && S) {
		if (ALVAR.jugador[0].machineGun && ALVAR.jugador[0].ammo) {											// Si tiene machineGun y municion
			if (ALVAR.jugador[0].count < ALVAR.jugador[0].shoot_delay) {
				ALVAR.jugador[0].count++;
			}
			else {
				if (!ALVAR.jugador[0].animationDirection) {														// Si el jugador esta mirando hacia la derecha
					FireBullet(ALVAR, 1, 0, config, 0);
				}
				else {
					FireBullet(ALVAR, -1, 0, config, 0);
				}
				ALVAR.jugador[0].ammo--;
				ALVAR.jugador[0].count = 0;
			}
		}
		else {
			ALVAR.jugador[0].machineGun = 0;
		}
	}
	else if (!ALVAR.jugador[0].key.s && S) {
		S = 0;
	}

	if(ALVAR.jugador[0].key.a && A) {
		/* Se pasa a tecla presionada
		if (ALVAR.jugador[0].bombs > 0) {																				// Si tiene municion
			if (ALVAR.jugador[0].count2 < ALVAR.jugador[0].shoot_delay*2) {
				ALVAR.jugador[0].count2++;
			}
			else {
				if (!ALVAR.jugador[0].animationDirection) {													// Si el jugador esta mirando hacia la derecha
						FireBullet(ALVAR, 1, 1, config, 0);
					}
				else {
						FireBullet(ALVAR, -1, 1, config, 0);
				}
				ALVAR.jugador[0].bombs--;
				ALVAR.jugador[0].count2 = 0;
			}
		}
		*/
	}
	else if(!ALVAR.jugador[0].key.a && S) {
		A = 0;
	}

	stretch_blit(ALVAR.fondoImage,canvas,config.FONDO_X,0,config.SCREEN_W,config.FONDO_H,0,0,config.SCREEN_W,config.SCREEN_H);
	UpdatePlayer(ALVAR.jugador, config);
	UpdateBullet(ALVAR.bullets, ALVAR.explosions, config);
	UpdateExplosions(ALVAR.explosions, config);
	DrawPlayer(ALVAR, config);
	DrawBullet(ALVAR, config);
	DrawExplosions(ALVAR.explosions, config);
	
	StartEnemy(ALVAR.enemies, config);
	UpdateEnemy(ALVAR, config);
	CollideBullet(ALVAR, config);
	UpdateEnemyDead(ALVAR.enemiesDead, config);
	Enemy_UpdateBullet(ALVAR, config);
	Enemy_CollideBullet(ALVAR, config);
	
	
	DrawEnemy(ALVAR, config);
	DrawEnemyDead(ALVAR, config);
	Enemy_DrawBullet(ALVAR, config);

}

function al_rest(config, delay, fn) {
	config.delay = delay*config.FPS;
	config.delay_screen_state = config.screen_state;
	config.screen_state = config.delay_state;
	config.delay_fn_exec = fn;
}

function delay(config) {
	// "Problema": deja la pantalla en negro, lo que dure el delay
	if(config.delay == 0) {
		config.screen_state = config.delay_screen_state;
		if(typeof(config.delay_fn_exec) == 'function')
			config.delay_fn_exec();
		config.delay_fn_exec = '';
	}
	else {
		config.delay--;
	}
}