var Eventos = {


	popup_cargar: 	
						
						'<div id="cargarEventos"  style="display:none;"> \
						<form name="datos" action="" method="POST" target="_blank">\
						Titulo: <div class="Pop-Titulo"> <input type="text" name="nombre"> </div>\
						<p>Date: <input type="text" id="datepicker"></p><br>\
						Descripcion: <div class="PopDescripcion"> <input type="text" name="descripcion" class="pop-descripcion"><br> </div>\
						Categoria: <div class="Pop-Categoria"> <br><select id="agregarCategorias"  multiple="multiple" size="5"></select><br> </div>\
						Pais: <div class="Pop-Pais"> <br><select id="agregarPaises" multiple="multiple" size="5"></select><br><br></div>\
						<input type="submit" value="enviar">    <input type="reset" value="borrar">\
						</form>\
						</div>'
						,

	

	filtrar: function (fecha_desde, fecha_hasta, ponderacion, filtros) {
		var deferred = $.Deferred();
		var consulta = $.getJSON('datos/datos-ext.json');
		
		consulta.success(function (eventos) {
			var query = Enumerable
				.From(eventos)
				.Where(function (x) { 
					var fecha = x.fecha.parseDate();
					var rango = x.ponderacion <= ponderacion &&  fecha_desde <= fecha && fecha <= fecha_hasta;
					
					var categorias = filtros.categorias === null || 
									filtros.categorias.filter(function (val) { return val === x.categoria }).length !== 0;
					
					var paises = filtros.paises === null || 
									filtros.paises.filter(function (val) { return val === x.pais }).length !== 0;
									
					return rango && categorias && paises;
				})
				.ToArray();
				
			deferred.resolve({
			 	success: true,
			 	errors: null,
				eventos: query
			});
		});
		
		consulta.error(function () {
			deferred.resolve({
			 	success: false,
			 	errors: "Se ha producido una error en la carga de datos",
				eventos: null
			});
		});
		
		return deferred.promise();
	},

	cargar: function () {

		popup = Eventos.popup_cargar
			


		$('body').append(popup);
		$('#cargarEventos').dialog();
		$('#cargarEventos').dialog( "option", "width", 600);
		$('#cargarEventos').dialog( "option", "height", 450);
		$('#cargarEventos').on("dialogclose", function( event, ui ) { Eventos.ocultar_popup(); } )     
},

		ocultar_popup: function () {
		//Elimina el div que contiene el popup
		$('#cargarEventos').remove();		
	}
};
