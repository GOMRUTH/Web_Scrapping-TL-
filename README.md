# Trabajo Practico: Web Scraping - Ruth Gomez

Este proyecto realiza web scraping para obtener datos sobre la popularidad de los lenguajes de programación en 2024 desde tres fuentes diferentes: TIOBE, Tecsify, y PYPL. Los datos extraídos se procesan y se almacenan en hojas de cálculo de Excel, con gráficos generados automáticamente para facilitar la comparación.

## Descripción

El objetivo principal del proyecto es demostrar cómo utilizar técnicas de web scraping para extraer información valiosa de la web, procesarla y representarla gráficamente. Utilizamos bibliotecas y herramientas de JavaScript para obtener datos sobre la popularidad de diversos lenguajes de programación y calcular promedios de popularidad a partir de diferentes fuentes.

## Fuentes Utilizadas
Se han elegido tres sitios web que publican rankings de lenguajes de programación:

1. **TIOBE** - [TIOBE Index](https://www.tiobe.com/tiobe-index/)
2. **Tecsify** - [Tecsify Blog](https://tecsify.com/blog/top-lenguajes-2024/)
3. **PYPL** - [PYPL Index](https://pypl.github.io/PYPL.html)

## Motivación

El proyecto busca automatizar la recopilación y el análisis de datos sobre lenguajes de programación, lo que es útil para estudiantes, desarrolladores y empresas que desean conocer las tendencias del sector tecnológico.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **axios**: Biblioteca para realizar solicitudes HTTP y obtener el contenido de las páginas web.
- **cheerio**: Librería que permite analizar y manipular el contenido HTML, simulando el funcionamiento de jQuery.
- **puppeteer**: Herramienta para automatizar la navegación web y realizar scraping en sitios que requieren interacción con JavaScript.
- **excel4node**: Biblioteca para generar y manipular archivos de Excel, incluyendo gráficos y tablas.
- **XLSX**: Módulo utilizado para trabajar con archivos de Excel y exportar datos.

## Partes del Código
### Librerías Importadas
```javascript
const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');
const puppeteer = require('puppeteer');```

###Hola





