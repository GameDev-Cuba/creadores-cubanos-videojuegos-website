---
title: Encuesta resumen año 2022
date: 5-1-2023
description: Encuesta de la comunidad de creadores de videojuegos sobre los ingresos del sector en el año 2022.
image: assets/encuesta-banner.jpeg
---

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.2.0"></script>

<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0"></script>
<script>
	Chart.register(ChartDataLabels);
</script>


<style>
    canvas {
        max-width: 400px;
        max-height: 400px;
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>


¡Hola!

Empezando el año 2023 hicimos una encuesta en el grupo de Telegram de nuestra comunidad. Esta encuesta trata sobre diferentes aspectos del desarrollo y comercialización de nuestros videojuegos.

En la encuesta participaron ocho estudios:

* 90 Miles Studio
* VERTEX
* Green Rune
* Matandile Games
* The Solar Moose
* Versus Windmills
* Grupo de Desarrollo Nacional de Joven Club
* GeekZone Studio

Estos no son todos los estudios conformados por cubanos creadores videojuegos, esperamos que para el siguiente año se nos incorporen más estudios a nuestras encuestas.

A continuación, le presentamos los resultados de cada pregunta.

<!-- ****** Pregunta 2 ****** -->

<h4>Pregunta 2: Año de creación de los estudios</h4>

<canvas id="chart2">
</canvas>

<script>

  let ctx = document.getElementById("chart2");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["2014", "2015", "2017", "2019", "2020", "2021", "2022"],
      datasets: [{
        label: "Número de estudios creados",
        data: [1, 1, 1, 1, 1, 1, 2],
      }]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true,
			ticks: {
				stepSize: 1
			}
        }
      }
    }
  });
</script>

<!-- ****** Pregunta 3 ****** -->

<h4>Pregunta 3: Forma legal de los estudios</h4>

<canvas id="chart3">
</canvas>

<script>

    ctx = document.getElementById("chart3");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Informal", "Empresa estatal", "Empresa privada (MiPYME)", "TCP", "Artista independiente"],
            datasets: [{
                label: "Cantidad de estudios",
                data: [2, 2, 0, 3, 1],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 4 ****** -->

<h4>Pregunta 4: Número de integrantes por estudio</h4>

<canvas id="chart4">
</canvas>

<script>

    ctx = document.getElementById("chart4");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["1", "2 - 5", "6 - 10", "10+"],
            datasets: [{
                label: "Integrantes",
                data: [2, 4, 0, 2],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 5 ****** -->

<h4>Pregunta 5: Lugares donde residen los integrantes del estudio</h4>

<canvas id="chart5">
</canvas>

<script>

    ctx = document.getElementById("chart5");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["EEUU", "Costa Rica", "La Habana, Cuba", "Isla de la Juventud, Cuba", "España", "Santiago de Cuba, Cuba"],
            datasets: [{
                label: "Estudios con miembros en este lugar",
                data: [1, 1, 4, 1, 1, 2],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 6 ****** -->

<h4>Pregunta 6: Estudios activos</h4>

<canvas id="chart6">
</canvas>

<script>

    ctx = document.getElementById("chart6");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Sí", "No"],
            datasets: [{
                label: "Estudios activos",
                data: [8, 0],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 7 ****** -->

<h4>Pregunta 7: Cantidad de juegos publicados por estudios en el 2022</h4>

<canvas id="chart7">
</canvas>

<script>

    ctx = document.getElementById("chart7");

    new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["Ninguno", "Uno solo", "2 juegos", "4 juegos", "6 juegos", "7 juegos"],
			datasets: [{
				label: "Cantidad de estudios que publicaron",
				data: [2, 2, 1, 1, 1, 1],
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
  	});
</script>

<!-- ****** Pregunta 8 ****** -->

<h4>Pregunta 8: Ingreso promedio por juego en el año 2022 (CUP)</h4>

<canvas id="chart8">
</canvas>

<script>

    ctx = document.getElementById("chart8");

    new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["0 - 100", "100 - 1,000", "5,000 - 10,000", "800,000+"],
			datasets: [{
				label: "Cantidad de estudios",
				data: [2, 2, 1, 1],
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
  	});
</script>

<!-- ****** Pregunta 9 ****** -->

<h4>Pregunta 9: Ingreso promedio por juego en el año 2022 (USD)</h4>

<canvas id="chart9">
</canvas>

<script>

    ctx = document.getElementById("chart9");

    new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["0 USD", "1 USD"],
			datasets: [{
				label: "Cantidad de estudios",
				data: [4, 1],
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
  	});
</script>

<!-- ****** Pregunta 10 ****** -->

<h4>Pregunta 10: Ingreso del juego de mayor ingreso en el año 2022 (CUP)</h4>

<canvas id="chart10">
</canvas>

<script>

    ctx = document.getElementById("chart10");

    new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["0 - 100", "100 - 1,000", "1,000 - 3,000", "120,000+"],
			datasets: [{
				label: "Cantidad de estudios",
				data: [3, 1, 2, 2],
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
  	});
</script>

<!-- ****** Pregunta 11 ****** -->

<h4>Pregunta 11: Ingreso total en el año 2022 (CUP) (opcional)</h4>

<canvas id="chart11">
</canvas>

<script>

    ctx = document.getElementById("chart11");

    new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["0 - 100", "100 - 1,000", "1,000 - 5,000", "200,000+"],
			datasets: [{
				label: "Cantidad de estudios",
				data: [3, 1, 1, 1],
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
  	});
</script>

<!-- ****** Pregunta 12 ****** -->

<h4>Pregunta 12: Tiendas utilizadas para vender los juegos</h4>

<canvas id="chart12">
</canvas>

<script>

    ctx = document.getElementById("chart12");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Apklis", "Superfacil.cu", "Cosmox", "Conwiro Force", "Google Play", "App Store", "Itch.io", "Steam", "Gumroad.com", "Nuestra propia web", "Tienda física"],
            datasets: [{
                label: "Cantidad de esutdios",
                data: [4, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 13 ****** -->

<h4>Pregunta 13: Plataformas destino de los videojuegos</h4>

<canvas id="chart13">
</canvas>

<script>

    ctx = document.getElementById("chart13");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Windows", "macOS", "Linux", "Android", "iOS", "Web"],
            datasets: [{
                label: "Cantidad de esutdios",
                data: [3, 1, 1, 6, 0, 2],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>

<!-- ****** Pregunta 14 ****** -->

<h4>Pregunta 14: Motores de videojuegos utilizados</h4>

<canvas id="chart14">
</canvas>

<script>

    ctx = document.getElementById("chart14");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Unity", "Godot", "Unreal", "PhaserJS", "BuildBox", "GameMaker"],
            datasets: [{
                label: "Cantidad de esutdios",
                data: [5, 2, 1, 1, 1, 1],
            }]
        },
		options: {
			plugins: {
				datalabels: {
					formatter: (value, context) => {
 	 					return value === 0? "" : value;
					}
				}
			}
		}
    });
</script>