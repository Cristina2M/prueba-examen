# prueba-examen

## Pasos para subir el repositorio a GitHub

1. **Verificar el estado del repositorio local**  
   ```bash
   git status
   ```

2. **Corregir la URL del remoto** (eliminar corchetes)  
   ```bash
   git remote remove origin
   git remote add origin https://github.com/Cristina2M/prueba-examen.git
   ```

3. **Intentar hacer push** (puede fallar si el remoto tiene cambios)  
   ```bash
   git push origin main
   ```

4. **Sincronizar con el remoto** (traer cambios remotos y fusionar)  
   ```bash
   git pull origin main --allow-unrelated-histories
   ```

5. **Volver a hacer push**  
   ```bash
   git push origin main
   ```

Con estos pasos tu repositorio local queda sincronizado con el repositorio remoto en GitHub.

## Pasos adicionales (npm)

1. **Crear/Corregir `package.json`**  
   ```bash
   npm init -y
   ```
2. **Instalar dependencias y generar `package-lock.json`**  
   ```bash
   npm install
   ```
3. **Commit y push de los archivos de npm**  
   ```bash
   git add package.json package-lock.json
   git commit -m "Add package.json and lockfile"
   git push origin main   # o la rama que estés usando
   ```

Con estos archivos presentes, el paso `npm ci` del workflow se ejecutará sin errores.