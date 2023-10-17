// Declaración de la variable que almacena los discos
let discos = [];

// Función para obtener los discos del almacenamiento local o crear discos de ejemplo si no existen
function getDiscos() {
  const discosEnLocalStorage = JSON.parse(localStorage.getItem("discos"));

  if (discosEnLocalStorage) {
    discos = discosEnLocalStorage;
  } else {
    discos = [];
    localStorage.setItem("discos", JSON.stringify(discos));
  }
}

// Función para cargar un nuevo disco
function Cargar() {
  let nombreDisco = prompt("Nombre del disco:");
  let autorDisco = prompt("Autor o banda del disco:");
  let codigoDisco;

  // Validación del código único del disco
  while (true) {
    codigoDisco = parseInt(
      prompt("Código numérico único del disco (entre 1 y 999):")
    );
    const discoExistente = buscarDiscoPorCodigo(codigoDisco);
    if (codigoDisco >= 1 && codigoDisco <= 999 && !discoExistente) {
      break;
    } else if (discoExistente) {
      alert("El código ya ha sido utilizado. Ingrese otro código.");
    } else {
      alert("Por favor, ingrese un código válido (entre 1 y 999).");
    }
  }

  const nuevoDisco = {
    Nombre: nombreDisco,
    Autor: autorDisco,
    Codigo: codigoDisco,
    Pistas: [],
  };

  // Agregar pistas al nuevo disco
  while (true) {
    let nombrePista = prompt("Nombre de la pista:");
    if (!nombrePista) {
      alert("El nombre de la pista no puede quedar vacío.");
      continue;
    }

    let duracionPista;
    while (true) {
      duracionPista = parseInt(
        prompt("Duración de la pista en segundos (0 - 7200):")
      );
      if (duracionPista >= 0 && duracionPista <= 7200) {
        break;
      } else {
        alert(
          "Por favor, ingrese una duración válida (entre 0 y 7200 segundos)."
        );
      }
    }

    nuevoDisco.Pistas.push({
      Nombre: nombrePista,
      Duracion: duracionPista,
    });

    const continuar = confirm("¿Desea ingresar otra pista?");
    if (!continuar) {
      break;
    }
  }

  actualizarDiscos(nuevoDisco);
  alert("¡Disco cargado exitosamente!");
  Mostrar();
}

// Función para mostrar los discos en la página
function Mostrar() {
  const informacion = document.getElementById("informacion");
  const discosAmostrar = JSON.parse(localStorage.getItem("discos"));
  const contadorDiscos = discosAmostrar.length;

  // Crear una lista de discos en el elemento informacion
  informacion.innerHTML = `<p class='contador'>${contadorDiscos} discos cargados.</p>
    <div id="discos"></div>`;

  const divDiscos = document.getElementById("discos");

  if (discosAmostrar.length > 0) {
    discosAmostrar.forEach((disco) => {
        const duracionTotal = calcularDuracionTotal(disco);
        const cantidadPistas = disco.Pistas.length;
        const promedioDuracion = calcularPromedioDuracion(disco.Pistas);
        const pistaMayorDuracion = encontrarPistaMayorDuracion(disco.Pistas);
        const pistasHtml = disco.Pistas.map((pista) => {
          return `${
            pista.Duracion > 180
              ? `<h5 class='text-danger'>- ${pista.Nombre}, ${pista.Duracion} segundos</h5>`
              : `<h5>- ${pista.Nombre}, ${pista.Duracion} segundos</h5>`
          }`;
        }).join("");
    
        divDiscos.innerHTML += `
            <div class="card">
              <img src="https://tse3.mm.bing.net/th?id=OIP.TA0vM3JUwH1m5RN0spoI4QHaE8&pid=Api&P=0&h=180" class="card-img-top" alt="foto-disco">
              <div class="card-body">
                  <h4 class="card-title text-center fs-3 text-bold">${disco.Nombre}</h4>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Autor:</span> ${disco.Autor}</h5>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Codigo:</span> ${disco.Codigo}</h5>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Pistas:</span></h5>
                  ${pistasHtml}
                  <h5 class="card-title"><span class='fw-bold fs-4'>Cantidad de pistas:</span> ${cantidadPistas}</h5>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Duracion total del disco:</span> ${duracionTotal} segundos.</h5>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Promedio de duración:</span> ${promedioDuracion.toFixed(2)} segundos</h5>
                  <h5 class="card-title"><span class='fw-bold fs-4'>Pista con mayor duración:</span> ${pistaMayorDuracion.Nombre}, ${pistaMayorDuracion.Duracion} segundos</h5>
              </div>
              <p class='fw-bold fs-5 px-3'>*En rojo pistas mayores a 180 segundos.</p>
            </div>
          `;
      });
  } else {
    informacion.innerHTML = `<p class='contador'>${contadorDiscos} discos cargados.</p>
    <div class='disco-encontrado'>
      <h2>No posees discos cargados. Por favor agrega nuevos discos a la biblioteca para verlos.</h2>
    </div>`;
  }

  
}

