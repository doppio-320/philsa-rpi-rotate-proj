import os

from threading import Thread
import time
from flask import Flask, render_template, url_for, request, jsonify
if os.name != 'nt':
	import RPi.GPIO as gpio
import random 

app = Flask(__name__)

motorThread = None
selectedRPM = 0
selectedCW = False

def motorLoop():
	while True:
		global stepInterval
		global rpm		
		#print("RPM: " + str(rpm))
		start = time.time()
		if rpm > 0:
			print("pin 17 hi")
			#gpio.output(17, gpio.HIGH)
		time.sleep(stepInterval / 2)		
		print("pin 17 lo")
		#gpio.output(17, gpio.LOW)
		time.sleep(stepInterval / 2)
		end = time.time()

		global selectedCW
		if selectedCW:
			#gpio.output(27, gpio.HIGH)
			pass
		else:
			#gpio.output(27, gpio.LOW)
			pass

def getIntervalFromRPM(rpm):
	if rpm == 0:
		return 10

	return (60) / ((10000) * (rpm)) - (1.66 * 0.0001)

#Flask stuff
@app.route('/')
def index():
	return render_template('main/index.html')

@app.route('/sd_update/temp')
def sd_update_temp():
	r_temp = 24 + random.uniform(0, 1)	
	templateData = {
		'data_temp': r_temp
		}
	return jsonify(templateData), 200

@app.route('/sd_update/rpm')
def sd_update_rpm():
	global rpm
	sd_rpm = rpm	
	templateData = {
		'data_rpm': sd_rpm
	}
	
	return jsonify(templateData), 200

@app.route('/ctrl_update/rpm', methods=['POST'])
def ctrl_update_rpm():
	data = request.json

	global rpm
	rpm = data['ctrl_rpm']
	
	global stepInterval
	stepInterval = getIntervalFromRPM(rpm)
	#print(stepInterval)

	global selectedCW
	if rpm > 500:
		selectedCW = True
	else:
		selectedCW = False
	
	return render_template('main/index.html')

if __name__ == "__main__":
	global rpm
	rpm = 0
	global stepInterval
	stepInterval = 1

	motorThread = Thread(target=motorLoop)
	motorThread.daemon = True
	motorThread.start()

	app.run(debug=True, host='0.0.0.0')

	if os.name != 'nt':
		gpio.setmode(gpio.BCM)
		gpio.setwarnings(False)
		gpio.setup(18, gpio.OUT)
