function AL_INIT (config, ALVAR) {

	/**CFG*/
	config.SCREEN_W = 680;		// Ancho de la ventana inicial
	config.SCREEN_H = 382;		// Altura del fondo inicial
	config.NUM_PLAYERS = 2;		// Jugadores maximos inicial
	config.NUM_BULLETS = 10;	// Balas maximas en pantalla
	config.NUM_ENEMIES = 4;		// Enemigos maximos en pantalla
	config.NUM_ENEMIESDEAD = 10;	// Efectos de enemigos muertos maximos en pantalla
	config.NUM_EXPLOSIONS = 20;	// Explosiones maximas en pantalla
	config.gameOverWidth = 800;	// Ancho de la imagen de Game over
	config.gameOverHeight = 300;	// Altura de la imagen de Game over (No depende de nada, se autoescala)
	config.FPS = 50;		// FPS
	config.font = 10;		// Tamaño de la fuente
	config.ground = 100;		// Piso del juego
	config.NUM_E_BULLETS = 10;	// Balas de enemigos maximas en pantalla
	//config.NUM_E_BULLETS = config.NUM_ENEMIES;	// -> Balas de enemigos maximas en pantalla (problema cuando no es la misma cantidad de enemigos?) FIXED?
	config.FONDO_X = 0;		// Inicio del fondo (se usa para recorrerlo)
	config.FONDO_W = 3054;		// Variable para establecer el fin del fondo	// al_get_bitmap_width
	config.FONDO_H = 224;		// Variable para establecer la altura del fondo	// al_get_bitmap_height

	/* Nuevo: se agregan variables necesarias para adaptar logica de C a JS */
	config.id = "game_canvas";	// Id del HRML tag canvas
	config.screen_state = 0;	// Pantalla actual
	config.delay_state = 99;	// Estado que simula un delay
	config.delay = 0;		// Tiempo de delay
	config.delay_screen_state;	// Estado cuando finalice el delay
	config.delay_fn_exec;		// Funcion que se ejecuta cuando finaliza el delay
	config.buffer = [];		// Buffer para cargar lo enviado por cliente (jugador 2)
	config.keyP1 = [];		// Datos de teclas presionadas por servidor (jugador 1)
	config.keyP2 = [];		// Datos de teclas presionadas por cliente (jugador 2)
	config.netCount = 0;		// Contador para refrescar conexion con cliente (jugador 2)
	//config.net = false;		// Estado de conexion con cliente (jugador 2) (se esta controlando por NUM_PLAYERS)

	/**Iniciacion de componentes basicos de allegro*/
	ALVAR.fondoImage = load_bitmap("./assets/img/Fondo1.png");				// Cargar imagen del fondo 1
	ALVAR.playerImage = load_bitmap("./assets/img/MarcoRossi - Body.png");	// Cargar imagen del player
	ALVAR.bulletImage = load_bitmap("./assets/img/bullet-machingun.png");	// Cargar imagen de la bala
	ALVAR.m1start = load_sample( "./assets/sound/MisionOneStart.wav" );	// Cargar sonido de inicio de mision 1
	ALVAR.bulletSound = load_sample("./assets/sound/bulletSound.wav");	// Cargar sonido de la bala
	ALVAR.music1 = load_sample( "./assets/sound/Music1.wav" );	// Cargar sonido de la mision 1
	//ALVAR->font = load_ttf_font("./assets/pirulen.ttf", config->font, 0);	// Cargar fuente
	ALVAR.foot_playerImage = load_bitmap("./assets/img/MarcoRossi - Foot.png");	// Cargar imagen de los pies del player
	ALVAR.gameOverImage = load_bitmap("./assets/img/GameOver.png");				// Cargar imagen del fin del juego
	ALVAR.gameOverSound = load_sample( "./assets/sound/gameOverSound.wav" );	// Cargar sonido del fin del juego
	ALVAR.enemyImage = load_bitmap("./assets/img/RebelSoldier.png");	// Cargar imagen del enemigo
	ALVAR.grenadeImage = load_bitmap("./assets/img/grenade.png");	// Cargar imagen de la granada
	ALVAR.rocketImage = load_bitmap("./assets/img/rocket.png");	// Cargar imagen del cohete
	ALVAR.explosionImage = load_bitmap("./assets/img/Explosions.png");	// Cargar imagen de las explosiones
	ALVAR.enemyDeadSound = load_sample("./assets/sound/enemyDead.wav");	// Cargar sonido de las muertes de enemigos
	ALVAR.explosionSound = load_sample("./assets/sound/explosion.wav");	// Cargar sonido de las explosiones
	ALVAR.playerGrenadeImage = load_bitmap("./assets/img/playerGrenade.png");	// Cargar imagen de la granada del jugador
	ALVAR.titleScreenImage = load_bitmap("./assets/img/titleScreen.png");			// Cargar imagen del title Screen
	ALVAR.menuImage = load_bitmap("./assets/img/menu.png");					// Cargar imagen del menu
	ALVAR.selectionImage = load_bitmap("./assets/img/soldierSelection.png"),		// Cargar imagen de soldier selection
	ALVAR.okaySound = load_sample("./assets/sound/Okay.wav");				// Cargar sonido de okay
	ALVAR.menuSound = load_sample("./assets/sound/Menu.wav");				// Cargar sonido del menu
	ALVAR.rechargeSound = load_sample("./assets/sound/Recharge.wav");			// Cargar sonido de recargar
	ALVAR.soldierSelectionSound = load_sample("./assets/sound/soldierSelection.wav");	// Cargar sonido de seleccion de personaje
	ALVAR.marcoSound = load_sample("./assets/sound/Marco.wav");				// Cargar sonido de seleccion de marco
	ALVAR.tarmaSound = load_sample("./assets/sound/Tarma.wav");				// Cargar sonido de seleccion de tarma
	ALVAR.swapSelectionSound = load_sample("./assets/sound/swapSelection.wav");		// Cargar sonido de cambio de seleccion
	ALVAR.player2Image = load_bitmap("./assets/img/TarmaRoving - Body.png");	// Cargar segunda imagen del player

	/* Nuevo: se agregan estos los structs de C como array de objetos dentro de ALVAR en JS */
	ALVAR.jugador = [];
	ALVAR.bullets = [];
	ALVAR.enemies = [];
	ALVAR.enemiesDead = [];
	ALVAR.enemiesBullet = [];
	ALVAR.explosions = [];

}