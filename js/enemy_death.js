function InitEnemyDead(enemiesDead, image, sound, config) {
	let i = 0;
	while (i < config.NUM_ENEMIESDEAD){
		enemiesDead.push({
			lives : 0,
			maxFrame : 15,
			curFrame : 0,
			frameCount : 0,
			frameDelay : 2,
			frameWidth : 80,
			frameHeight : 50,
			animationRow : 4,
			animationDirection : 0,
			image : image,
			sound : sound
		})
		i++;
	}
}

// void InitEnemyDead_LEVEL2(EnemyDead enemiesDead[], ALLEGRO_BITMAP *image, ALLEGRO_SAMPLE *sound, CFG *config) {
// 	int i = 0;
// 	while (i < config->NUM_ENEMIESDEAD){
// 			enemiesDead[i].lives = 0;
// 			enemiesDead[i].animationDirection = 0;
// 			enemiesDead[i].image = image;
// 			enemiesDead[i].sound = sound;
// 			i++;
// 	}
// }

function DrawEnemyDead(ALVAR, config) {
	let enemiesDead = ALVAR.enemiesDead;
	let i = 0;
	while (i < config.NUM_ENEMIESDEAD) {
		if(enemiesDead[i].lives > 0) {
			let fx = enemiesDead[i].curFrame * enemiesDead[i].frameWidth;
			let fy = enemiesDead[i].animationRow * enemiesDead[i].frameHeight;
			stretch_blit(enemiesDead[i].image,canvas,fx,fy,enemiesDead[i].frameWidth,enemiesDead[i].frameHeight,enemiesDead[i].x /*+ jugador[i].ajuste + 40*ALVAR.jugador[i].animationDirection*/, config.SCREEN_H + enemiesDead[i].y,enemiesDead[i].frameWidth*(config.SCREEN_H/ALVAR.fondoImage.h),enemiesDead[i].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h),enemiesDead[i].animationDirection);
		}
		i++;
	}
}

function StartEnemyDead(ALVAR, j, config) {
	let enemiesDead = ALVAR.enemiesDead;
	let enemies = ALVAR.enemies;
	let i = 0;
	while (i < config.NUM_ENEMIESDEAD) {
		if(enemiesDead[i].lives <= 0) {
			enemiesDead[i].lives = 1;
			enemiesDead[i].x = enemies[j].x - enemies[j].ajuste/2;													// -20 porque el frame esta corrido 20 pixeles
			enemiesDead[i].y = enemies[j].y - enemies[j].frameHeight*(config.SCREEN_H/ALVAR.fondoImage.h);
			enemiesDead[i].animationDirection = enemies[j].animationDirection;
			play_sample(enemiesDead[i].sound,0.4,1,false);
			break;
		}
		i++;
	}
}

function UpdateEnemyDead(enemiesDead, config) {
	let i = 0;
	while (i < config.NUM_ENEMIESDEAD) {
		if(enemiesDead[i].lives > 0) {
			enemiesDead[i].frameCount++;
			if(enemiesDead[i].frameCount >= enemiesDead[i].frameDelay) {
				enemiesDead[i].curFrame++;
				enemiesDead[i].frameCount = 0;
				if(enemiesDead[i].curFrame >= enemiesDead[i].maxFrame) {
					enemiesDead[i].curFrame = 0;
					enemiesDead[i].lives = 0;
				}
			}
		}
		i++;
	}
}