// Función para agregar un disco al arreglo de discos y almacenamiento local
function actualizarDiscos(disco) {
  discos.push(disco);
  const nuevosDiscos = discos;
  localStorage.setItem("discos", JSON.stringify(nuevosDiscos));
}

// Función para calcular la duración total de un disco
function calcularDuracionTotal(disco) {
  const duraciones = disco.Pistas.map((pista) => pista.Duracion);
  const duracionTotal = duraciones.reduce(
    (total, duracion) => total + duracion,
    0
  );
  return duracionTotal;
}

// Función para buscar un disco por su código
function buscarDiscoPorCodigo(codigo) {
  return discos.find((disco) => disco.Codigo === codigo);
}

// Función para calcular el promedio de duración de las pistas de un disco
function calcularPromedioDuracion(pistas) {
  if (pistas.length === 0) {
    return 0;
  }

  const totalDuracion = pistas.reduce(
    (total, pista) => total + pista.Duracion,
    0
  );
  return totalDuracion / pistas.length;
}

// Función para encontrar la pista con mayor duración en un disco
function encontrarPistaMayorDuracion(pistas) {
  if (pistas.length === 0) {
    return null;
  }

  return pistas.reduce(
    (pistaMax, pista) =>
      pista.Duracion > pistaMax.Duracion ? pista : pistaMax,
    pistas[0]
  );
}

// Función para filtrar discos por código
function filtroPorCodigo() {
  const codigoIngresado = parseInt(document.getElementById("filtro").value);
  const divDiscos = document.getElementById("informacion");

  if (!!codigoIngresado && codigoIngresado > 0) {
    const discoEncontrado = discos.find(
      (disco) => disco.Codigo === codigoIngresado
    );

    divDiscos.innerHTML = "";

    if (discoEncontrado) {
      const duracionTotal = calcularDuracionTotal(discoEncontrado);
      const cantidadPistas = discoEncontrado.Pistas.length;
      const promedioDuracion = calcularPromedioDuracion(discoEncontrado.Pistas);
      const pistaMayorDuracion = encontrarPistaMayorDuracion(
        discoEncontrado.Pistas
      );
      const pistasHtml = discoEncontrado.Pistas.map((pista) => {
        return `${
          pista.Duracion > 180
            ? `<h5 class='text-danger'>- ${pista.Nombre}, ${pista.Duracion} segundos</h5>`
            : `<h5>- ${pista.Nombre}, ${pista.Duracion} segundos</h5>`
        }`;
      }).join("");

      divDiscos.innerHTML += `
        <div class='disco-encontrado'>
          <div class="card">
            <img src="https://tse3.mm.bing.net/th?id=OIP.TA0vM3JUwH1m5RN0spoI4QHaE8&pid=Api&P=0&h=180" class="card-img-top" alt="foto-disco">
            <div class="card-body">
              <h4 class="card-title text-center fs-3 text-bold">${discoEncontrado.Nombre}</h4>
              <h5 class="card-title"><span class='fw-bold fs-4'>Autor:</span> ${discoEncontrado.Autor}</h5>
              <h5 class="card-title"><span class='fw-bold fs-4'>Codigo:</span> ${discoEncontrado.Codigo}</h5>
              <h5 class="card-title"><span class='fw-bold fs-4'>Pistas:</span></h5>
              ${pistasHtml}
              <h5 class="card-title"><span class='fw-bold fs-4'>Cantidad de pistas:</span> ${cantidadPistas}</h5>
              <h5 class="card-title"><span class='fw-bold fs-4'>Duracion total del disco:</span> ${duracionTotal} segundos.</h5>
              <h5 class="card-title"><span class='fw-bold fs-4'>Promedio de duración:</span> ${promedioDuracion.toFixed(2)} segundos</h5>
              <h5 class="card-title"><span class='fw-bold fs-4'>Pista con mayor duración:</span> ${pistaMayorDuracion.Nombre}, ${pistaMayorDuracion.Duracion} segundos</h5>
            </div>
            <p class='fw-bold fs-5 px-3'>*En rojo pistas mayores a 180 segundos.</p>
          </div>
        </div>`;
    } else {
      divDiscos.innerHTML += `
        <div class='disco-encontrado'>
          <h2>No existe disco con ese codigo, por favor vuelva a intentarlo</h2>
        </div>`;
    }
  } else {
    divDiscos.innerHTML = `
      <div class='disco-encontrado'>
        <h2>Por favor ingrese un codigo válido.</h2>
      </div>`;
  }
}

// Inicializar la lista de discos
getDiscos();

