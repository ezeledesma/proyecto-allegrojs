function InitPlayer(ALVAR, image, image2, foot_image, selectImage , config) {
	let i = 0;
	while (i < config.NUM_PLAYERS) {
		ALVAR.jugador[i].x = 0;																			// Posicion en x del jugador
		ALVAR.jugador[i].y = -config.ground;												// Posicion en y del jugador
		ALVAR.jugador[i].lives = 3;																	// Cantidad de vidas
		ALVAR.jugador[i].speed = 6;																	// Velocidad
		ALVAR.jugador[i].boundx = 30;																// Tamaño de colision
		ALVAR.jugador[i].boundy = 40;																// Tamaño de colision
		ALVAR.jugador[i].score = 0;																	// Score del jugador

		ALVAR.jugador[i].maxFrame = 7;															// Ultimo frame
		ALVAR.jugador[i].curFrame = 0;															// Frame actual
		ALVAR.jugador[i].frameCount = 0;														// Contador de frame
		ALVAR.jugador[i].frameDelay = 4;														// Tiempo de espera entre frame
		ALVAR.jugador[i].frameWidth = 80;														// Ancho del frame
		ALVAR.jugador[i].frameHeight = 50;													// Alto del frame
		ALVAR.jugador[i].animationRow = 0;													// Fila de la animacion
		ALVAR.jugador[i].ajuste = 0;																// Ajuste para cuando dispara (frame mas largo)
		ALVAR.jugador[i].animationDirection = 0;										// Direccion del sprite (0 mirando a la izquierda)

		ALVAR.jugador[i].isMoving = 0;															// Indicador de jugador en movimiento
		ALVAR.jugador[i].jump = 0;																	// Saltar
		ALVAR.jugador[i].jump_allowed = 1;													// Salto permitido
		ALVAR.jugador[i].speed_y = -3;															// Velocidad inicial en y

		ALVAR.jugador[i].machineGun = 1;														// Variable para habilitar/deshabilitar la machineGun
		ALVAR.jugador[i].ammo = 200;																// Balas disponibles para las armas que no son la pistola
		ALVAR.jugador[i].shoot_delay = 4;														// Cadencia de disparo
		ALVAR.jugador[i].count = 0;																	// Contador para la cadencia
		ALVAR.jugador[i].bombs = 50;																// Bombas disponibles
		ALVAR.jugador[i].count2 = 0;																// Segundo contador de cadencia (para las bombas)

		ALVAR.jugador[i].foot_x = ALVAR.jugador[i].x;
		ALVAR.jugador[i].foot_y = ALVAR.jugador[i].y;
		ALVAR.jugador[i].foot_maxFrame = 1;
		ALVAR.jugador[i].foot_curFrame = 0;
		ALVAR.jugador[i].foot_frameCount = 0;
		ALVAR.jugador[i].foot_frameDelay = 2;
		ALVAR.jugador[i].foot_frameWidth = 40;
		ALVAR.jugador[i].foot_frameHeight = 50;
		ALVAR.jugador[i].foot_animationRow = 0;
		ALVAR.jugador[i].foot_image = foot_image;
	i++;
	}
	if (!selectImage) {																		// Si mandaron un 0
		ALVAR.jugador[0].image = image;														// Jugador 1 es marco
		if (config.NUM_PLAYERS > 1) {											// Si hay mas de 1 jugador
			ALVAR.jugador[1].image = image2;													// Jugador 2 es tarma
		}
	}
	else {
		ALVAR.jugador[0].image = image2;
		if (config.NUM_PLAYERS >1) {
			ALVAR.jugador[1].image = image;
		}
	}
}

function UpdatePlayer(jugador, config) {
	let i = 0;
	while (i < config.NUM_PLAYERS) {
		if(jugador[i].lives) {
			jugador[i].frameCount++;
			jugador[i].foot_frameCount++;
			if(jugador[i].frameCount >= jugador[i].frameDelay) {
				jugador[i].frameCount = 0;
				jugador[i].curFrame++;
				if(jugador[i].curFrame >= jugador[i].maxFrame) {
					jugador[i].curFrame = 0;
					jugador[i].animationRow = 0;
					jugador[i].maxFrame = 7;
				}
			}
			if(jugador[i].foot_frameCount >= jugador[i].foot_frameDelay) {
				jugador[i].foot_frameCount = 0;
				jugador[i].foot_curFrame++;
				if(jugador[i].foot_curFrame >= jugador[i].foot_maxFrame) {
					jugador[i].foot_curFrame = 0;
				}
			}
		}
		else {	// Por ahora (hasta encontrar algo mejor)
			jugador[i].x = -100;
			jugador[i].foot_x = jugador[i].x;
		}
	i++;
	}
}

