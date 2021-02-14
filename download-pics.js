/**
 * Скрипт для скачивания файлов и замены ссылок в файле каналов
 *
 * Делалось на тяп ляп, использовал только 1 раз
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const sourceDataPath = './src/assets/stub-data/channels.json';

// получаем список каналов
const channelsData = JSON.parse(fs.readFileSync(sourceDataPath).toString());


channelsData.channelDetails.forEach((channelData) => {
  Object.keys(channelData.picture).forEach((pictureType) => {
    channelData.picture[pictureType].forEach((pictureUrl, index) => {
      if (!pictureUrl) {
        return;
      }
      const filename = path.parse(pictureUrl).base;
      const filePath = `./src/assets/images/tv/${filename}`;
      channelData.picture[pictureType][index] = `/assets/images/tv/${filename}`;
      const file = fs.createWriteStream(filePath);

      https.get(pictureUrl, function (response) {
        response.pipe(file);
        file.on('finish', function () {
          file.close();  // close() is async, call cb after close completes.
        });
      }).on('error', function (err) { // Handle errors
        fs.unlink(filePath, ()=>{}); // Delete the file async. (But we don't check the result)
      });
    });
  })
})
fs.writeFileSync(sourceDataPath, JSON.stringify(channelsData, null, 2));
console.log(sourceDataPath)
