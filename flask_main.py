import os

from flask import Flask, render_template, url_for, request, jsonify
if os.name != 'nt':
	import RPi.GPIO as gpio
import random 

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('main/index.html')
	
@app.route('/update_light/', methods=['GET', 'POST'])
def update_light():
	print(request)
	#if request.method == "POST":
		#print(request.json)
	return render_template('main/index.html')	

@app.route('/sd_update/')
def sd_update():
	r_temp = 24 + random.uniform(0, 1)	
	templateData = {
		'data_temp': r_temp
		}
	return jsonify(templateData), 200


if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')
	if os.name != 'nt':
		gpio.setmode(gpio.BCM)
		gpio.setwarnings(False)
		gpio.setup(18, gpio.OUT)
