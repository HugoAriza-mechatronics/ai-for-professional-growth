# AI for Professional Growth

Sitio web educativo sobre cómo aplicar la inteligencia artificial al desarrollo profesional: **ejemplos reales, un método para diseñar prompts, prompts listos para copiar y un laboratorio para armar el tuyo**.

**En línea:** https://hugoariza-mechatronics.github.io/ai-for-professional-growth/

**Versión:** beta v2, en revisión.

---

## Qué es

Una guía breve, en español, para usar la IA en el aprendizaje, el trabajo y la carrera profesional. No es un curso, no es un chatbot y no requiere registro: es una página que se lee y se usa.

Cada idea se presenta con un ejemplo concreto y un prompt que se puede copiar tal cual, cambiando solo lo que está entre corchetes. El objetivo es que cualquiera pueda pasar de "no sé por dónde empezar" a probar algo útil en el mismo minuto.

## Contenido del sitio

| Sección | Qué ofrece |
| --- | --- |
| **Posibilidades** | Cinco aplicaciones prácticas: aprender, trabajar, crear, crecer y automatizar. Se pueden filtrar por categoría. |
| **Ejemplos reales** | Tres comparativas "antes / después" (correo, plan de estudio, CV) con el prompt completo. |
| **Método** | Cómo armar un prompt: las cinco piezas, el orden que te sirva, cuánto debe medir y un ejemplo anotado. |
| **Experimenta** | Laboratorio de prompts: eliges tu área y tu objetivo, y se genera un prompt listo para abrir en ChatGPT o Copilot. |
| **Uso responsable** | Cuatro criterios: verificar, proteger datos, aprender y decidir. |
| **Tu siguiente paso** | Una propuesta para empezar con una tarea pequeña. |

## Cómo se usa

1. **Explora** las aplicaciones y filtra por la categoría que te interese.
2. **Abre un ejemplo** para ver la diferencia entre un prompt vago y uno bien construido.
3. **Aprende el método**: las cinco piezas, el largo que conviene y lo que hay que revisar antes de enviar.
4. **Prueba** con el laboratorio: escribe tu área, elige un objetivo y el prompt se arma solo.
5. **Úsalo** con "Copiar" o con "Probar en ChatGPT", que abre la herramienta con el texto ya cargado.

No hay cuentas ni formularios. Todo lo que escribes se queda en tu navegador: nada se envía ni se guarda en un servidor.

## Estructura del proyecto

```
.
├── index.html              Todo lo que se lee: textos, secciones, metadatos y datos para buscadores
├── styles.css              Los colores, las tipografías y el diseño; también cómo se adapta a móvil
├── script.js               Los filtros, el modal de prompts, el generador y el botón de copiar
├── og-image.png            La imagen que aparece al compartir el enlace (1200 × 630)
├── qr-card.png             Tarjeta con QR para imprimir o repartir (1080 × 1350)
├── qr-github-pages.png     El QR del sitio, en PNG
├── qr-github-pages.svg     El mismo QR, en vectorial
├── favicon.svg             El icono de la pestaña
├── favicon.ico             El mismo icono, para navegadores viejos
├── apple-touch-icon.png    El icono en iPhone y iPad
├── icon-512.png            Icono grande, para pantallas que piden más resolución
├── robots.txt              Qué pueden leer los buscadores
└── sitemap.xml             La lista de páginas para los buscadores
```

## Editar contenido

Casi todo se cambia en `index.html`, y para hacerlo no hace falta entender el diseño. Los títulos y los párrafos están ahí tal cual, uno detrás de otro.

Los prompts merecen una mención aparte. Cada tarjeta, cada ejemplo y cada botón guardan el suyo en un atributo `data-prompt`, y ese mismo texto es el que se ve en el modal y el que se abre en ChatGPT. Si lo cambias una vez, cambia en los dos sitios.

Para que los filtros sigan funcionando, cada tarjeta lleva su `data-category` con el área a la que pertenece: `aprender`, `trabajar`, `crear` o `crecer`. El contador de resultados se calcula solo, así que no hay que tocarlo.

Si lo que quieres es cambiar colores o tipografías, están en las primeras líneas de `styles.css`, dentro de `:root`. Y si cambias tu LinkedIn o tu GitHub, esos enlaces están en el pie de `index.html` y también en el bloque JSON-LD, para que los buscadores lean lo mismo que las personas.

Cuando termines, sube el archivo al repositorio y espera uno o dos minutos: GitHub Pages publica la nueva versión sola.

## Cambiar la dirección del sitio

Si algún día el repositorio cambia de nombre o le pones un dominio propio, la dirección está repetida en varios sitios y conviene cambiarla en todos a la vez. En `index.html` está dentro de los metadatos: `og:url`, `canonical`, `og:image`, `twitter:image` y el `url` del JSON-LD. En `robots.txt`, en la línea del sitemap. En `sitemap.xml`, en la etiqueta `loc`. Y los QR de `qr-card.png` y `qr-github-pages.*` hay que volver a generarlos con la dirección nueva.

## Detalles técnicos

Es HTML, CSS y JavaScript sin más: no hay dependencias que instalar, ni compilación, ni servidor. El laboratorio de prompts funciona entero en el navegador: arma el texto, actualiza el enlace y nada sale de ahí.

El botón de copiar usa la API del portapapeles y, si el navegador no la deja, recurre a seleccionar el texto para que lo copies a mano. Las fuentes DM Sans y Space Grotesk llegan desde Google Fonts; sin conexión se usan las del sistema. Los enlaces `?q=` de ChatGPT y Copilot dependen de que cada servicio acepte ese parámetro, así que a veces abren la conversación vacía.

## Accesibilidad

El modal atrapa el foco mientras está abierto, se cierra con `Escape` y devuelve el foco al botón que lo abrió. Las pestañas de filtro se manejan con las flechas del teclado, hay un enlace para saltar al contenido y todos los controles muestran el foco cuando llegan a ellos. También se respeta `prefers-reduced-motion` y el contraste está revisado.

## Licencia

Este proyecto está bajo la licencia MIT. Puedes usar el código y los textos, cambiarlos y compartirlos, siempre que mantengas el aviso de copyright. Los prompts son ejemplos: tómalos, adáptalos y hazlos tuyos.

## Autor

Hugo Ariza Seminario

- LinkedIn: https://www.linkedin.com/in/hugo-ariza-seminario-884823264/
- GitHub: https://github.com/HugoAriza-mechatronics
