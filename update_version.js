import fs from 'fs';
import chokidar from 'chokidar';

function updateVersion() {

  if(process.env.NODE_ENV !== 'production') {
    let file = __dirname + '/public/assets/offline.appcache.model';
    let dest = __dirname + '/public/assets/offline.appcache';

    let pattern = /\$\{([^}]+)\}/g;

    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      let content = data.replace(pattern, function(){
            return `\$\{${new Date().getTime()}\}`;
      });

      fs.writeFile(dest, content, 'utf8', function (err) {
         if (err) return console.log(err);
      });

    });
  }

}

chokidar.watch([
  __dirname + '/public/assets/js/bundle.js',
  __dirname + '/public/assets/css/main.css'
], {persistent: true}).on('all', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats}`);
  updateVersion();
});