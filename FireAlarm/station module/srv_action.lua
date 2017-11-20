local httpModule = require('httpModule')
local config = require('config')

local srv_action = {}

local function send_alert(adc_value)
    local alert = {}
    file.open("user.json","r")
    local data = cjson.decode(file.read())
    file.close()
    alert.type = 'alert'
    alert.user = data.code
    alert.adc = adc_value
    httpModule.httpPost(config.HOST, alert, function(data) print(data) end)
end
srv_action.send_alert = send_alert

return srv_action
