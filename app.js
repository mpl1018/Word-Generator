const app = new Vue ({
    el: '#app',
    data: {
        titulo: 'Freestyle Generator',
        lista_palabras: null,
        palabra: null,
        intervalo_tiempo: 30, 
        intervalo_tiempo_str: '30', 
        palabras_app: {
            castellano: 'Castellano', 
            ingles: 'Inglés', 
            idioma_app: 'Idiomas',
            facil: 'Fácil', 
            dificil: 'Difícil',
            empezar: 'Vamos allá'
        },
        activo_castellano: 'active', 
        activo_ingles: '',
        barra: {
            color_progress: 'bg-success',
            porcentaje: 0,
        },
        interval_var: null, 
        interval_pulsado: false, 
        
    },
    methods: {
        nueva_palabra (){
            let nueva_palabra = this.lista_palabras.data[Math.floor(Math.random()*(this.lista_palabras.data.length))].palabra;
            while (nueva_palabra === this.palabra){
                nueva_palabra = this.lista_palabras.data[Math.floor(Math.random()*(this.lista_palabras.data.length))].palabra;
            }
            this.palabra = nueva_palabra;
        },
        pasar_a_ingles (){
            this.activo_castellano = '';
            this.activo_ingles = 'active';
            this.palabras_app.idioma_app = 'Languages'; 
            this.palabras_app.castellano = 'Spanish'; 
            this.palabras_app.ingles = 'English'; 
            this.palabras_app.facil = 'Easy'; 
            this.palabras_app.dificil = 'Hard';
            this.palabras_app.empezar = 'Lets go!';
            //traemos las palabras
            axios 
                .get('words.json')
                .then(response => (this.lista_palabras = response))
            
            //this.nueva_palabra();
        },
        pasar_a_castellano (){
            this.activo_castellano = 'active';
            this.activo_ingles = '';
            this.palabras_app.idioma_app = 'Idiomas'; 
            this.palabras_app.castellano = 'Castellano'; 
            this.palabras_app.ingles = 'Inglés';
            this.palabras_app.facil = 'Fácil'; 
            this.palabras_app.dificil = 'Difícil';
            this.palabras_app.empezar = 'Vamos allá';

            //traemos las palabras
            axios 
                .get('palabras.json')
                .then(response => (this.lista_palabras = response))
            
            //this.nueva_palabra();
        },
        cambiar_tiempo (v){
            clearInterval(this.interval_var); 
            //aumentamos 
            if (v===1 && this.intervalo_tiempo<60){
                ++this.intervalo_tiempo;
            }
            else if (v===0 && this.intervalo_tiempo>1){
                --this.intervalo_tiempo;
            }
            this.intervalo_tiempo_str = this.intervalo_tiempo.toString();
            this.barra.porcentaje =  Math.round((this.intervalo_tiempo/60)*100);
            if (this.barra.porcentaje < 25) this.barra.color_progress = 'bg-danger'; 
            else if (this.barra.porcentaje <75) this.barra.color_progress = 'bg-warning'; 
            else this.barra.color_progress = 'bg-success';
            this.interval_var = setInterval (this.nueva_palabra, this.intervalo_tiempo*1000);
        },
        //temporizador para aumentar y disminuir cuando el botón esta pulsado seguido
        start (x){
            //si x==0 disminuimos
            if (!this.interval_pulsado){
                if (x==0)
                    this.interval_pulsado = setInterval (() => this.cambiar_tiempo(0), 50); 
                else 
                    this.interval_pulsado = setInterval (() => this.cambiar_tiempo(1), 50);
            }
        },
        stop (){
            clearInterval(this.interval_pulsado);
            this.interval_pulsado = false;
        }
    },
    mounted (){
        this.interval_var = setInterval (this.nueva_palabra, this.intervalo_tiempo*1000); 
        this.cambiar_tiempo(2);
        //traemos las palabras
        axios 
            .get('palabras.json')
            .then(response => (this.lista_palabras = response))
    },
});


(function() {
	var w = document[typeof document.getElementsByClassName === 'function' ? 'getElementsByClassName' : 'querySelectorAll']('deezer-widget-player');
	for (var i = 0, l = w.length; i < l; i++) {
		w[i].innerHTML = '';
		var el = document.createElement('iframe');
		el.src = w[i].getAttribute('data-src');
		el.scrolling = w[i].getAttribute('data-scrolling');
		el.frameBorder = w[i].getAttribute('data-frameborder');
		el.setAttribute('frameBorder', w[i].getAttribute('data-frameborder'));
		el.allowTransparency = w[i].getAttribute('data-allowTransparency');
		el.width = w[i].getAttribute('data-width');
		el.height = w[i].getAttribute('data-height');
		w[i].appendChild(el);
	}
}());