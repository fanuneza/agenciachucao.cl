export interface Service {
  id: string;
  name: string;
  headline: string;
  problema: string;
  solucion: string;
  cta: {
    primary: string;
    whatsappMessage: string;
    secondary?: string;
  };
  featured: boolean;
}

export const services: Service[] = [
  {
    id: 'gestion-de-redes-sociales',
    name: 'Gestión de Redes Sociales',
    headline: 'Tus redes sociales deberían traerte clientes. ¿Lo están haciendo?',
    problema: `Tienes perfil en Instagram. Quizás en LinkedIn o Facebook también. Publicas cuando puedes, a veces con ganas, a veces porque sientes que deberías. Y al final del mes, las redes no te trajeron ningún cliente.

No es culpa tuya. Es que publicar sin estrategia es como abrir una tienda sin letrero: la actividad existe, pero nadie sabe para qué entrar.

Lo que más escuchamos de quienes llegan a Agencia Chucao: "Tengo redes, las actualizo, pero no me dan resultados. No sé qué estoy haciendo mal."

La respuesta, casi siempre, es la misma: no hay una estrategia detrás. Solo contenido suelto sin dirección ni propósito.`,
    solucion: `Nos encargamos de la gestión completa de tus redes sociales. Sin humo, sin promesas vacías, sin métricas de vanidad.

Esto incluye estrategia editorial (definimos qué publicar, para quién y con qué objetivo), creación de contenido (textos, diseño visual y formato adaptado a cada red), publicación y calendario (consistencia sin que tengas que pensar en eso) y gestión de comunidad (respondemos comentarios y mensajes con la voz de tu marca).

Lo que no hacemos: prometerte números mágicos en 30 días. Las redes sociales bien gestionadas construyen presencia con el tiempo.`,
    cta: {
      primary: 'Cotiza la gestión de tus redes',
      whatsappMessage: 'Hola%2C%20me%20interesa%20cotizar%20la%20gesti%C3%B3n%20de%20redes%20sociales%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'seo-tecnico-y-posicionamiento',
    name: 'SEO Técnico y Posicionamiento',
    headline: 'Tu sitio existe. Tus clientes no lo encuentran.',
    problema: `Tienes un sitio web. Lo lanzaste, lo compartiste y esperaste. Pero cuando alguien en tu ciudad busca lo que tú haces, no apareces. O apareces en la página cuatro, donde nadie llega.

El SEO es uno de los servicios más malentendidos del marketing digital. Hay agencias que te prometen el primer lugar en Google en 30 días. Hay otras que te cobran mes a mes sin explicarte qué están haciendo. Y hay muchos sitios que tienen problemas técnicos graves que nadie ha detectado porque nadie se tomó el tiempo de revisarlos.

El resultado es siempre el mismo: plata gastada, posición que no mejora y una desconfianza creciente hacia cualquier agencia que mencione la palabra SEO.`,
    solucion: `Empezamos con una auditoría técnica completa de tu sitio. Revisamos velocidad de carga, estructura de URLs, etiquetas, indexación, errores de rastreo, experiencia móvil y todos los factores que Google usa para decidir si tu sitio merece aparecer o no.

Con ese diagnóstico en mano, construimos una estrategia de posicionamiento basada en lo que tus clientes realmente están buscando. No en suposiciones ni en palabras clave genéricas.

El trabajo incluye auditoría técnica con prioridades claras, estrategia de palabras clave, optimización on-page y seguimiento con reportes que explican lo que está cambiando y por qué.`,
    cta: {
      primary: 'Pide tu auditoría SEO gratuita',
      whatsappMessage: 'Hola%2C%20me%20interesa%20una%20auditor%C3%ADa%20SEO%20gratuita%20para%20mi%20sitio%20web%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'desarrollo-web',
    name: 'Desarrollo Web',
    headline: 'Tu sitio web es tu vendedor más barato. ¿Está haciendo su trabajo?',
    problema: `Muchos negocios tienen sitio web. Pocos tienen un sitio web que trabaja.

El problema más común no es la apariencia: es la estructura. Páginas lentas que Google penaliza. Sitios que en el celular son un desastre. Formularios de contacto que nadie encuentra. Textos copiados de la competencia que no le hablan a nadie en particular.

Un sitio así no es neutral. Activamente aleja clientes. Alguien llega, no encuentra lo que busca en los primeros segundos y se va. Probablemente a la competencia.`,
    solucion: `Construimos sitios web de alto rendimiento pensados para tu cliente, no para impresionar a otros diseñadores.

El trabajo incluye diseño y estructura (páginas organizadas en torno a lo que tu cliente necesita ver, con una ruta de conversión clara), rendimiento técnico (carga rápida, bien optimizado), SEO incorporado desde el primer día, formulario de contacto y WhatsApp bien implementados, y seguridad y estabilidad sin plataformas que se desactualizan solas.

No subcontratamos el desarrollo. Quien habla contigo es quien construye tu sitio.`,
    cta: {
      primary: 'Cuéntanos tu proyecto',
      whatsappMessage: 'Hola%2C%20quiero%20conversar%20sobre%20un%20proyecto%20de%20desarrollo%20web%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'optimizacion-de-google-business-profile',
    name: 'Optimización de Google Business Profile',
    headline: 'Tus clientes te buscan cerca. ¿Los estás encontrando?',
    problema: `Google Business Profile es probablemente la herramienta de marketing local más poderosa que existe. Y la más ignorada.

La mayoría de los negocios tiene una ficha creada casi por accidente: con información incompleta, fotos desactualizadas, sin categorías correctas y sin una sola respuesta a las reseñas que dejaron sus propios clientes.

El resultado es invisible pero costoso. Google interpreta una ficha descuidada como una señal de que el negocio no merece aparecer. Y no aparece. Mientras tanto, la competencia que sí tiene su perfil optimizado se lleva los clientes que te estaban buscando a ti.`,
    solucion: `Auditamos y optimizamos tu perfil de Google Business desde cero. No solo llenamos los campos: construimos una presencia local que Google toma en serio.

El trabajo incluye auditoría y configuración inicial (categorías, información de contacto, horarios), optimización de contenido (descripción, servicios detallados, categorías principales y secundarias), gestión de reseñas con protocolo de respuesta, publicaciones y actualizaciones periódicas, y seguimiento de métricas de visibilidad local.`,
    cta: {
      primary: 'Mejora tu ficha de Google hoy',
      whatsappMessage: 'Hola%2C%20me%20interesa%20optimizar%20mi%20perfil%20de%20Google%20Business%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'creacion-de-contenido',
    name: 'Creación de Contenido',
    headline: 'Publicar no es suficiente. El contenido sin estrategia no llega a nadie.',
    problema: `Toda estrategia digital necesita contenido. El problema es que la mayoría del contenido que circula en internet es malo.

Textos genéricos que podrían hablar de cualquier empresa. Artículos de blog escritos para cumplir una cuota semanal sin tener nada real que decir. Páginas de servicios que repiten las mismas frases que usa la competencia, palabra por palabra.

Ese contenido no posiciona en Google porque no responde preguntas reales. No genera confianza porque no dice nada que importe. Y no convierte porque no le habla a nadie en particular.`,
    solucion: `Creamos contenido con formación periodística de base. Eso significa investigar antes de escribir, estructurar para que se lea y editar hasta que cada párrafo justifique su existencia.

El trabajo incluye artículos de blog optimizados para SEO, textos de páginas web que explican con claridad qué haces y para quién, estrategia editorial alineada con tus objetivos, y revisión y edición de contenido existente que no está funcionando.

Lo que no hacemos: contenido generado automáticamente, artículos de relleno ni textos que podrían pertenecer a cualquier negocio del mundo.`,
    cta: {
      primary: 'Solicita una muestra de contenido',
      whatsappMessage: 'Hola%2C%20me%20interesa%20solicitar%20una%20muestra%20de%20contenido%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    headline: 'Tu lista de contactos es tu activo más valioso. ¿La estás usando?',
    problema: `El email marketing tiene mala reputación por razones equivocadas. La gente no odia recibir correos. Odia recibir correos malos: genéricos, frecuentes sin motivo, sin ningún valor real para quien los recibe.

Muchos negocios tienen una lista de contactos que no usan. La construyeron con el tiempo, la tienen guardada en algún lado y no saben qué hacer con ella. Otros envían campañas ocasionales que no tienen estructura ni propósito.

El resultado es siempre el mismo: un canal con enorme potencial que no está produciendo nada.`,
    solucion: `Gestionamos tu estrategia de email marketing desde la base. Eso puede significar partir de cero o retomar una lista que ya existe pero no está trabajando.

El trabajo incluye auditoría y estrategia, gestión de lista y segmentación (una lista bien segmentada convierte mucho más que una lista enviada toda junta), campañas editoriales escritas para ser leídas, automatizaciones que se activan solas, y métricas que importan: aperturas, clics y conversiones reales.

El email bien hecho es uno de los pocos canales digitales que no depende de un algoritmo para llegar a tu audiencia.`,
    cta: {
      primary: 'Cotiza tu estrategia de email',
      whatsappMessage: 'Hola%2C%20me%20interesa%20cotizar%20una%20estrategia%20de%20email%20marketing%20con%20Agencia%20Chucao.',
      secondary: 'Ver portafolio',
    },
    featured: true,
  },
  {
    id: 'publicidad-en-google-y-meta',
    name: 'Publicidad en Google y Meta',
    headline: 'Pautar sin estrategia es perder dinero de forma ordenada. ¿Sabes qué está pasando con el tuyo?',
    problema: `La publicidad en Google y Meta tiene una promesa tentadora: resultados inmediatos, audiencia precisa y control total del presupuesto. En teoría.

En la práctica, la mayoría de las campañas que llegan a nuestras manos tienen los mismos problemas. Audiencias demasiado amplias que consumen el presupuesto sin convertir. Anuncios escritos sin ningún criterio de copy. Páginas de destino que no tienen nada que ver con el anuncio que trajo al visitante. Y reportes llenos de métricas de vanidad.

Pautar sin estrategia no es neutral. Es perder dinero de forma ordenada.`,
    solucion: `Gestionamos campañas en Google Ads y Meta Ads con foco en resultados reales: leads, contactos y conversiones, no solo impresiones y clics.

El trabajo incluye auditoría de campañas existentes, configuración estratégica (estructura, audiencias, objetivos, conversiones), copy de anuncios escritos para convertir, revisión de páginas de destino y reportes claros explicados en términos de negocio.

Lo que no prometemos: un costo por lead fijo antes de conocer tu negocio. Cualquier agencia que te dé ese número sin hacer preguntas te está mintiendo.`,
    cta: {
      primary: 'Revisa si tus avisos están funcionando',
      whatsappMessage: 'Hola%2C%20me%20interesa%20que%20Agencia%20Chucao%20revise%20el%20rendimiento%20de%20mi%20publicidad%20en%20Google%20o%20Meta.',
      secondary: 'Ver portafolio',
    },
    featured: false,
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export const featuredServices = services.filter((s) => s.featured);
