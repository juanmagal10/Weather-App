require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");



const main = async () => {
    const busquedas = new Busquedas();

    let opt;
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                
                //buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                //seleccionar lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id)

                busquedas.agregarHistorial(lugarSel.nombre)
               

                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)


                //mostrar los resultados

                console.log('\n Informacion del la ciudad\n'.green)
                console.log('ciudad:',lugarSel.nombre.blue )
                console.log('lat',lugarSel.lat )
                console.log('long',lugarSel.lng )
                console.log('temp: ', clima.temp )
                console.log('minima', clima.min )
                console.log('maxima', clima.max)
                console.log('descripcion del clima: ', clima.desc.green)
                break
            
            case 2:
                //busquedas.historialCapitalizado
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx =`${i+1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
                break
        }
        
        if(opt!==0)await pausa();
        
    }while(opt!==0)
   
    
    

}

main()