# TildaStrip
Модуль для превращения страниц тильды в свои

## Использование
Например мы используем бесплатный тариф тильды для создания своего сайта. При этом домен привязан на сервер (например это опдстраница какой-то нашей системы, лендосик, или просто тест). Ну, и конечно, не хотим платить самой тильде.

Использование модуля в Node.js

```javascript
    const TildaStrip = require('tildastrip');
    
    //Создаём заготовку для страницы
    let pricesPage = new TildaStrip('http://project263778.tilda.ws/spanishprice',{ 
                pageUrl: 'https://испанский.онлайн/price',
                favicon: 'https://www.pepper.ru/favicon.ico'
    });

    //Получаем страницу
    await pricesPage.get();
```