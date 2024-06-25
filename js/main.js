function main()
{
	// Cargar datos de score desde localStorage (analogia a la lista y file de C)
	p = {};
	// cargarDatos(p);

	// Inicializo configuracion
	const config = {
		SCREEN_W: 680,		// Ancho de la ventana inicial
		SCREEN_H: 382,		// Altura del fondo inicial
		NUM_PLAYERS: 2,		// Jugadores maximos inicial
		NUM_BULLETS: 10,	// Balas maximas en pantalla
		NUM_ENEMIES: 4,		// Enemigos maximos en pantalla
		NUM_ENEMIESDEAD: 10,	// Efectos de enemigos muertos maximos en pantalla
		NUM_EXPLOSIONS: 20,	// Explosiones maximas en pantalla
		gameOverWidth: 800,	// Ancho de la imagen de Game over
		gameOverHeight: 300,	// Altura de la imagen de Game over (No depende de nada, se autoescala)
		FPS: 60,		// FPS
		font: 10,		// Tamaño de la fuente
		ground: 100,		// Piso del juego
		NUM_E_BULLETS: 10,	// Balas de enemigos maximas en pantalla
		FONDO_X: 0,		// Inicio del fondo (se usa para recorrerlo)
		FONDO_W: 3054,		// Variable para establecer el fin del fondo	// al_get_bitmap_width
		FONDO_H: 224,		// Variable para establecer la altura del fondo	// al_get_bitmap_height
		id: "game_canvas",	// Id del HRML tag canvas
		screen_sate: 0		// Pantalla actual
	};

	const ALVAR = {
		titleScreenImage: load_bitmap("./assets/img/titleScreen.png"),	// Cargar imagen del title Screen
		menuImage: load_bitmap("./assets/img/menu.png"),		// Cargar imagen del menu
		okaySound: load_sample("./assets/sound/Okay.wav"),		// Cargar sonido de okay
		menuSound: load_sample("./assets/sound/Menu.wav"),		// Cargar sonido del menu
		///okaySound: new Audio('./assets/sound/Okay.wav'),		// Cargar sonido de okay
		///menuSound: new Audio('./assets/sound/Menu.wav'),		// Cargar sonido del menu
		rechargeSound: load_sample("./assets/sound/Recharge.wav")	// Cargar sonido de recargar
		///rechargeSound: new Audio('./assets/sound/Recharge.wav')	// Cargar sonido de recargar
	};

	enable_debug('debug');

	allegro_init_all(config.id,config.SCREEN_W,config.SCREEN_H);

	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			switch(config.screen_sate) {
				
				case 0:
				title_screen(config, ALVAR);
				break;

				case 1:
				menu_screen(config, ALVAR, p);
				break;

			}
			
			// update();
			// draw();
		},BPS_TO_TIMER(config.FPS));
	});
	return 0;
}

END_OF_MAIN();

