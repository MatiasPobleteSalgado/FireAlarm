local httpModule = require('httpModule')

local srv_action = {}

local function set_user(client,dict)
    httpModule.httpPost('http://pillan.inf.uct.cl/~aflores/test.php',
    dict,
    function (data)
        if cjson.decode(data).type == "Error" then
            file.remove("user.json")
            if file.open("user.json","w+") then
                data = cjson.decode(data)
                local cfg = {
                    user = data.user,
                    location = data.location,
                    rut = data.rut
                }
                file.writeline(cfg)
                cfg = nil
                file.close()
                client:send('{"type":"message","value":"success"}')
            else
                client:send('{"type":"Error","value":"Error has occurred while trying to manipulate the file"}')
            end
        else
            client:send(data)
        end
    end)
end

local function send_alert(adc_value)
    httpModule.httpPost('http://localhost:8080/test/test.php',
    {
        type = "send_alert",
        user = "aflores",
        value = adc_value
    },
    function (data)
        print "nos quemaremos todos"
    end)
end

srv_action.set_user = set_user
srv_action.send_alert = send_alert

return srv_action
