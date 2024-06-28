function main()
{
	// Cargar datos de score desde localStorage (analogia a la lista y file de C)
	p = {};
	// cargarDatos(p);

	const config = {};
	const ALVAR = {};

	AL_INIT(config, ALVAR);

	enable_debug('debug');

	allegro_init_all(config.id,config.SCREEN_W,config.SCREEN_H);

	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(0,0,0));
			switch(config.screen_state) {
				
				case 0:
				title_screen(config, ALVAR);
				break;

				case 1:
				menu_screen(config, ALVAR, p);
				break;

				case 2:
				selection_screen(config, ALVAR);
				break;

				case 3:
				gameLoop(config, ALVAR, p);
				break;

				case 4:
				leader_screen(config, ALVAR);
				break;

				case config.delay_state:
				delay(config);
				break;

			}
		},BPS_TO_TIMER(config.FPS));
	});
	return 0;
}

END_OF_MAIN();

