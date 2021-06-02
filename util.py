  
import pickle
import json
import numpy as np

__locations = None
__rest_type = None
__data_columns = None
__model = None

def get_estimated_price(Cuisines,Cost,Online,Book_table,location,restraunt_type):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    try:
        res_index = __data_columns.index(restraunt_type.lower())
    except:
        res_index = -1

    

              

    x = np.zeros(len(__data_columns))
    
    x[0] = Cuisines
    x[1] = Cost
    x[2]=Online
    x[3]=Book_table

    if loc_index>=0:
        x[loc_index] = 1
    if res_index>=0:
        x[res_index] = 1
               

    if (__model.predict([x])[0],2) == 0:
        res='Your Restraunt may be failure'
    else:
        res='Your restraunt may be success'    

    return res
    #return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations
    global __rest_type 


    with open("C:/Users/pc/Desktop/deploy/server/artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[2:48]
        __rest_type = __data_columns[48:58]
         # first 3 columns are sqft, bath, bhk

    global __model
    if __model is None:
        with open('C:/Users/pc/Desktop/deploy/server/artifacts/zomato_project.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_rest_type_names():
    return __rest_type  



def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    # print(get_location_names())
    # print(get_rest_type_names())
    # print(get_listed_in_names())
    # print(get_city_names())

    print(get_estimated_price(3,800,1,1,'Banashankari','Casual Dining'))
   