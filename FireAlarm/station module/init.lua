-- horas perdidas en este codigo: 4

---------- imports ----------
local mcu_action = require('mcu_action')
local srv_action = require('srv_action')
-----------------------------

---------- clean ----------
wifi.ap.dhcp.stop()
collectgarbage()
---------------------------

---------- Read Only Timer ----------
rt = tmr.create()
rt:register(5000,tmr.ALARM_AUTO, function () 
    local value = adc.get(0)
    if value > 512 then
        srv_action.send_alert(value)
    end
end)
-------------------------------------

---------- adc init config ----------
if adc.force_init_mode(adc.INIT_ADC) then 
    node.restart()
end
-------------------------------------

---------- wifi and net init config ----------
wifi.setmode(wifi.STATIONAP)
math.randomseed(tmr.time())
wifi.ap.config({ssid = "MCU"})--)..math.random(0,9)..math.random(0,9)..math.random(0,9)..""})
wifi.ap.setip({ip = "192.168.1.1", netmask = "255.255.255.0", gateway = "192.168.1.1"})
wifi.ap.dhcp.config({start = "192.168.1.100"})
net.dns.setdnsserver("8.8.8.8", 0)
net.dns.setdnsserver("8.8.4.4", 1)
wifi.ap.dhcp.start()

if file.exists("credential.json") then
    if file.open("credential.json") then
        wifi.sta.config(cjson.decode(file.read()))
        wifi.sta.connect()
        file.close()
    end
end
----------------------------------------------

---------- Server listener ----------
srv=net.createServer(net.TCP)
srv:listen(80,function(conn)
    conn:on("receive",function(client,request)
        --client:send("HTTP/1.1 200 OK\r\n")
        --client:send('Access-Control-Allow-Origin:*\r\nAccess-Control-Allow- Methods", "POST, GET\r\nAccess-Control-Allow-Headers *AUTHORISED*\r\n')
        --client:send("Content-Type: application/json\r\n\r\n")
        ---------- get post args ----------
        print(request)
        local args = string.match(request,"{.-$")
        if args == "" or args == nil then args="{}" end
        args = cjson.decode(args)
        -----------------------------------

        ---------- action receive ----------
        if args.type ~= nil then
            if args.type == "set_credential" then
                mcu_action.set_credential(client,args)
            elseif args.type == "get_adc" then
                mcu_action.get_adc(client)
            elseif args.type == "get_ip" then
                mcu_action.get_ip(client)
            elseif args.type == "get_networks" then
                mcu_action.get_networks(client)
            elseif args.type == "finish_config" then
                mcu_action.finish_config(client)
                client:send('{"type":"message","value":"success"}')
            elseif args.type == "start_timer" then
                rt:start()
                client:send('{"type":"message","value":"success"}')
            elseif args.type == "stop_timer" then
                rt:stop()
                client:send('{"type":"message","value":"success"}')
            elseif args.type == "set_user" then
                if wifi.sta.getip() ~= nil then
                    client:send(srv_action.set_user(args))
                    --client:close()
                else
                    client:send('{"type":"Error","value":"NodeMCU is not Connected"}')
                    --client:close()
                end
            else
                client:send('{"type":"Error","value":"The action is not recognized"}')
                --client:close()
            end
        --------------------------------------

        ---------- on invalid post ----------
        --else
        --    client:send('{"type":"Error","value":"None is returned"}')
        --    client:close()
        end
        -------------------------------------
    end)
    conn:on("sent",function(client)
        print("Closing")
        client:close() 
    end)
end)
-------------------------------------