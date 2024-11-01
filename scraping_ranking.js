const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');
const puppeteer = require('puppeteer');

// Lista de lenguajes de programación específicos para desarrollo web
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

// Función para raspar datos de TIOBE
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

        return languages;
    } catch (error) {
        console.error("Error al raspar datos de TIOBE:", error.message);
    }
}

// Función para raspar datos de Tecsify
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
        
        return languages;
    } catch (error) {
        console.error("Error al raspar datos de Tecsify:", error.message);
    }
}

// Función para raspar datos de PYPL
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
    return languages.filter(item => 
        parseInt(item.Rank) >= 1 && parseInt(item.Rank) <= 28 &&
        webLanguages.includes(item.Language)
    );
}

// Función para calcular promedios
function calculateAverages(tiobeData, tecsifyData, pyplData) {
    const averages = [];
    const allLanguages = {};

    tiobeData.forEach(item => {
        allLanguages[item.Language] = {
            TIOBE: item.Percentage,
            Tecsify: null,
            PYPL: null,
            TIOBE_Rank: item.Rank,
        };
    });

    tecsifyData.forEach(item => {
        if (allLanguages[item.Language]) {
            allLanguages[item.Language].Tecsify = item.Percentage;
        } else {
            allLanguages[item.Language] = {
                TIOBE: null,
                Tecsify: item.Percentage,
                PYPL: null,
                TIOBE_Rank: null,
            };
        }
    });

    pyplData.forEach(item => {
        if (allLanguages[item.Language]) {
            allLanguages[item.Language].PYPL = parseFloat(item.Share);
        } else {
            allLanguages[item.Language] = {
                TIOBE: null,
                Tecsify: null,
                PYPL: parseFloat(item.Share),
                TIOBE_Rank: null,
            };
        }
    });

    for (const lang in allLanguages) {
        const tiobePercentage = allLanguages[lang].TIOBE;
        const tecsifyPercentage = allLanguages[lang].Tecsify;
        const pyplPercentage = allLanguages[lang].PYPL;

        let average = null;
        const percentages = [tiobePercentage, tecsifyPercentage, pyplPercentage].filter(p => p !== null);
        
        if (percentages.length > 0) {
            average = (percentages.reduce((sum, p) => sum + p, 0) / percentages.length).toFixed(2);
        }

        averages.push({
            Language: lang,
            TIOBE: tiobePercentage,
            Tecsify: tecsifyPercentage,
            PYPL: pyplPercentage,
            Average: average,
        });
    }

    return averages;
}

// Función para guardar datos en un archivo Excel
function saveToExcel(fileName, data, sheetName) {
    if (!data || data.length === 0) {
        console.log(`No hay datos para guardar en ${fileName}`);
        return;
    }
    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
    XLSX.writeFile(wb, fileName);
}

// Función principal
async function main() {
    const tiobeData = await scrapeTIOBE();
    const tecsifyData = await scrapeTecsify();
    const pyplData = await scrapePYPL();

    saveToExcel('TIOBE_Data.xlsx', tiobeData, 'TIOBE');
    saveToExcel('Tecsify_Data.xlsx', tecsifyData, 'Tecsify');
    saveToExcel('PYPL_Data.xlsx', pyplData, 'PYPL');

    const averageData = calculateAverages(tiobeData, tecsifyData, pyplData);
    saveToExcel('Average_Data.xlsx', averageData, 'Promedio');

    console.log('Datos guardados en TIOBE_Data.xlsx, Tecsify_Data.xlsx, PYPL_Data.xlsx y Average_Data.xlsx');
}

main().catch(console.error);