import subprocess
import os
<<<<<<< HEAD
import re

# --- CONFIGURACIÓN ---
FFMPEG_PATH = r"C:\ffmpeg\bin\ffmpeg.exe"

# CAMBIA ESTO: Pon la ruta de la carpeta donde están tus videos
CARPETA_ENTRADA = r"public/videos" 
NOMBRE_SUB_CARPETA = "optimizados"

def limpiar_nombre_seo(nombre):
    """Limpia el nombre: minúsculas, sin espacios ni caracteres especiales."""
    nombre = nombre.lower()
    nombre = re.sub(r'[\s\-]+', '_', nombre)
    nombre = re.sub(r'[^a-z0-9_]', '', nombre)
    return nombre

def procesar_videos():
    # Verificar si la carpeta de entrada existe
    if not os.path.exists(CARPETA_ENTRADA):
        print(f"❌ Error: La carpeta de entrada no existe: {CARPETA_ENTRADA}")
        return

    # Definir y crear la carpeta de salida dentro de la de entrada
    ruta_salida_completa = os.path.join(CARPETA_ENTRADA, NOMBRE_SUB_CARPETA)
    if not os.path.exists(ruta_salida_completa):
        os.makedirs(ruta_salida_completa)

    # Extensiones compatibles
    extensiones_validas = ('.mp4', '.mov', '.mkv', '.avi', '.webm', '.flv', '.wmv')
    
    # Listar archivos SOLO de la carpeta de entrada definida
    archivos = [f for f in os.listdir(CARPETA_ENTRADA) 
                if f.lower().endswith(extensiones_validas)]

    if not archivos:
        print(f"⚠️ No se encontraron videos en: {CARPETA_ENTRADA}")
        return

    print(f"🚀 Procesando {len(archivos)} videos desde: {CARPETA_ENTRADA}\n")

    for i, archivo in enumerate(archivos, 1):
        
        nombre_base, _ = os.path.splitext(archivo)
        nuevo_nombre = limpiar_nombre_seo(nombre_base) + ".mp4"
        
        ruta_input = os.path.join(CARPETA_ENTRADA, archivo)
        ruta_output = os.path.join(ruta_salida_completa, nuevo_nombre)

        print(f"[{i}/{len(archivos)}] Optimizando: {archivo} -> {nuevo_nombre}")

        comando = [
            FFMPEG_PATH,
            "-i", ruta_input,
            "-vf", "scale='min(1280,iw)':-2", 
            "-c:v", "libx264",
            "-crf", "28",            
            "-preset", "faster",     
            "-pix_fmt", "yuv420p",   
            "-movflags", "+faststart", 
            "-c:a", "aac",           
            "-b:a", "96k",           
            "-y",                    
            ruta_output
        ]

        try:
            subprocess.run(comando, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
            print(f"    ✅ Completado")
        except Exception as e:
            print(f"    ❌ Error en {archivo}: {e}")

    print(f"\n✨ ¡Listo! Revisa la carpeta: {ruta_salida_completa}")


def optimizar_video_web(ruta_video, crf=30, max_bitrate="800k", width=1280):
    """
    Optimiza un video con parámetros ajustables para alto rendimiento web.
    
    :param ruta_video: Ruta completa del archivo.
    :param crf: Calidad (23 es estándar, 30-32 es ideal para compresión agresiva).
    :param max_bitrate: Límite para que el video no pese de más en escenas movidas.
    :param width: Ancho máximo (1280 para 720p, 720 para móviles).
    """
    if not os.path.isfile(ruta_video):
        print(f"❌ No existe: {ruta_video}")
        return

    # Preparación de rutas
    carpeta_original = os.path.dirname(ruta_video)
    nombre_archivo = os.path.basename(ruta_video)
    nombre_base, _ = os.path.splitext(nombre_archivo)
    
    nuevo_nombre = limpiar_nombre_seo(nombre_base) + ".mp4"
    ruta_salida_carpeta = os.path.join(carpeta_original, NOMBRE_SUB_CARPETA)
    
    if not os.path.exists(ruta_salida_carpeta):
        os.makedirs(ruta_salida_carpeta)
        
    ruta_output = os.path.join(ruta_salida_carpeta, nuevo_nombre)

    # Comando FFMPEG con límites de Bitrate (VBV)
    comando = [
        FFMPEG_PATH,
        "-i", ruta_video,
        "-vf", f"scale='min({width},iw)':-2", # Escala dinámica
        "-c:v", "libx264",
        "-crf", str(crf),            # Calidad base
        "-maxrate", max_bitrate,     # NO pasar de este bitrate
        "-bufsize", "1500k",         # Buffer para el bitrate
        "-preset", "veryfast",       # Equilibrio entre compresión y velocidad
        "-pix_fmt", "yuv420p",   
        "-movflags", "+faststart",   # Crucial para que el video cargue sin bajar todo el archivo
        "-an",                       # Opcional: Quita el audio para ahorrar 100-200kb extra
        "-y",                    
        ruta_output
    ]

    try:
        print(f"🚀 Procesando {nombre_archivo} (Max: {max_bitrate})...")
        subprocess.run(comando, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
        
        # Verificar tamaño final
        size_mb = os.path.getsize(ruta_output) / (1024 * 1024)
        print(f"✅ ¡Listo! Tamaño final: {size_mb:.2f} MB")
        if size_mb > 2:
            print("⚠️ Alerta: El video aún supera los 2MB. Baja el max_bitrate o el CRF.")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    # procesar_videos()
    # Ejemplo de uso para un solo video:
    ruta_video = r"public/videos/mi_video1.mp4"  # Cambia
    optimizar_video_web(
        ruta_video, 
        crf=32,            # Un poco más de compresión
        max_bitrate="750k", # Este valor garantiza ~1.4MB en 15 segundos
        width=1280         # Puedes bajar a 720 si es solo para móvil
    )
=======
FFMPEG_PATH = r"C:\ffmpeg\bin\ffmpeg.exe"
def comprimir_video(
    input_video,
    output_video,
    max_width=1280,
    crf=23,
    preset="slow"
):
    """
    Comprime un video manteniendo la relación de aspecto y optimizándolo para web.

    Parámetros:
    - input_video: ruta del video original
    - output_video: ruta del video comprimido
    - max_width: ancho máximo permitido (default 1280)
    - crf: calidad (18 = muy alta, 23 = balance, 28 = más compresión)
    - preset: velocidad de compresión (slow = mejor compresión)
    """

    if not os.path.exists(input_video):
        raise FileNotFoundError("El archivo de entrada no existe")

    comando = [
    FFMPEG_PATH,
    "-i", input_video,
    "-vf", f"scale='min({max_width},iw)':-2",
    "-c:v", "libx264",
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-crf", str(crf),
    "-preset", preset,
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    "-y",
    output_video
]

    subprocess.run(comando, check=True)
    print("✅ Video comprimido correctamente")
    
comprimir_video(
    input_video="public\\videos\\MI video1.mp4",
    output_video="video.mp4"
)
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
