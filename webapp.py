from flask import Flask
from flask import render_template, request

import cv2 as cv
import json
import numpy as np

app = Flask(__name__)

def json_to_sketch(data, npx):
    sketch = np.zeros((npx, npx, 1), np.uint8)
    for pnts, c, w, mode in zip(data['strokes'], data['colors'], data['widths'], data['modes']):
        c = c.lstrip('#')
        c = int(c[:2], 16)
        w = int(w*npx)
        for i in range(len(pnts)-1):
            pnt1 = (int(pnts[i][0]*npx), int(pnts[i][1]*npx))
            pnt2 = (int(pnts[i+1][0]*npx), int(pnts[i+1][1]*npx))
            cv.line(sketch, pnt1, pnt2, 255, w)
    return sketch

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    image = request.form['image']
    data = json.loads(image)
    sketch = json_to_sketch(data, 256)
    sketch = cv.resize(sketch, (28, 28), interpolation=cv.INTER_AREA)
    return "Hello predict!"

if __name__ == '__main__':
    app.run()
