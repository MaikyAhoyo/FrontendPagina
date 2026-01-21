# 🎮 GameReview - Catálogo de Reseñas de Videojuegos

> Una aplicación web moderna para consultar reseñas, calificaciones y detalles de los videojuegos más populares.

![Estado del Proyecto](https://img.shields.io/badge/Estado-En_Desarrollo-green?style=flat-square)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=flat-square)

## 📋 Descripción

Este proyecto es una plataforma web desarrollada para practicar el consumo de datos dinámicos utilizando **JavaScript Vanilla**. La aplicación carga información de videojuegos y reseñas desde archivos JSON locales, renderizando tarjetas interactivas y adaptables (Responsive Design).

El diseño sigue una estética "Gamer/Dark Mode" utilizando **CSS Grid** y **Flexbox** para la maquetación.

## 🚀 Tecnologías Utilizadas

* **HTML5 Semántico**: Uso de etiquetas `<main>`, `<section>`, `<article>`.
* **CSS3 Moderno**:
    * Variables CSS.
    * Flexbox y CSS Grid.
    * Animaciones y transiciones (`hover`, transform).
* **JavaScript**:
    * `fetch API` para consumo de datos asíncronos.
    * Manipulación del DOM.
    * `async/await`.
* **JSON**: Almacenamiento local de datos (simulación de base de datos).

## 📂 Estructura del Proyecto

```text
/mi-proyecto-web
│
├── index.html          # Archivo principal
├── README.md           # Documentación
│
├── /css
│   └── styles.css      # Estilos globales y componentes
│
├── /js
│   └── app.js          # Lógica de renderizado y fetch
│
├── /data               # Base de datos simulada
│   ├── games.json      # Catálogo de juegos
│   └── reviews.json    # Reseñas de usuarios
│
└── /img                # Recursos gráficos
    ├── logo.png
    ├── games/          # Portadas de juegos
    └── avatars/        # Avatares de usuarios
