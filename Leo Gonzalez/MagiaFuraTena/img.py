import os
from pathlib import Path
from PIL import Image

def optimizar_carpeta(directorio_entrada, calidad=80, ancho_max=1920):
    # Crear carpeta de salida si no existe
    ruta_entrada = Path(directorio_entrada)
    ruta_salida = ruta_entrada / "optimizadas"
    ruta_salida.mkdir(exist_ok=True)

    # Extensiones compatibles
    extensiones = ('.jpg', '.jpeg', '.png', '.bmp', '.webp')

    print(f"🚀 Iniciando optimización en: {ruta_entrada}")
    
    for archivo in ruta_entrada.iterdir():
        if archivo.suffix.lower() in extensiones:
            try:
                with Image.open(archivo) as img:
                    # Convertir a RGB si es necesario (evita errores con PNG transparentes a JPG)
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")

                    # Redimensionar proporcionalmente
                    ancho, alto = img.size
                    if ancho > ancho_max:
                        proporcion = ancho_max / float(ancho)
                        nuevo_alto = int(float(alto) * proporcion)
                        img = img.resize((ancho_max, nuevo_alto), Image.Resampling.LANCZOS)

                    # Guardar con el mismo nombre en la carpeta de salida
                    # Puedes cambiar "WEBP" por "JPEG" si lo prefieres
                    destino = ruta_salida / archivo.name
                    # Cambia esta línea en el script:
                    img.save(destino, "WEBP", quality=calidad, method=6)
                    
                    print(f"✅ {archivo.name} optimizado.")
            except Exception as e:
                print(f"❌ No se pudo procesar {archivo.name}: {e}")

    print(f"\n✨ Proceso terminado. Revisa la carpeta: {ruta_salida}")
<<<<<<< HEAD
from PIL import Image
import os

def optimizar_imagenes(directorio):
    for filename in os.listdir(directorio):
        if filename.endswith((".jpg", ".png", ".jpeg")):
            img = Image.open(os.path.join(directorio, filename))
            # Convertir a WebP con calidad 80 (casi imperceptible la pérdida)
            target_name = os.path.splitext(filename)[0] + ".webp"
            img.save(os.path.join(directorio, target_name), "WEBP", quality=80)
            print(f"Optimizado: {target_name}")
            
def optimizar_real(directorio, calidad=20, ancho_max=1920):
    # 1. Crear la ruta de salida completa
    ruta_salida_base = os.path.join(directorio,"optimizadas",)
    
    # 2. Asegurar que la carpeta de destino exista (Evita el error)
    if not os.path.exists(ruta_salida_base):
        os.makedirs(ruta_salida_base)
        print(f"Carpeta creada: {ruta_salida_base}")

    for filename in os.listdir(directorio):
        if filename.lower().endswith((".jpg", ".png", ".jpeg", ".bmp", ".webp")):
            ruta_original = os.path.join(directorio, filename)
            
            try:
                img = Image.open(ruta_original)
                
                # Convertir a RGB si es necesario (evita errores con PNG transparentes a WebP)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # 3. Redimensionar (Max 1920px)
                if img.width > ancho_max:
                    proporcion = ancho_max / float(img.width)
                    alto = int((float(img.height) * float(proporcion)))
                    img = img.resize((ancho_max, alto), Image.Resampling.LANCZOS)
                
                # 4. Definir nombre y ruta final
                target_name = os.path.splitext(filename)[0] + ".webp"
                ruta_final = os.path.join(ruta_salida_base, target_name)
                
                # 5. Guardar
                img.save(ruta_final, "WEBP", quality=calidad, optimize=True)
                
                peso_orig = os.path.getsize(ruta_original) / 1024
                peso_nuevo = os.path.getsize(ruta_final) / 1024
                print(f"Éxito: {filename} ({peso_orig:.1f}KB -> {peso_nuevo:.1f}KB)")
                
            except Exception as e:
                print(f"Error procesando {filename}: {e}")
=======
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e

# --- CONFIGURACIÓN ---
if __name__ == "__main__":
    # Cambia esto por la ruta de tu carpeta
<<<<<<< HEAD
    optimizar_real('public/img/Galeria', calidad=20, ancho_max=600)
    print("¡Optimización completa! Revisa la carpeta 'optimizadas' dentro de 'public/img/Galeria'.")
=======
    mi_carpeta = "public/img/" 
    
    if os.path.exists(mi_carpeta):
        optimizar_carpeta(mi_carpeta)
    else:
        print("La ruta especificada no existe.")
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
