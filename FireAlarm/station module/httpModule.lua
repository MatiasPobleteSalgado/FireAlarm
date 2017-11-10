local httpModule = {}

local function httpPost(url, dict, callback)
    http.post(url,
        'Content-Type: application/json\r\n',
        cjson.encode(dict),
        function (code,data)
            if (code < 0) then
                callback('{"type":"Error","value":"No se pudo realizar el post"}')
            else
                callback(data)
            end
        end)
end

httpModule.httpPost = httpPost

return httpModule
