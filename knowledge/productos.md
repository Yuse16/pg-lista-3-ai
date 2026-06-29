# PRODUCTOS.md

# Base de Conocimiento de Productos

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define cómo debe entender la Inteligencia Artificial el catálogo de productos de Plomería García.

No representa el catálogo completo.

Representa el conocimiento comercial necesario para ayudar al vendedor a recomendar productos y aumentar las ventas.

La información detallada (códigos, precios, existencias e imágenes) será obtenida desde Intelisis.

---

# Filosofía

Los productos no deben analizarse de forma individual.

Cada producto forma parte de una solución para el cliente.

El objetivo del vendedor no es vender una pieza.

Es ayudar al cliente a terminar correctamente su proyecto.

---

# Información de cada producto

Cada producto deberá tener como mínimo:

* Código
* Nombre
* Descripción
* Categoría
* Subcategoría
* Marca
* Unidad de venta
* Precio
* Existencia
* Existencia por sucursal
* Estado
* Imagen
* Productos relacionados

---

# Estado del Producto

Todo producto deberá tener uno de los siguientes estados:

* Activo
* Descontinuado
* Temporalmente sin existencia
* Bajo pedido
* Promoción

---

# Clasificación Comercial

Cada producto podrá clasificarse como:

* Producto principal
* Producto complementario
* Producto premium
* Producto económico
* Producto estratégico
* Producto de alta rotación
* Producto de temporada

---

# Relaciones entre Productos

El sistema deberá conocer qué productos normalmente se venden juntos.

Ejemplos:

## Porcelanato

Relacionados:

* Adhesivo
* Boquilla
* Niveladores
* Crucetas
* Herramientas de instalación

---

## Azulejo

Relacionados:

* Adhesivo
* Boquilla
* Crucetas

---

## Sanitario

Relacionados:

* Asiento
* Llave angular
* Mangueras
* Brida
* Accesorios

---

## Lavabo

Relacionados:

* Monomando
* Cespol
* Contra
* Llaves
* Accesorios

---

## Tarja

Relacionados:

* Mezcladora
* Contra
* Cespol
* Accesorios

---

## Boiler

Relacionados:

* Mangueras
* Conectores
* Llaves
* Accesorios de instalación

---

## Tinaco

Relacionados:

* Bomba
* Flotador
* Válvulas
* Conexiones

---

# Productos Sustitutos

La IA deberá conocer productos equivalentes cuando uno no tenga existencia.

Ejemplo:

Si un modelo está agotado:

Buscar:

* Mismo formato.
* Misma medida.
* Mismo uso.
* Precio similar.

Nunca sugerir un sustituto incompatible.

---

# Productos Premium

La IA deberá identificar productos de mayor valor agregado.

Cuando el presupuesto del cliente lo permita, podrá sugerir opciones premium explicando sus beneficios.

---

# Productos Económicos

Cuando el cliente indique restricciones de presupuesto, la IA deberá ofrecer alternativas funcionales sin comprometer la calidad del proyecto.

---

# Productos de Alta Rotación

La IA deberá identificar los productos con mayor movimiento para:

* Priorizar inventario.
* Detectar oportunidades.
* Recomendar compras complementarias.

---

# Productos de Baja Rotación

La IA podrá sugerir estrategias para impulsar su venta cuando existan campañas o promociones autorizadas.

---

# Productos Nuevos

Cuando se agreguen nuevos productos al catálogo:

La IA deberá:

* Aprender su categoría.
* Identificar productos relacionados.
* Detectar clientes potenciales.
* Recomendar oportunidades de promoción.

---

# Inteligencia Comercial

Antes de sugerir un producto, la IA deberá considerar:

* Giro del cliente.
* Historial de compras.
* Proyecto actual.
* Productos previamente adquiridos.
* Existencia.
* Temporada.
* Compatibilidad.

Nunca sugerir productos únicamente por precio.

---

# Recomendaciones Inteligentes

Ejemplos:

"El cliente está comprando porcelanato. Se recomienda ofrecer adhesivo y boquilla."

"El cliente compra sanitarios frecuentemente. Puede interesarle la nueva línea de accesorios."

"Este cliente siempre compra la marca X. Existe una alternativa premium disponible."

---

# Búsqueda Inteligente

El sistema deberá permitir buscar productos por:

* Código
* Nombre
* Categoría
* Marca
* Descripción
* Aplicación
* Palabras clave

La búsqueda deberá tolerar errores de escritura y mostrar resultados relevantes.

---

# Indicadores

Cada producto podrá mostrar:

* Ventas del mes
* Ventas del año
* Ticket promedio
* Número de clientes
* Margen
* Rotación
* Existencia
* Última venta

---

# Integración con Intelisis

Toda la información oficial deberá obtenerse desde Intelisis.

La aplicación no será responsable de mantener el catálogo manualmente.

Solo almacenará conocimiento adicional para mejorar las recomendaciones de la IA.

---

# Papel del Agente

El agente deberá ayudar al vendedor a responder preguntas como:

* ¿Qué productos puedo ofrecer además?
* ¿Qué alternativa existe si no hay inventario?
* ¿Qué clientes podrían comprar esta nueva línea?
* ¿Qué productos tienen mejor rotación?
* ¿Qué artículos suelen venderse juntos?

---

# Regla Suprema

Nunca recomendar un producto sin analizar el contexto del cliente, el tipo de proyecto y la información disponible.

El objetivo no es vender más piezas.

El objetivo es ofrecer la solución más adecuada para el cliente, fortaleciendo la relación comercial y aumentando el valor de cada venta.

---

# Visión Final

El catálogo de productos será la base técnica del sistema.

La Inteligencia Artificial utilizará esta información para transformar un catálogo tradicional en un asistente comercial capaz de recomendar productos, detectar oportunidades de venta cruzada y ayudar al vendedor a ofrecer soluciones completas, no solo artículos individuales.

