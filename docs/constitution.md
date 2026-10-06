# Constitución de Fabrica-nexus

## Propósito

Este documento define los principios fundamentales e innegociables que gobiernan el desarrollo de **Fabrica-nexus**.

Toda especificación, decisión técnica, implementación, revisión y modificación del proyecto debe respetar estos principios. Si una especificación entra en conflicto con esta constitución, la especificación debe modificarse.

La constitución es una fuente de verdad permanente del proyecto y debe evolucionar únicamente cuando exista una razón técnica o de negocio clara que justifique cambiar uno de sus principios.

---

## Principios innegociables

### 1. Especificación antes que implementación

Ninguna funcionalidad debe comenzar a implementarse sin una especificación suficientemente clara.

Toda nueva funcionalidad debe definir, como mínimo:

* Qué problema resuelve.
* Qué comportamiento se espera.
* Qué requisitos debe cumplir.
* Qué casos límite deben contemplarse.
* Cómo se verificará que funciona correctamente.

El código debe ser consecuencia de una especificación, no el sustituto de ella.

---

### 2. Arquitectura simple y mantenible

Fabrica-nexus debe priorizar soluciones simples, comprensibles y fáciles de mantener.

No se introducirán abstracciones, dependencias, patrones arquitectónicos o tecnologías únicamente porque sean populares o técnicamente posibles.

Cada decisión técnica debe responder a una necesidad real del proyecto.

Se debe evitar:

* Sobreingeniería.
* Duplicación innecesaria.
* Dependencias sin propósito claro.
* Código difícil de comprender.
* Abstracciones prematuras.

La complejidad debe estar justificada.

---

### 3. Calidad y consistencia del código

Todo código incorporado al proyecto debe seguir las convenciones y estándares definidos para Fabrica-nexus.

Se priorizará:

* Código legible.
* Nombres descriptivos.
* Componentes reutilizables cuando exista una necesidad real.
* Separación clara de responsabilidades.
* Manejo explícito de errores.
* Tipado adecuado.
* Consistencia en la estructura del proyecto.

El código debe poder ser comprendido y modificado por otro desarrollador sin depender del conocimiento de quien lo escribió.

---

### 4. Interfaz centrada en el usuario

La interfaz debe diseñarse pensando primero en la experiencia del usuario y después en la implementación técnica.

Toda funcionalidad visual debe considerar:

* Claridad.
* Consistencia.
* Accesibilidad.
* Diseño responsivo.
* Estados de carga, error, vacío y éxito.
* Feedback claro ante las acciones del usuario.
* Navegación intuitiva.

La implementación en React debe reflejar las decisiones definidas en las especificaciones de UI/UX.

Cuando exista una decisión de diseño previamente documentada, esta debe respetarse salvo que la especificación correspondiente sea modificada.

---

### 5. Verificación antes de considerar una funcionalidad terminada

Una funcionalidad no se considera terminada únicamente porque el código compile o la aplicación se ejecute.

Cada implementación debe contar con una forma verificable de demostrar que cumple su especificación.

Dependiendo de la funcionalidad, la verificación puede incluir:

* Pruebas automatizadas.
* Validación manual.
* Pruebas de integración.
* Comprobación visual.
* Validación mediante navegador.
* Verificación de casos límite.

Los errores encontrados durante la implementación deben documentarse cuando puedan evitarse en futuras funcionalidades.

---

### 6. Cambios trazables y controlados

Todo cambio significativo debe poder relacionarse con una necesidad, especificación o decisión concreta.

Las modificaciones deben realizarse de manera incremental y evitar cambios no relacionados con el objetivo actual.

Antes de introducir un cambio importante se debe considerar:

1. Qué parte del sistema afecta.
2. Qué especificación lo justifica.
3. Qué componentes pueden verse afectados.
4. Cómo se verificará el cambio.
5. Si es necesario actualizar la documentación correspondiente.

No se deben introducir cambios arbitrarios únicamente para "mejorar" código existente si no están relacionados con el objetivo actual.

---

## Jerarquía de decisiones

Cuando exista un conflicto entre diferentes fuentes de información, se seguirá esta prioridad:

1. **Constitución del proyecto**
2. **Especificación de la funcionalidad**
3. **Plan de implementación**
4. **Código existente**
5. **Preferencias o decisiones temporales**

Una especificación puede definir detalles específicos de una funcionalidad, pero nunca puede violar los principios establecidos en esta constitución.

---

## Regla final

> **Primero entender, después especificar, luego implementar y finalmente verificar.**

Fabrica-nexus debe evolucionar mediante cambios pequeños, documentados, verificables y alineados con sus especificaciones.
