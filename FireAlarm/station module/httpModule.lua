local httpModule = {}

local function httpPost(url,dict, callback)
    http.post(url,
        "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json\r\n",
        cjson.encode(dict),
        function (code,data)
            if (code < 0) then
                print('{"ERROR":"PostError","Message":"No se pudo realizar el post"}')
            else
                callback(code,data)
            end
        end)
end

httpModule.httpPost = httpPost

return httpModule
