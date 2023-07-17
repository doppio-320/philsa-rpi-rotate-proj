from flask import Flask, render_template, url_for, request
import RPi.GPIO as gpio

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

if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')
	gpio.setmode(gpio.BCM)
	gpio.setwarnings(False)
	gpio.setup(18, gpio.OUT)
