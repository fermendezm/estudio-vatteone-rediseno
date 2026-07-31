// Contenido del sitio en un solo lugar: el cliente edita acá, no en los componentes.

export const site = {
  name: 'Estudio Vatteone',
  tagline: 'Servicios Contables',
  foundedYear: 1956,
  description:
    'Estudio contable fundado en 1956 en Asunción. Asesoría impositiva, registros contables, sociedades anónimas, gestiones laborales y municipales, y auditorías.',
  url: 'https://estudiovatteone.com.py',
  phone: '0991 314 836',
  phoneRaw: '595991314836',
  email: 'administracion@estudiovatteone.com.py',
  address: 'General Garay 236, entre Andrade y Mariscal López',
  city: 'Asunción, Paraguay',
  maps: 'https://maps.app.goo.gl/5xZzgojFpJf7ycVj8',
  linkedin: 'https://www.linkedin.com/in/sandra-vatteone-92138944/',
  whatsapp: 'https://wa.me/595991314836',
  whatsappMessage:
    'https://wa.me/595991314836?text=Hola%2C%20quisiera%20consultar%20por%20los%20servicios%20del%20estudio.',
  hours: 'Lunes a viernes, 08:00 – 17:00',
} as const

// Los años se calculan solos: el sitio original decía "65 años" y quedó congelado.
export const yearsOfExperience = new Date().getFullYear() - site.foundedYear

export const nav = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/#contacto' },
] as const

export type Service = {
  id: string
  index: string
  title: string
  short: string
  description: string
  bullets: string[]
}

export const services: Service[] = [
  {
    id: 'asesoria-impositiva',
    index: '01',
    title: 'Asesoría Impositiva y Contable',
    short:
      'Cumplimiento tributario eficiente, con la carga impositiva optimizada dentro de la ley.',
    description:
      'Ofrecemos asesoramiento especializado en materia fiscal, ayudando a las empresas a cumplir con sus obligaciones tributarias de manera eficiente, optimizando su carga impositiva y aprovechando los beneficios fiscales disponibles según la legislación vigente en Paraguay.',
    bullets: [
      'Planificación fiscal anual',
      'Liquidación de IVA, IRE e IRP',
      'Representación ante la DNIT',
    ],
  },
  {
    id: 'registros-contables',
    index: '02',
    title: 'Registros Contables',
    short:
      'Libros al día y reportes claros para que las decisiones se tomen sobre números reales.',
    description:
      'Nos encargamos de llevar los registros contables de manera precisa y actualizada, garantizando la correcta gestión financiera de la empresa y el cumplimiento de todas las normativas fiscales, con informes claros y oportunos para la toma de decisiones.',
    bullets: [
      'Libros de compras y ventas',
      'Estados financieros mensuales',
      'Conciliaciones bancarias',
    ],
  },
  {
    id: 'sociedades-anonimas',
    index: '03',
    title: 'Apertura de Sociedades Anónimas',
    short:
      'Del estatuto a la inscripción en el Registro Público de Comercio, sin idas y vueltas.',
    description:
      'Asistimos en el proceso de constitución de sociedades anónimas, desde la redacción de estatutos hasta la inscripción en el Registro Público de Comercio, asegurando que todo se realice conforme a la legislación paraguaya y con una gestión ágil y profesional.',
    bullets: [
      'Redacción de estatutos sociales',
      'Inscripción en Registro Público',
      'Alta de RUC y timbrado',
    ],
  },
  {
    id: 'gestiones-laborales',
    index: '04',
    title: 'Gestiones Laborales',
    short:
      'Contratos, altas, bajas y cumplimiento del MTESS, con el equipo en regla.',
    description:
      'Gestionamos todos los aspectos relacionados con el ámbito laboral, incluyendo la elaboración de contratos, altas y bajas de empleados, y el cumplimiento de las normativas laborales locales. Aseguramos que tanto empleadores como empleados cumplan con sus derechos y obligaciones.',
    bullets: [
      'Contratos y liquidaciones',
      'Altas y bajas en IPS',
      'Planillas del MTESS',
    ],
  },
  {
    id: 'gestiones-municipales',
    index: '05',
    title: 'Gestiones Municipales',
    short:
      'Patentes, licencias y balances presentados en tiempo ante la municipalidad.',
    description:
      'Realizamos trámites ante las municipalidades para asegurar el cumplimiento de las obligaciones municipales, como la obtención de patentes, licencias comerciales, presentación de balances y pago de patentes.',
    bullets: [
      'Patente comercial e industrial',
      'Licencias y habilitaciones',
      'Presentación de balances',
    ],
  },
  {
    id: 'auditorias',
    index: '06',
    title: 'Auditorías Contables',
    short:
      'Revisión independiente de los estados financieros y de los puntos a mejorar.',
    description:
      'Llevamos a cabo auditorías contables detalladas para revisar la integridad de los estados financieros, identificar posibles áreas de mejora y asegurar que la información presentada sea clara, precisa y cumpla con las normativas contables y fiscales aplicables en Paraguay.',
    bullets: [
      'Auditoría de estados financieros',
      'Control interno y procesos',
      'Informe con hallazgos y plan',
    ],
  },
]

export const pillars = [
  {
    title: 'Confianza',
    body: 'Brindamos un servicio honesto para empresas y particulares.',
  },
  {
    title: 'Responsabilidad',
    body: 'Registro ordenado y al día de sus actividades económicas.',
  },
  {
    title: 'Experiencia',
    body: `${yearsOfExperience} años de trayectoria asesorando en el sector contable.`,
  },
  {
    title: 'Atención Personalizada',
    body: 'Garantizamos un servicio profesional y personalizado.',
  },
] as const

export const clients = [
  { name: 'Lincoln', logo: '/img/lincoln.png' },
  { name: 'Vialtec', logo: '/img/vialtec.png' },
  { name: 'Honey', logo: '/img/honey.png' },
  { name: 'Punto Textil', logo: '/img/puntotextil.png' },
] as const

export const timeline = [
  {
    year: '1956',
    title: 'La fundación',
    body: 'Fernando Vatteone abre el estudio en Asunción con una idea simple: contabilidad hecha con responsabilidad, eficiencia y honestidad.',
  },
  {
    year: '1980s',
    title: 'Crecimiento con la industria',
    body: 'El estudio acompaña a empresas industriales y comerciales paraguayas en su formalización y expansión.',
  },
  {
    year: '2000s',
    title: 'Segunda generación',
    body: 'La conducción pasa a manos de la familia con la misma vara: cercanía con el cliente y registros impecables.',
  },
  {
    year: 'Hoy',
    title: 'Innovación continua',
    body: `${yearsOfExperience} años después, combinamos esa trayectoria con herramientas digitales para responder más rápido y con más claridad.`,
  },
] as const
