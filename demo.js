(async ()=>{
    const TildaStrip = require('.');

    //Создаём заготовку для страницы
    let pricesPage = new TildaStrip('http://project263778.tilda.ws/spanishprice',{
        pageUrl: 'https://испанский.онлайн/price',
        favicon: 'https://www.pepper.ru/favicon.ico'
    });

    //Получаем страницу
    console.log(await pricesPage.get());
})()