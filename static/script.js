document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Manejo de la Secuencia de Animación
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer34 = document.querySelector('.layer-3-4');
    
    // Al hacer clic en cualquier parte de la carta inicial
    layer1.addEventListener('click', () => {
        
        // Fase 1: Desaparecer Capa 1
        layer1.classList.remove('active');
        
        // Fase 2: Aparecer Capa 2 (Tronco) después de un pequeño retraso
        setTimeout(() => {
            layer2.classList.add('active');
        }, 1000); // 1 segundo después de que desaparece la 1
        
        // Fase 3: Desaparecer Capa 2 y Aparecer Capa 3-4 (Árbol y Contador)
        setTimeout(() => {
            layer2.classList.remove('active');
            
            // Esperar a que desaparezca la 2 antes de mostrar la 3
            setTimeout(() => {
                layer34.classList.add('active');
                
                // Iniciar el contador real una vez que la capa es visible
                iniciarContadorReal();
                
            }, 1000); // 1 segundo después de que la 2 se vuelve invisible
            
        }, 3000); // El tronco se muestra por 3 segundos
        
    });
    
    // 2. Lógica del Contador Real
    let intervaloContador;

    function iniciarContadorReal() {
        const fechaInicio = new Date(FECHA_INICIO_AMOR);
        const contenedorTiempo = document.getElementById('tiempo-amor');

        function actualizar() {
            const ahora = new Date();
            const diferenciaMs = ahora - fechaInicio;

            // Cálculos
            const msPorSegundo = 1000;
            const msPorMinuto = msPorSegundo * 60;
            const msPorHora = msPorMinuto * 60;
            const msPorDia = msPorHora * 24;

            const dias = Math.floor(diferenciaMs / msPorDia);
            const horas = Math.floor((diferenciaMs % msPorDia) / msPorHora);
            const minutos = Math.floor((diferenciaMs % msPorHora) / msPorMinuto);
            const segundos = Math.floor((diferenciaMs % msPorMinuto) / msPorSegundo);

            // Formatear texto
            contenedorTiempo.innerHTML = `
                ${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos
            `;
        }

        // Ejecutar inmediatamente y luego cada segundo
        actualizar();
        intervaloContador = setInterval(actualizar, 1000);
    }
});