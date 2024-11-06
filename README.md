# **Trabajo Practico: Web Scraping** - Ruth Gomez

Este proyecto realiza web scraping para obtener datos sobre la popularidad de los lenguajes de programación en 2024 desde tres fuentes diferentes: TIOBE, Tecsify, y PYPL. Los datos extraídos se procesan y se almacenan en hojas de cálculo de Excel, con gráficos generados automáticamente para facilitar la comparación.

## Descripción

El objetivo principal del proyecto es demostrar cómo utilizar técnicas de web scraping para extraer información valiosa de la web, procesarla y representarla gráficamente. Utilizamos bibliotecas y herramientas de JavaScript para obtener datos sobre la popularidad de diversos lenguajes de programación y calcular promedios de popularidad a partir de diferentes fuentes.

## **Fuentes Utilizadas**
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
const axios = require('axios'); //Solicitudes HTTP
const cheerio = require('cheerio'); //Manipular el Dom de las páginas web
const XLSX = require('xlsx'); //Manejar archivos Excel
const puppeteer = require('puppeteer'); //Automatizar el navegador
```
### Lista de Lenguajes de Programacion para el Desarrollo Web
```javascript
const webLanguages = [
    "JavaScript",
    "Python",
    "Ruby",
    "PHP",
    "Java",
    "TypeScript",
    "HTML",
    "CSS",
    "Go",
    "C#",
    "Swift"
];
```
### Funciones de Scraping
- **Tiobe**
```javascript
async function scrapeTIOBE() {
    try {
        const response = await axios.get('https://www.tiobe.com/tiobe-index/');
        const $ = cheerio.load(response.data);
        
        const languages = [];
        $('#top20 tbody tr').each((index, element) => {
            const rank = $(element).find('td').eq(0).text().trim();
            const lang = $(element).find('td').eq(4).text().trim();
            const percentage = $(element).find('td').eq(5).text().trim().replace('%', '').replace(',', '.');
            
            if (webLanguages.includes(lang)) {
                languages.push({ Source: 'TIOBE', Language: lang, Rank: rank, Percentage: parseFloat(percentage) });
            }
        });

        console.log("Datos raspados de TIOBE exitosamente.");
        return languages;
    } catch (error) {
        console.error("Error al raspar datos de TIOBE:", error.message);
    }
}
```
- Proceso:
-- Hace una solicitud HTTP a la página web de TIOBE.
-- Usa cheerio para analizar el contenido HTML y extraer los datos de interés (ranking, lenguaje y porcentaje de uso).
-- Filtra los lenguajes que están en webLanguages y los guarda en un array languages.
  
- **Tecsify**
```javascript
async function scrapeTecsify() {
    try {
        const response = await axios.get('https://tecsify.com/blog/top-lenguajes-2024/');
        const $ = cheerio.load(response.data);
        
        const languages = [];
        $('figure.wp-block-table table tbody tr').each((index, element) => {
            const rank = $(element).find('td').eq(0).text().trim();
            const lang = $(element).find('td').eq(4).text().trim();
            const percentage = $(element).find('td').eq(5).text().trim();
            
            if (webLanguages.includes(lang)) {
                languages.push({ Source: 'Tecsify', Language: lang, Rank: rank, Percentage: parseFloat(percentage.replace(',', '.')) });
            }
        });

        console.log("Datos raspados de Tecsify exitosamente.");
        return languages;
    } catch (error) {
        console.error("Error al raspar datos de Tecsify:", error.message);
    }
}
```
- **PYPL**
```javascript
async function scrapePYPL() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navegar a la página
    await page.goto('https://pypl.github.io/PYPL.html', {
        waitUntil: 'networkidle2' // Espera a que la red esté inactiva
    });

    // Obtener el contenido de la tabla
    const languages = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tbody tr'));
        return rows.map(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                return {
                    Source: 'PYPL',
                    Language: cells[2]?.innerText.trim(),
                    Rank: cells[0]?.innerText.trim(),
                    Share: cells[3]?.innerText.trim().replace('%', '').replace(',', '.')
                };
            }
        })
        .filter(Boolean) // Filtrar filas vacías
        .filter(item => item.Language !== "© Pierre Carbonnelle, 2023"); // Filtrar filas irrelevantes
    });

    await browser.close();
    
    // Filtrar solo los datos desde Rank 1 hasta Rank 28 y que estén en webLanguages
    console.log("Datos raspados de PYPL exitosamente.");
    return languages.filter(item => 
        parseInt(item.Rank) >= 1 && parseInt(item.Rank) <= 28 &&
        webLanguages.includes(item.Language)
    );
}
```

