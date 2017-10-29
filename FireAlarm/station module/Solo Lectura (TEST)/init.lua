local httpModule = require('httpModule')
net.dns.setdnsserver("8.8.8.8", 0)
net.dns.setdnsserver("8.8.4.4", 1)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="Kanela2"
station_cfg.pwd="23407D733F"

if wifi.sta.getip() ~= nil then
        tmr.alarm(0, 1500, 1, function ()
            local val = adc.read(0)
            if val < 300 then
                print("Normal "..val)
            else if val >= 300 then
                local table = {}
                table["type"] = "Alert"
                table["value"] = val
                httpModule.httpPost('http://pillan.inf.uct.cl/~itopp/test.php', 
                                    cjson.encode(table),
                                    function(data)
                                        if data == '' or data == nil then
                                            print('{"ERROR" : "Empty Value"}')
                                        else
                                            print(data)
                                        end
                                    end)
                end
            end
        end)
    else 
        print("Obteniendo Ip")
        wifi.sta.config(station_cfg)
        wifi.sta.connect()
    end