function InitBullet(ALVAR, image, image2, bulletSound, config) {
	bullet = ALVAR.bullets;
	let i = 0;
	while (i < config.NUM_BULLETS) {
		bullet.push({
			speed : 20,
			lives : 0,
			direction : 1,
			image : image,
			image2 : image2,
			bulletSound: bulletSound			
		})
		i++;
	}
}

function DrawBullet(ALVAR, config) {
	bullet = ALVAR.bullets;
	let i = 0;
	while (i < config.NUM_BULLETS) {
		if(bullet[i].lives > 0){
			if (!bullet[i].bulletImage) {
				draw_sprite(canvas,bullet[i].image,bullet[i].x + bullet[i].xi - config.FONDO_X,bullet[i].y);
			}
			else {
				rotate_sprite(canvas,bullet[i].image2,bullet[i].x  + bullet[i].xi - config.FONDO_X,bullet[i].y, bullet[i].angle*180/PI);
			}
		}
		i++;
	}
}

function FireBullet(ALVAR, bulletDirection, bulletSelection, config, nPlayer) {
	bullet = ALVAR.bullets;
	jugador = ALVAR.jugador;
	let i = 0;
	while (i < config.NUM_BULLETS) {
		if(bullet[i].lives <= 0) {
			bullet[i].speed_y = -2;
			bullet[i].angle = 0;
			bullet[i].player = nPlayer;
			if (!bulletSelection) {
				bullet[i].bulletImage = 0;
				jugador[nPlayer].maxFrame = 10;
				jugador[nPlayer].animationRow = 1;
				jugador[nPlayer].curFrame = 0;
				jugador[nPlayer].frameCount = 0;
				bullet[i].direction = bulletDirection;
				play_sample(bullet[i].bulletSound, 0.4, 1, false);
				bullet[i].xi = config.FONDO_X;
				bullet[i].x = jugador[nPlayer].x + jugador[nPlayer].frameWidth/2 * -(jugador[nPlayer].animationDirection - 1);
				bullet[i].y = config.SCREEN_H + (jugador[nPlayer].y - (jugador[nPlayer].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h))/1.75);
				bullet[i].lives = 1;
				break;
			}
			else {
				bullet[i].bulletImage = 1;
				jugador[nPlayer].maxFrame = 5;
				jugador[nPlayer].animationRow = 2;
				jugador[nPlayer].curFrame = 0;
				jugador[nPlayer].frameCount = 0;
				bullet[i].direction = bulletDirection;
				bullet[i].xi = config.FONDO_X;
				bullet[i].x = jugador[nPlayer].x + jugador[nPlayer].frameWidth/2 * -(jugador[nPlayer].animationDirection - 1);
				bullet[i].y = config.SCREEN_H + (jugador[nPlayer].y - jugador[nPlayer].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h));
				bullet[i].lives = 1;
				break;
			}
		}
		i++;
	}
}

function UpdateBullet(bullet, explosions, config) {
	let i = 0;
	while (i < config.NUM_BULLETS) {
		if(bullet[i].lives > 0) {
			if (bullet[i].bulletImage) {
				bullet[i].angle -= 0.1 * bullet[i].direction;
				bullet[i].y += bullet[i].speed_y*2;
				bullet[i].speed_y += 0.2;
				bullet[i].x += (bullet[i].speed/3) * bullet[i].direction;
			}
			else {
				bullet[i].x += (bullet[i].speed) * bullet[i].direction;
			}
			if(bullet[i].x + bullet[i].xi - config.FONDO_X > config.SCREEN_W || bullet[i].x + bullet[i].xi - config.FONDO_X < 0) {														// Si la bala llega a cualquier borde
					bullet[i].lives = 0;
			}
			else if (bullet[i].y > config.SCREEN_H-config.ground) {
				StartExplosions(explosions, bullet[i].x  + bullet[i].xi - config.FONDO_X, bullet[i].y, 1, config);
				bullet[i].lives = 0;
			}
		}
		i++;
	}
}

function CollideBullet(ALVAR, config) {
	bullet = ALVAR.bullets;
	enemies = ALVAR.enemies;
	jugador = ALVAR.jugador;
	enemiesDead = ALVAR.enemiesDead;
	explosions = ALVAR.explosions;
	let i = 0;
	let col = 0;
	while (i < config.NUM_BULLETS) {
		if(bullet[i].lives > 0) {
			let j = 0;
			while (j < config.NUM_ENEMIES) {
				if(enemies[j].lives > 0) {
					if(bullet[i].x > (enemies[j].x - enemies[j].boundx*enemies[j].animationDirection) && bullet[i].x < (enemies[j].x + enemies[j].boundx) && bullet[i].y > (enemies[j].y - enemies[j].boundy) && bullet[i].y < enemies[j].y) {
						// Si hay colision con un enemigo
						bullet[i].lives--;
						if (bullet[i].bulletImage){																							// Si es una granada
							enemies[j].lives -= 2;																								// La granada hace doble daño
							col = 1;
						}
						else {																																	// Si es una bala
							enemies[j].lives--;
						}
						if (enemies[j].lives <= 0) {																					// Si el enemigo "muere"
							jugador[bullet[i].player].score++;
							StartEnemyDead(enemiesDead, enemies, j, config);
						}
						if (!bullet[i].bulletImage) {																						// Si es una bala
							break;																																// La bala colisiona con un solo enemigo y la granada en "area"
						}
					}
				}
				j++;
				if (col && j == config.NUM_ENEMIES) {																			// Si la granada ya colisiono con todos los enemigos en esa posicion
					StartExplosions(explosions, bullet[i].x, bullet[i].y, 1, config);
					col = 0;
				}
			}
		}
		i++;
	}
}