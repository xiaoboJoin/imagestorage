var fs = require('fs');
var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');


var dir = "/Users/Bob/Documents/work/server2.0/api/app";

var images = [];

fs.readdir(dir, (err, files) => {
    var count = files.length;
    files.forEach(file => {
        fs.readFile(dir + "/" + file, { encoding: 'utf-8' }, function(err, data) {
            if (!err) {
                var pngs = data.match(/http(.*?)png/g);
                images = images.concat(pngs || [])
                var jpgs = data.match(/http(.*?)jpg/g);
                images = images.concat(jpgs || [])
            }
            count--;
            if (count == 0) {
                fs.writeFile(__dirname + '/images.json', JSON.stringify(images), function(err) {
                    if (err)
                        return console.log(err);
                    var list = [];
                    images.forEach(function(item, idx) {
                            list.push({
                                name: idx,
                                url: item,
                            })
                        })
                        //199.15.112.103
                    fetch("http://199.15.112.103:3000/image/new/list", {
                        agent: new HttpsProxyAgent('http://localhost:8888'),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify({
                            images: list,
                        })
                    }).then(function(res) {
                        return res.json();
                    }).
                    then(function(body) {
                        console.log(body);
                    })
                });
            }
        });
    });
})
