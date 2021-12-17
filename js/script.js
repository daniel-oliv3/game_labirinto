(function(){
	//elemento canvas e contexto de renderização
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");

	var WIDTH = cnv.width, HEIGHT = cnv.height;

	//movimentação do personagem
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var mvLeft = mvUp = mvRight = mvDown = false;
	
	//tamanho dos blocos
	var tileSize = 32;

	var walls = [];

	//Personagem
	var player = {
		x: tileSize + 2,
		y: tileSize + 2,
		width: 28,
		height: 28,
		speed: 2
	};
	
	//mapa do labirinto
	var maze = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	for(var row in maze){
		for(var column in maze){
			var tile = maze[row][column];
			if(tile === 1){
				var wall = {
					x: tileSize*column,
					y: tileSize*row,
					width: tileSize,
					height: tileSize
				};
				walls.push(wall);
			}
		}
	}

	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("keyup", keyupHandler, false);

	function keydownHandler(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case UP:
				mvUp = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case DOWN:
				mvDown = true;
				break;		
		}
	}

	function keyupHandler(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case UP:
				mvUp = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case DOWN:
				mvDown = false;
				break;		
		}
	}

    //atualização cíclica do programa
	function update(){
		if(mvLeft && !mvRight){
			player.x -= player.speed;
		}else
		if(mvRight && !mvLeft){
			player.x += player.speed;
		}
		if(mvUp && !mvDown){
			player.y -= player.speed;
		}else
		if(mvDown && !mvUp){
			player.y += player.speed;
		}

		//verificando colizão
		for(var i in walls){
			var wall = walls[i];
			blockRectangle(player.wall);
		}
	}
	
	//renderização (desenha na tela)
	function render(){
		ctx.clearRect(0,0,WIDTH, HEIGHT);
        ctx.save();
		//procedimento que varre as linhas e colunas do labirinto
		for(var row in maze){
			for(var column in maze){
				//pega o elemento armazenado em uma determinada linha/coluna
				var tile = maze[row][column];
				//se for um tijolo...
				if(tile === 1){
					//...especifica as dimensões e a posição...
					var x = column*tileSize;
					var y = row*tileSize;
					//...e desenha na tela
					ctx.fillRect(x,y,tileSize,tileSize);
				}
			}
		}

        //personagem
        ctx.fillStyle = "#00f";
        ctx.fillRect(player.x,player.y,player.width,player.height);
        ctx.restore();
	}
	
	function loop(){
		update();
		render();
		requestAnimationFrame(loop,cnv);
	}
	
	requestAnimationFrame(loop,cnv);
}());