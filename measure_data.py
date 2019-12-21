import Adafruit_DHT
import time
from datetime import datetime

sensor = Adafruit_DHT.DHT11
pin = 4
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
humidity_str = "%2.1f" % humidity
temp_str = "%2.1f" % temperature
now = datetime.fromtimestamp(time.time()).strftime('%Y/%m/%e %H:%M:%S')
json ='{"time":"'+ now+'", "temp":"'+temp_str+'","humidity":"'+humidity_str+'"}'
print(json)
