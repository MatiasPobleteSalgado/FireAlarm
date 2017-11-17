local httpModule = require('httpModule')
local config = require('config')

local srv_action = {}

local function set_user(client,dict)
    httpModule.httpPost(config.HOST(),
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
    local alert = {}
    alert.type = 'send_alert'
    alert.id = node.chipid()
    if adc_value > 768 then
        alert.status = 'danger'
    else
        alert.status = 'warning'
    end
    alert.adc = adc_value
    httpModule.httpPost(config.HOST(), alert, function(data) print(data) end)
end

srv_action.set_user = set_user
srv_action.send_alert = send_alert

return srv_action
