import os
import json
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO

app = FastAPI(title="SwasthBite Model Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "../workingmodel/food_model_v2.keras"))
DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "../workingmodel/Indian Food Images"))

IMG_HEIGHT = 224
IMG_WIDTH = 224

# Calorie mapping
calorie_mapping = {
    "adhirasam": 250, "aloo_gobi": 150, "aloo_matar": 180, "aloo_methi": 160,
    "aloo_shimla_mirch": 170, "aloo_tikki": 200, "anarsa": 220, "ariselu": 240,
    "bandar_laddu": 180, "basundi": 300, "bhatura": 300, "bhindi_masala": 180,
    "biryani": 350, "boondi": 180, "butter_chicken": 400, "chak_hao_kheer": 280,
    "cham_cham": 200, "chana_masala": 250, "chapati": 120, "chhena_kheeri": 260,
    "chicken_razala": 380, "chicken_tikka": 220, "chicken_tikka_masala": 380,
    "chikki": 150, "daal_baati_churma": 500, "daal_puri": 250, "dal_makhani": 350,
    "dal_tadka": 220, "dharwad_pedha": 180, "doodhpak": 280, "double_ka_meetha": 350,
    "dum_aloo": 300, "gajar_ka_halwa": 300, "gavvalu": 200, "ghevar": 350,
    "gulab_jamun": 300, "imarti": 250, "jalebi": 300, "kachori": 250,
    "kadai_paneer": 350, "kadhi_pakoda": 300, "kajjikaya": 220, "kakinada_khaja": 300,
    "kalakand": 250, "karela_bharta": 120, "kofta": 350, "kuzhi_paniyaram": 180,
    "lassi": 200, "ledikeni": 300, "litti_chokha": 400, "lyangcha": 150,
    "maach_jhol": 250, "makki_di_roti_sarson_da_saag": 450, "malapua": 300,
    "misi_roti": 200, "misti_doi": 250, "modak": 150, "mysore_pak": 300,
    "naan": 250, "navrattan_korma": 350, "palak_paneer": 300, "paneer_butter_masala": 400,
    "phirni": 250, "pithe": 200, "poha": 180, "poornalu": 250, "pootharekulu": 200,
    "qubani_ka_meetha": 350, "rabri": 350, "ras_malai": 250, "rasgulla": 150,
    "sandesh": 180, "shankarpali": 180, "sheer_korma": 300, "sheera": 250,
    "shrikhand": 300, "sohan_halwa": 350, "sohan_papdi": 200, "sutar_feni": 300,
    "unni_appam": 180,
}

protein_mapping = {
    "dal_tadka": 8, "paneer_butter_masala": 14, "biryani": 15, "chana_masala": 10,
    "chicken_tikka": 20, "palak_paneer": 12, "dal_makhani": 9, "chapati": 3,
    "naan": 5, "poha": 4, "aloo_gobi": 3, "bhindi_masala": 3, "butter_chicken": 22,
    "maach_jhol": 18, "chicken_razala": 20, "litti_chokha": 12, "daal_baati_churma": 15,
    "kofta": 10, "kadai_paneer": 14, "shrikhand": 6, "misti_doi": 5, "modak": 3,
    "rasgulla": 4, "lyangcha": 3, "chicken_tikka_masala": 22, "dum_aloo": 5,
    "kadhi_pakoda": 8, "lassi": 6, "navrattan_korma": 10, "ras_malai": 6,
}

print(f"Loading model from {MODEL_PATH}...")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Get class names from folders
if os.path.exists(DATA_DIR):
    class_names = sorted([d for d in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, d))])
else:
    class_names = sorted(list(calorie_mapping.keys()))

@app.post("/scan")
async def scan_food(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server.")
    
    try:
        contents = await file.read()
        
        # Load image with TF
        img = tf.keras.utils.load_img(BytesIO(contents), target_size=(IMG_HEIGHT, IMG_WIDTH))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = np.expand_dims(img_array, 0) # Create a batch
        
        predictions = model.predict(img_array, verbose=0)
        score = tf.nn.softmax(predictions[0])
        
        predicted_class = class_names[np.argmax(score)]
        confidence = float(np.max(score))
        
        return {
            "success": True,
            "detected": predicted_class,
            "confidence": confidence,
            "calories": calorie_mapping.get(predicted_class, 400),
            "protein": protein_mapping.get(predicted_class, 5)
        }
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
