local mcu_action = {}
httpHeader = 'HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin:*\r\nAccess-Control-Allow-Headers *AUTHORISED*\r\nContent-Type: application/json\r\n\r\n\r\n'

local function get_networks(client)
    if wifi.getmode() == wifi.STATIONAP then
        local list = '{}'
        wifi.sta.getap(function(T)
            list = '{'
            local i = 0
            for k,v in pairs(T) do
                list = list..'"'..i..'"'..':'..'"'..k..'",'
                i = i + 1
            end
            list = string.sub(list,1,-2)..'}'
            if list ~= nil then
                print(httpHeader .. list)
                client:send(httpHeader .. list)
            else
                client:send('{"ERROR":"NilReturn", "Message":"None is return"}')
            end
        end)
    else
        client:send('{"ERROR":"NilReturn","Message":"WifiStationAP not established"}')
    end
end

local function set_credential(client,dict)
    file.remove("credential.json")
    if file.open("credential.json", "w+") then
        local str = '{"ssid":"'..dict.ssid..'"'
        if dict.pwd ~= nil then
            str = str..',"pwd":"'..dict.pwd..'"'
        end
        str = str..'}'
        file.writeline(str)
        file.close()
        client:send(httpHeader .. '{"Message":"success"}')
        local mytimer = tmr.create()

        -- oo calling
        mytimer:register(5000, tmr.ALARM_SINGLE, function (t)
            print("changing mode")
            wifi.sta.disconnect()
            wifi.setmode(wifi.STATION)
            wifi.sta.config(cjson.decode(str))
            wifi.sta.connect()
        end)
        mytimer:start()
        mytimer = nil
    else
        client:send(httpHeader .. '{"ERROR":"nilFile","Message":"Error has occurred while trying to manipulate the file"}')
    end
end

local function get_adc(client)
    client:send(httpHeader .. '{"Value":'..adc.read(0)..',"Message":"Success"}')
end

local function get_ip(client)
    if wifi.sta.getip() ~= nil then
        client:send(httpHeader .. '{"Value":"'..wifi.sta.getip()..'","Message":"Success"}')
    else
        client:send(httpHeader .. '{"ERROR":"NilReturn","Message":"NodeMCU is not Connected"}')
    end
end

mcu_action.set_credential = set_credential
mcu_action.get_adc = get_adc
mcu_action.get_ip = get_ip
mcu_action.get_networks = get_networks

return mcu_action
