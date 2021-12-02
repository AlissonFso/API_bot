import pickle

def reconfig():
    classes1 = pickle.load(open('classes.pkl', 'rb'))
    i = 0
    classes_error = classes1[0]
    for x in classes1:
        if x == "anything_else":
            break
        else: i += 1
     
    classes1[0] = "anything_else"
    
    classes1[i] = classes_error
    
    pickle.dump(classes1, open('classes.pkl', 'wb'))

