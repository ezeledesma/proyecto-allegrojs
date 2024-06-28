function InitExplosions(explosions, image, sound, config) {
	let i = 0;
	while (i < config.NUM_EXPLOSIONS) {
		explosions.push({
			lives : 0,
			maxFrame : 8,
			curFrame : 0,
			frameCount : 0,
			frameDelay : 2,
			frameWidth : 40,
			frameHeight : 50,
			animationRow : 0,
			image : image,
			sound : sound
		})
		i++;
	}
}

function DrawExplosions(explosions, config) {
	let i = 0;
	while (i < config.NUM_EXPLOSIONS) {
		if(explosions[i].lives > 0) {
			let fx = explosions[i].curFrame * explosions[i].frameWidth;
			let fy = explosions[i].animationRow * explosions[i].frameHeight;
			if (!explosions[i].animationRow) {
				//al_draw_bitmap_region(explosions[i].image, fx, fy, explosions[i].frameWidth, explosions[i].frameHeight, explosions[i].x, explosions[i].y, 0);
				blit(explosions[i].image,canvas,fx,fy,explosions[i].x + explosions[i].xi - config.FONDO_X,explosions[i].y,explosions[i].frameWidth,explosions[i].frameHeight);
			}
			else {
				//al_draw_bitmap_region(explosions[i].image, fx, fy, explosions[i].frameWidth, explosions[i].frameHeight*3, explosions[i].x - explosions[i].frameWidth/2, explosions[i].y-explosions[i].frameHeight*2, 0);
				blit(explosions[i].image,canvas,fx,fy,explosions[i].x - explosions[i].frameWidth/2 + explosions[i].xi - config.FONDO_X,explosions[i].y-explosions[i].frameHeight*2,explosions[i].frameWidth,explosions[i].frameHeight*3);
			}
		}
		i++;
	}
}

function StartExplosions(explosions, x, y, selection, config) {
	let i = 0;
	while (i < config.NUM_EXPLOSIONS) {
		if(explosions[i].lives <= 0) {
			if (!selection) {
				explosions[i].maxFrame = 8;
				explosions[i].curFrame = 0;
				explosions[i].frameCount = 0;
				explosions[i].frameDelay = 2;
				explosions[i].frameWidth = 40;
				explosions[i].frameHeight = 50;
				explosions[i].animationRow = 0;
			}
			else {
				explosions[i].maxFrame = 27;
				explosions[i].curFrame = 0;
				explosions[i].frameCount = 0;
				explosions[i].frameDelay = 2;
				explosions[i].frameWidth = 80;
				explosions[i].frameHeight = 50;
				explosions[i].animationRow = 1;
			}
			explosions[i].lives = 1;
			explosions[i].xi = config.FONDO_X; 
			explosions[i].x = x;
			explosions[i].y = y;
			play_sample(explosions[i].sound, 0.4, 1, false);
			break;
		}
		i++;
	}
}

function UpdateExplosions(explosions, config) {
	let i = 0;
	while (i < config.NUM_EXPLOSIONS) {
		if(explosions[i].lives > 0) {
			explosions[i].frameCount++;
			if(explosions[i].frameCount >= explosions[i].frameDelay) {
				explosions[i].curFrame++;
				explosions[i].frameCount = 0;
				if(explosions[i].curFrame >= explosions[i].maxFrame) {
					explosions[i].curFrame = 0;
					explosions[i].lives = 0;
				}
			}
		}
		i++;
	}
}