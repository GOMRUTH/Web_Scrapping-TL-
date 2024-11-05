# Trabajo Practico: Web Scraping de Lenguajes de Programación Populares - Ruth Gomez

Este proyecto realiza web scraping para obtener datos sobre la popularidad de los lenguajes de programación en 2024 desde tres fuentes diferentes: TIOBE, Tecsify, y PYPL. Los datos extraídos se procesan y se almacenan en hojas de cálculo de Excel, con gráficos generados automáticamente para facilitar la comparación.

## Descripción

El objetivo principal del proyecto es demostrar cómo utilizar técnicas de web scraping para extraer información valiosa de la web, procesarla y representarla gráficamente. Utilizamos bibliotecas y herramientas de JavaScript para obtener datos sobre la popularidad de diversos lenguajes de programación y calcular promedios de popularidad a partir de diferentes fuentes.

## Motivación

El proyecto busca automatizar la recopilación y el análisis de datos sobre lenguajes de programación, lo que es útil para estudiantes, desarrolladores y empresas que desean conocer las tendencias del sector tecnológico.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **axios**: Biblioteca para realizar solicitudes HTTP y obtener el contenido de las páginas web.
- **cheerio**: Librería que permite analizar y manipular el contenido HTML, simulando el funcionamiento de jQuery.
- **puppeteer**: Herramienta para automatizar la navegación web y realizar scraping en sitios que requieren interacción con JavaScript.
- **excel4node**: Biblioteca para generar y manipular archivos de Excel, incluyendo gráficos y tablas.
- **XLSX**: Módulo utilizado para trabajar con archivos de Excel y exportar datos.

## Proceso del Proyecto

1. **Selección de Tecnologías**: Se utilizaron axios y cheerio para el scraping de sitios con contenido HTML estático, y puppeteer para manejar contenido dinámico.
2. **Análisis de la Estructura HTML**: Se inspeccionaron las estructuras HTML de los sitios web TIOBE, Tecsify, y PYPL para identificar las secciones de interés, como las tablas de datos.
3. **Extracción de Datos**:
   - **TIOBE**: Se extrajo el ranking y el porcentaje de popularidad de los lenguajes de programación.
   - **Tecsify**: Se obtuvieron datos similares, ajustando el scraping a su estructura específica.
   - **PYPL**: Se utilizó puppeteer para interactuar con la página y extraer datos de la tabla de rankings.
4. **Procesamiento y Cálculo de Promedios**: Se calcularon promedios de popularidad para los lenguajes de programación que aparecen en las tres fuentes.
5. **Generación de Archivos Excel y Gráficos**: Se crearon hojas de cálculo con los datos y gráficos de barras que muestran las diferencias de popularidad entre los lenguajes.

## Instrucciones para Ejecutar

### Prerrequisitos

Asegúrar de tener instalado Node.js en tu máquina.


