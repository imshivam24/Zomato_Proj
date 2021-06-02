from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)


#Function Decorators
@app.route('/')
def home():
    return render_template('app.html')

@app.route('/get_location_names', methods=['GET'])

def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_rest_type_names', methods=['GET'])


def get_rest_type_names():
    response = jsonify({
        'rest_types': util.get_rest_type_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response





@app.route('/predict_home_price', methods=['GET','POST'])
def predict_home_price():

    Cuisines = int(request.form.get('uicuisines',False))
    total_cost = int(request.form.get('uicost',False))
    Online = request.form.get('uionline',False)
    Book_tables = request.form.get('uitable',False)
    location = request.form.get('uiLocations',False)
    restraunt_type = (request.form.get('uirest_types',False))
    
    
  
    response = jsonify({
        'estimated_price': util.get_estimated_price(Cuisines,total_cost,Online,Book_tables,location,restraunt_type)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')  

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.debug = True
    app.run()


# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/hello')

# def hello():
#     return "Hi"




# if __name__ == "__main__":
#     print("Starting Python Flask Server For Home Price Prediction...")
    
#     app.run()