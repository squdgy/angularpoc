var http = require('http'),
    url = require('url'),
    nodeStatic = require('node-static');

var staticFileServer = new(nodeStatic.Server)();
var contestIds = [123, 345, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555];

http.createServer(function (req, res) {
    var reqData = url.parse(req.url);
    console.log(reqData);
    req.addListener('end', function () {
        //
        // Serve files!
        //
        var filename = reqData.path.substring(reqData.path.lastIndexOf('/')+1);
        if (filename == 'points') {
            var pts = {};
            for (var i=0; i<contestIds.length; i++)
            {
                pts[contestIds[i]] = {
                    cid: contestIds[i],
                    pts: Math.floor((Math.random()*1000)+1)
                };
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(pts));
            res.end();
        } else {
            staticFileServer.serve(req, res);
        }
    });
}).listen(process.env.PORT, process.env.IP);