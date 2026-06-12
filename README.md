# PymeAscend – Sitio Web

Tienda online de polerones, pantalones de buzo y accesorios.

## 📁 Estructura del proyecto

```
pymeascend/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Estilos
├── js/
│   ├── data.js         ← Datos de productos (colores, tallas, precios)
│   └── app.js          ← Lógica del carrito y renderizado
└── README.md
```

## 🎨 Productos incluidos

### Polerones (tallas S, M, L, XL)
**Colores Tierra:** Café, Verde Olivo, Beige, Negro  
**Colores Pastel:** Calipso, Amarillo, Rosado

### Pantalones de Buzo (tallas 36, 38, 40, 42)
**Colores Tierra:** Café, Verde Olivo, Beige, Negro  
**Colores Pastel:** Calipso, Amarillo, Rosado

### Accesorios
Gorro, Bufanda, Mochila, Medias, Cinturón, Bolso Tote

---

## 🚀 Cómo publicar en internet

### Opción 1 — GitHub Pages (gratis, recomendado)

1. **Crea una cuenta en GitHub:** https://github.com  
2. **Crea un nuevo repositorio:**
   - Ve a https://github.com/new  
   - Nombre: `pymeascend` (o el que prefieras)  
   - Visibilidad: **Public**  
   - Haz clic en **Create repository**

3. **Sube los archivos** (arrastra la carpeta completa o usa los comandos):
   ```bash
   git init
   git add .
   git commit -m "Primer commit - PymeAscend"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/pymeascend.git
   git push -u origin main
   ```

4. **Activa GitHub Pages:**
   - Ve a tu repositorio → **Settings** → **Pages**
   - En "Branch" selecciona `main` y carpeta `/ (root)`
   - Haz clic en **Save**

5. Tu sitio estará en:  
   `https://TU_USUARIO.github.io/pymeascend`

---

### Opción 2 — Netlify (gratis, muy fácil)

1. Ve a https://netlify.com y crea una cuenta
2. Haz clic en **"Add new site" → "Deploy manually"**
3. Arrastra la carpeta `pymeascend/` al área de drop
4. ¡Listo! Netlify te dará una URL automáticamente
5. Puedes cambiar la URL en **Site settings → Domain management**

---

### Opción 3 — Vercel (gratis)

1. Ve a https://vercel.com y crea una cuenta con GitHub
2. Importa tu repositorio de GitHub
3. Vercel detecta automáticamente que es un sitio estático
4. Haz clic en **Deploy**

---

## ✏️ Cómo editar precios y productos

Abre `js/data.js`:

```javascript
const PRECIO_POLERON  = 19990;   // ← Cambia el precio del poleron
const PRECIO_BUZO     = 17990;   // ← Cambia el precio del buzo
```

Para editar accesorios, busca el array `ACCESORIOS` en el mismo archivo.

## 📱 Número de WhatsApp para pedidos

En `js/app.js`, busca la línea:
```javascript
window.open(`https://wa.me/56900000000?text=...`)
```
Reemplaza `56900000000` con tu número real (código de país + número, sin el +).

---

## 📞 Contacto en el footer

En `index.html`, busca la sección `contact-info` y actualiza:
- Número de teléfono
- Correo electrónico
- Dirección o ciudad
