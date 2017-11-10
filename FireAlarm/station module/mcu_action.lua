local mcu_action = {}
httpHeader = 'HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin:*\r\nAccess-Control-Allow-Headers *AUTHORISED*\r\nContent-Type: application/json\r\n\r\n\r\n'

local function get_networks(client)
    if wifi.getmode() == wifi.STATIONAP then
        wifi.sta.getap(function(T)
            local list = '{'
            local i = 0
            for k,v in pairs(T) do
                list = list..'"'..i..'"'..':'..'"'..k..'",'
                i = i + 1
            end
            list = string.sub(list,1,-2)..'}'
            if list ~= nil then
                print(httpHeader .. list)
                client:send(httpHeader .. list)
                --client:close()
            else
                client:send(httpHeader .. '{"type":"Error","value":"None is return"}')
                --client:close()
            end
        end)
    else
        client:send(httpHeader .. '{"type":"Error","value":"WifiStationAP not established"}')
        --client:close()
    end
end

local function finish_config(client)
    print("changing mode")
    client:send(httpHeader .. '{"type":"message","value":"success"}')
    client:close()
    local mytimer = tmr.create()
        mytimer:register(3000, tmr.ALARM_SINGLE, function (t)
        wifi.sta.disconnect()
        wifi.setmode(wifi.STATION)
        wifi.sta.connect()
    end)
    mytimer:start()
    mytimer = nil
end

local function set_credential(client,dict)
    file.remove("credential.json")
    if file.open("credential.json", "w+") then
        local str = '{"ssid":"'..dict.ssid..'"'
        if dict.pwd ~= nil and dict.pwd ~= "" then
            str = str..',"pwd":"'..dict.pwd..'"'
        end
        str = str..'}'
        file.writeline(str)
        file.close()
        wifi.sta.config(cjson.decode(str))
        --wifi.sta.disconnect()
        --wifi.sta.connect()
        client:send(httpHeader .. '{"type":"message","value":"success"}')
        --client:close()

        -- cuando se agrege a la app que cuando se establesca la conexion envie un post con "Finish config"
        -- se sacan las siguientes 6 lineas
        -- local mytimer = tmr.create()
        -- mytimer:register(20000, tmr.ALARM_SINGLE, function (t)
           -- finish_config()
        -- end)
        -- mytimer:start()
        -- mytimer = nil
    else
        client:send(httpHeader .. '{"type":"Error","value":"Error has occurred while trying to manipulate the file"}')
        --client:close()
    end
end

local function get_adc(client)
    client:send(httpHeader .. '{"type":"adc","value":'..adc.read(0)..'}')
    client:close()
end

local function get_ip(client)
    if wifi.sta.getip() ~= nil then
        client:send(httpHeader .. '{"type":"ip","value":"'..wifi.sta.getip()..'"}')
        --client:close()
    else
        client:send(httpHeader .. '{"type":"Error","value":"NodeMCU is not Connected"}')
        --client:close()
    end
end

mcu_action.set_credential = set_credential
mcu_action.get_adc = get_adc
mcu_action.get_ip = get_ip
mcu_action.get_networks = get_networks
mcu_action.finish_config = finish_config

return mcu_action