function DrawPlayer(ALVAR, config) {
	jugador = ALVAR.jugador;
	let i = 0;
	while (i < config.NUM_PLAYERS) {
		if (jugador[i].isMoving) {																																		// Si se esta moviendo cambiar frame a Walk
				jugador[i].foot_maxFrame = 12;
				jugador[i].foot_animationRow = 1;
		}
		else {																																											// Sino a Stand
				jugador[i].foot_maxFrame = 1;
				jugador[i].foot_animationRow = 0;
		}

		if (jugador[i].jump) {																																				// Si hay que saltar
				jugador[i].y += jugador[i].speed_y*2;
				jugador[i].foot_y = jugador[i].y;
				jugador[i].jump_allowed = 0;
				jugador[i].speed_y += 0.1;
		}

		if (jugador[i].y >= -config.ground) {				// Si llega al piso
				jugador[i].y = -config.ground;
				jugador[i].foot_y = jugador[i].y;
				jugador[i].jump_allowed = 1;
				jugador[i].speed_y = -3;
				jugador[i].jump = 0;
		}

		let fx = jugador[i].curFrame * jugador[i].frameWidth;
		let fy = jugador[i].animationRow * jugador[i].frameHeight;
		let foot_fx = jugador[i].foot_curFrame * jugador[i].foot_frameWidth;
		let foot_fy = jugador[i].foot_animationRow * jugador[i].foot_frameHeight;

		// Fix: + 40*ALVAR.jugador[i].animationDirection en eje X (por algun motivo no se rota correctamente)
		stretch_blit(jugador[i].foot_image,canvas,foot_fx,foot_fy,jugador[i].foot_frameWidth,jugador[i].foot_frameHeight,jugador[i].foot_x + 40*ALVAR.jugador[i].animationDirection, config.SCREEN_H + jugador[i].foot_y - jugador[i].foot_frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h),jugador[i].foot_frameWidth*(config.SCREEN_H/ALVAR.fondoImage.h),jugador[i].foot_frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h),ALVAR.jugador[i].animationDirection);	// jugador[i].animationDirection
		stretch_blit(jugador[i].image,canvas,fx,fy,jugador[i].frameWidth,jugador[i].frameHeight,jugador[i].x + jugador[i].ajuste + 40*ALVAR.jugador[i].animationDirection, config.SCREEN_H + jugador[i].y - jugador[i].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h),jugador[i].frameWidth*(config.SCREEN_H/ALVAR.fondoImage.h),jugador[i].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h),ALVAR.jugador[i].animationDirection);	// jugador[i].animationDirection

		i++;
	}
}

function MovePlayerLeft(jugador, nPlayer, config) {
	jugador[nPlayer].isMoving = 1;
	jugador[nPlayer].animationDirection = 1;
	jugador[nPlayer].ajuste = -40;
	jugador[nPlayer].x -= jugador[nPlayer].speed;
	jugador[nPlayer].foot_x -= jugador[nPlayer].speed;
	if(jugador[nPlayer].x <= 0) {	// Si llega al borde izquierdo no permitir seguir
			jugador[nPlayer].x = 0;
			jugador[nPlayer].foot_x = 0;
	}
}

function MovePlayerRight(jugador, nPlayer, enemiesDead, config, enemies) {
	let i = 0;
	let allowed = 1;
	jugador[nPlayer].isMoving = 1;
	jugador[nPlayer].animationDirection = 0;
	jugador[nPlayer].ajuste = 0;
	jugador[nPlayer].x += jugador[nPlayer].speed;
	jugador[nPlayer].foot_x += jugador[nPlayer].speed;
	//while (i < config.NUM_ENEMIES) {	// Descomentar cuando este listo
	//	if (enemies[i].lives != 0) {
	//		allowed = 0;
	//		break;
	//	}
	//	i++;
	//}
	i = 0;
	if(jugador[nPlayer].x >= config.SCREEN_W/2 && config.FONDO_X < (config.FONDO_W - config.SCREEN_W) && allowed) {	// Si llega a la mitad de la pantalla, correr el fondo
			jugador[nPlayer].x -= jugador[nPlayer].speed;
			jugador[nPlayer].foot_x -= jugador[nPlayer].speed;
			config.FONDO_X += jugador[nPlayer].speed;
			//while (i < config.NUM_ENEMIESDEAD) {
			//		enemiesDead[i].x -= jugador[nPlayer].speed;
			//		i++;
			//}
	}
	if(jugador[nPlayer].x >= (config.SCREEN_W - (jugador[nPlayer].frameWidth)/2)) {	// Si llega al borde derecho no permitir seguir
			jugador[nPlayer].x = config.SCREEN_W - (jugador[nPlayer].frameWidth)/2;
			jugador[nPlayer].foot_x = config.SCREEN_W - (jugador[nPlayer].frameWidth)/2;
	}
}