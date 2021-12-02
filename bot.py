import json

from json import decoder, detect_encoding
from json import encoder
from pickle import NONE
from re import escape
from threading import Thread
from tensorflow import *
from keras.saving.saved_model.json_utils import decode
from numpy.core.arrayprint import str_format
from extract import class_prediction, get_response
from keras.models import load_model
from flask import Flask, request, render_template # Importa a biblioteca
from jinja2 import evalcontextfilter, Markup, escape
from train import train as tr
import sys
import os

import re

import pyperclip

cad = False
model = load_model('model.h5')
intents = json.loads(open(r'M:\Relacionamento com Cliente - Filial Minas\Suporte Técnico\Backup - Manuais e esquemas elétricos\Condominial\Alisson\intents.json', encoding= 'utf-8').read())

def restart_program():
    python = sys.executable
    os.execl(python, python, * sys.argv)

def chatbot_response(msg):
    global intents
    """
        Resposta do bot
    """
    
    ints = class_prediction(msg, model)
    res = get_response(ints, intents)
    return res


def linebreaks(value):
    """Converts newlines into <p> and <br />s."""
    value = re.sub(r'\r\n|\r|\n', '\n', value) # normalize newlines
    paras = re.split('\n{2,}', value)
    paras = [u'<p>%s</p>' % p.replace('\n', '<br />') for p in paras]
    paras = u'\n\n'.join(paras)
    return Markup(paras)

def send(msg = ''):    

    if msg != '':
        print(msg) 
        response = chatbot_response(msg)
        response_ok = linebreaks(response)
        #pyperclip.copy(response)
        #print(response_ok)
        if msg != '' and msg != 'None': 
            if "Desculpa" in response_ok:
                data = {
                            'tag': msg
                    }
                with open('sem_cadastro.json','w', encoding= 'utf-8') as fp:    
                    sem_cadastro = json.loads(open('sem_cadastro2.json', encoding= 'utf-8').read())
                    sem_cadastro1 = sem_cadastro
                    sem_cadastro2 = sem_cadastro1['intents']
                    sem_cadastro2.append(data)
                    sem_cadastro1['intents'] = sem_cadastro2
                    json.dump(sem_cadastro1, fp, sort_keys=False, indent=2, ensure_ascii=False)
                with open('sem_cadastro2.json','w', encoding= 'utf-8') as fp:
                    sem_cadastro = json.loads(open('sem_cadastro.json', encoding= 'utf-8').read())
                    #intents2 = intents1['intents']
                    #print(type(intents2))
                    #intents1['intents'] = intents2
                    json.dump(sem_cadastro, fp, sort_keys=False, indent=2, ensure_ascii=False)
        
        return response_ok

        



app = Flask(__name__) # Inicializa a aplicação

@app.route('/', methods = ['GET','POST']) # Nova rota
def main():
    global cad
    if cad:
        cad = False
        restart_program()
    chat = ''
    resultado = ''
    resultado_str = ''

    chat = str(request.args.get('Dados'))
    
    #print(intents)
    
    if chat != '' and chat != 'None':
        resultado = (send(chat))
        #print("--------------",type(resultado))
        resultado_str = str(resultado)
        #print(resultado_str)
        resultado_str = resultado_str.replace("<p>","")
        resultado_str = resultado_str.replace("</p>","")
        resultado_str = resultado_str.replace("<br />","\n")
        

    return render_template('index.html', resultado = resultado, resultado_str = resultado_str)

@app.route('/source', methods=['GET','POST'])
def source():
    global intents, model, cad
    tag_cad = ''
    pattern_cad1 = ''
    pattern_cad2 = ''
    pattern_cad3 = ''
    resposta_cad = ''
    retorno = ''
    tag_cad = str(request.values.get('tag'))
    pattern_cad1 = str(request.values.get('pattern1'))
    pattern_cad2 = str(request.values.get('pattern2'))
    pattern_cad3 = str(request.values.get('pattern3'))
    resposta_cad = str(request.values.get('resp'))
    print(tag_cad, pattern_cad1, pattern_cad2, pattern_cad3, resposta_cad)
    if tag_cad != 'None' and pattern_cad1 != 'None' and pattern_cad2 != 'None' and pattern_cad3 != 'None' and resposta_cad != 'None' :
                    
        with open(r'M:\Relacionamento com Cliente - Filial Minas\Suporte Técnico\Backup - Manuais e esquemas elétricos\Condominial\Alisson\intents.json','w', encoding= 'utf-8') as fp:
            
            if tag_cad == '' or pattern_cad1 == '' or pattern_cad2 == '' or pattern_cad3 == '' or resposta_cad == '' :
                pass
            else: 
                data = {
                        'tag': tag_cad,
                        'patterns': [pattern_cad1, pattern_cad2, pattern_cad3],
                        'responses':[resposta_cad],
                        'context':[""]
                }
                intents1 = json.loads(open('intents.json', encoding= 'utf-8').read())
                intents2 = intents1['intents']
                #print(type(intents2))
                intents2.append(data)
                intents1['intents'] = intents2
                #intents1['intents'] = intents2
                #print(intents1, type(intents1['intents']))
                json.dump(intents1, fp, sort_keys=False, indent=2, ensure_ascii=False)
                cad_ok = True
                cad = True
               
        treino = tr()
        if treino and cad_ok:
             with open('intents.json','w', encoding= 'utf-8') as fp:
                intents1 = json.loads(open(r'M:\Relacionamento com Cliente - Filial Minas\Suporte Técnico\Backup - Manuais e esquemas elétricos\Condominial\Alisson\intents.json', encoding= 'utf-8').read())
                #intents2 = intents1['intents']
                #print(type(intents2))
                #intents1['intents'] = intents2
                json.dump(intents1, fp, sort_keys=False, indent=2, ensure_ascii=False)
             retorno = 'Cadastrado'
             cad_ok = False
             
             

        else: retorno = 'Falha no cadastro'


        intents = json.loads(open(r'M:\Relacionamento com Cliente - Filial Minas\Suporte Técnico\Backup - Manuais e esquemas elétricos\Condominial\Alisson\intents.json', encoding= 'utf-8').read())
        model = load_model('model.h5')
        
        return render_template('cadastro.html', retorno = retorno)
    
    else: 
        retorno = 'Erro'
        return render_template('cadastro.html', retorno = retorno)

    

if __name__ == '__main__':
  app.run(host = '0.0.0.0', debug=True) # Executa a aplicação
  app.static_folder = 'static'







