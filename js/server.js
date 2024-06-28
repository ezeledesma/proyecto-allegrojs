const urlServer = "https://test-api-lime-mu.vercel.app/";
//const urlServer = "http://localhost:8080/";

function get_network_data(buffer) {
	try {
		fetch(urlServer
			,{
				method: "post",
				headers: {
					"Content-Type": "application/json"
				}
				// ,body: JSON.stringify({
				// 	tipo:"read",
				// 	data:	{
				// 		datos:"aca irian datos (con tipo:write)"
				// 		}
				// })
			}
		)
		.then(response => response.json())
		.then((res) => {
			buffer.pop();
			buffer.push(res);
		})
	}
	catch {
		buffer = {};
		console.log("Error al conectar con el Servidor");
	}
}

function write(buffer, data) {
	try {
		fetch(urlServer
			,{
				method: "post",
				headers: {
					"Content-Type": "application/json"
				}
				,body: JSON.stringify({
					tipo:"write",
					data: data
				})
			}
		)
		.then(response => response.json())
		.then((res) => {
			buffer.pop();
			buffer.push(res);
		})
	}
	catch {
		buffer = {};
		console.log("Error al conectar con el Servidor");
	}
}