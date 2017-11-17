local counter = 0
local sended = false
tmr.alarm(0, 5000, 1, function ()
	local value = adc.read(0)
	if value > 512 and sended == false then
		local table = {}
		table["type"] = "Alert"
		table["value"] = value
		table["Id"] = Id
		httpModule.httpPost(Url,
			table,
			function(data)
				print(data)
			end)
		sended = true
	else
		if sended == true then
			counter = counter + 1
			if counter > 60 then
				counter = 0
				sended = false
			end
		end
	end
end)