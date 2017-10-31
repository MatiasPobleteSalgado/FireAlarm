local httpModule = require('httpModule')

net.dns.setdnsserver("8.8.8.8", 0)
net.dns.setdnsserver("8.8.4.4", 1)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="Kanela2"
station_cfg.pwd="23407D733F"


if wifi.sta.getip() ~= nil then
    table = {}
    table.hola = "Perico"
    httpModule.httpPost('http://pillan.inf.uct.cl/~itopp/test.php', 
                        cjson.encode(table),
                        function(data)
                            print(data)
                        end)
else 
    print("Obteniendo Ip")
    wifi.sta.config(station_cfg)
    wifi.sta.connect()
end
