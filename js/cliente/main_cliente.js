function main()
{
	const config = {
		FPS : 50,
		SCREEN_W : 640,
		SCREEN_H : 410,
		id : "game_canvas"
	};

	const ALVAR = {
		aImage : load_bitmap("./assets/cliente/a.png"),
		sImage : load_bitmap("./assets/cliente/s.png"),
		escImage : load_bitmap("./assets/cliente/esc.png"),
		spaceImage : load_bitmap("./assets/cliente/space.png"),
		arrowImage : load_bitmap("./assets/cliente/arrow.png")
	};

	const keys = {
			left:false,
			right:false,
			escape:false,
			space:false,
			s:false,
			a:false
	};

	let send = false;
	let buffer = [];

	enable_debug('debug');

	allegro_init_all(config.id,config.SCREEN_W,config.SCREEN_H);

	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(0,0,0));

			if(key[37] && pressed[37]) {	// Left (down)
				keys.left = true;
				send = true;
			}
			else if (!key[37]) {		// Left (up)
				keys.left = false;
				send = true;
			}
			
			if(key[39] && pressed[39]) {	// Right (down)
				keys.right = true;
				send = true;
			}
			else if (!key[39]) {		// Right (up)
				keys.right = false;
				send = true;
			}
			
			if(key[27] && pressed[27]) {	// Escape (down)
				keys.escape = true;
				send = true;
			}
			else if (!key[27]) {		// Escape (up)
				keys.escape = false;
				send = true;
			}
			
			if(key[32] && pressed[32]) {	// Space (down)
				keys.space = true;
				send = true;
			}
			else if (!key[32]) {		// Space (up)
				keys.space = false;
				send = true;
			}
			
			if(key[83] && pressed[83]) {	// S (down)
				keys.s = true;
				send = true;
			}
			else if(!key[83]) {		// S (up)
				keys.s = false;
				send = true;
			}
			
			if(key[65] && pressed[65]) {	// A (down)
				keys.a = true;
				send = true;
			}
			else if (!key[65]) {		// A (up)
				keys.a = false;
				send = true;
			}

			if(!keys.escape) {
				draw_sprite(canvas,ALVAR.escImage,ALVAR.escImage.w/2 + 5,ALVAR.escImage.h/2 + 5);
			}

			if(!keys.left) {
				draw_sprite(canvas,ALVAR.arrowImage,ALVAR.arrowImage.w/2 + 305,ALVAR.arrowImage.h/2 + 155);
			}

			if(!keys.right) {
				draw_sprite(canvas,ALVAR.arrowImage,ALVAR.arrowImage.w/2 + 405,ALVAR.arrowImage.h/2 + 155);
			}

			if(!keys.space) {
				draw_sprite(canvas,ALVAR.spaceImage,ALVAR.spaceImage.w/2 + 5,ALVAR.spaceImage.h/2 + 305);
			}

			if(!keys.s) {
				draw_sprite(canvas,ALVAR.sImage,ALVAR.sImage.w/2 + 105,ALVAR.sImage.h/2 + 155);
			}

			if(!keys.a) {
				draw_sprite(canvas,ALVAR.aImage,ALVAR.aImage.w/2 + 5,ALVAR.aImage.h/2 + 155);
			}
			
			if(send) {
				write(buffer, keys);
				send = false;
			}

		},BPS_TO_TIMER(config.FPS));
	});
	return 0;
}

END_OF_MAIN();

