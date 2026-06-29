# INTELISIS.md

# Integración con Intelisis

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define cómo se integrará PG Lista 3 AI con Intelisis.

Intelisis será considerado el sistema ERP oficial de la empresa.

La aplicación no reemplaza Intelisis.

Su función es utilizar la información del ERP para generar inteligencia comercial y ayudar a los vendedores a vender más.

---

# Filosofía

Intelisis almacena datos.

PG Lista 3 AI genera decisiones.

El sistema deberá leer información de Intelisis para:

* Analizar clientes.
* Analizar productos.
* Analizar ventas.
* Detectar oportunidades.
* Recomendar acciones.
* Generar seguimiento automático.

---

# Información que deberá obtenerse

## Clientes

Nombre

RFC

Teléfono

Correo

Dirección

Lista comercial

Condiciones de pago

Crédito

Sucursal

Vendedor asignado

Fecha de alta

Última compra

Total comprado

---

## Productos

Código

Nombre

Descripción

Familia

Subfamilia

Marca

Categoría

Precio

Costo

Existencia

Existencia por sucursal

Unidad

Imagen

Activo

Descontinuado

---

## Inventario

Existencia

Entradas

Salidas

Reservado

Disponible

Inventario mínimo

Inventario máximo

---

## Ventas

Factura

Fecha

Cliente

Producto

Cantidad

Precio

Descuento

Subtotal

IVA

Total

Sucursal

Vendedor

Forma de pago

---

## Cotizaciones

Número

Cliente

Fecha

Productos

Monto

Estado

Vendedor

---

## Pedidos

Número

Cliente

Fecha

Estado

Productos

Entrega

---

## Cuentas por cobrar

Cliente

Saldo

Crédito disponible

Fecha de vencimiento

Días vencidos

---

# Sincronización

La sincronización deberá ser automática.

Nunca deberá capturarse información manual si ya existe en Intelisis.

Toda la información deberá mantenerse actualizada.

---

# Frecuencia de sincronización

Clientes

Cada hora

---

Productos

Cada hora

---

Inventario

Cada 5 minutos

---

Ventas

Tiempo real cuando sea posible.

En caso contrario, cada 5 minutos.

---

Cotizaciones

Cada 10 minutos.

---

# Identificadores

Cada registro deberá conservar el ID oficial de Intelisis.

Nunca deberán generarse identificadores duplicados.

---

# Fuente Oficial

La aplicación deberá considerar como verdad absoluta:

Clientes

Productos

Ventas

Inventario

Cotizaciones

Facturación

Existencias

Siempre que provengan de Intelisis.

---

# Información propia del sistema

PG Lista 3 AI almacenará información que Intelisis normalmente no administra.

Ejemplos:

Notas comerciales

Seguimientos

Recordatorios

Llamadas

WhatsApp

Visitas

Nivel de interés

Calificación IA

Probabilidad de compra

Clientes similares

Oportunidades

Ideas del vendedor

Observaciones

---

# Inteligencia Artificial

La IA utilizará la información proveniente de Intelisis para:

Detectar clientes inactivos.

Detectar clientes frecuentes.

Encontrar oportunidades de venta.

Calcular ticket promedio.

Predecir próximas compras.

Detectar productos sin movimiento.

Encontrar clientes con potencial.

Generar recordatorios.

Sugerir ventas cruzadas.

Sugerir promociones.

Priorizar clientes.

---

# Reglas

Nunca modificar información directamente en Intelisis.

Toda modificación deberá realizarse desde Intelisis o mediante una integración autorizada.

La aplicación será principalmente de consulta, análisis y seguimiento comercial.

---

# Futuras Integraciones

La arquitectura deberá permitir conectar:

API oficial de Intelisis.

Base de datos SQL Server.

Servicios Web.

Archivos CSV.

Archivos Excel.

Sincronización mediante procesos ETL.

Webhooks.

---

# Seguridad

Toda comunicación con Intelisis deberá realizarse mediante conexiones seguras.

Las credenciales nunca deberán almacenarse en el código fuente.

Las conexiones deberán utilizar variables de entorno.

Todo acceso deberá quedar registrado.

---

# Objetivo Final

El usuario nunca deberá preocuparse por buscar información dentro de Intelisis.

Simplemente preguntará al agente:

"¿Qué clientes llevan más de 45 días sin comprar?"

"¿Qué constructoras compraron porcelanato este mes?"

"¿Qué productos tienen inventario alto y pocas ventas?"

"¿Qué cotizaciones siguen pendientes?"

"¿Qué clientes podrían comprar hoy?"

Y el agente responderá utilizando la información sincronizada desde Intelisis.

---

# Visión a Largo Plazo

PG Lista 3 AI será la capa de inteligencia comercial sobre Intelisis.

Intelisis continuará siendo el ERP transaccional.

PG Lista 3 AI se convertirá en el asistente inteligente de vendedores, gerentes y dirección comercial, transformando los datos operativos del ERP en decisiones accionables para incrementar las ventas y mejorar la atención al cliente.

