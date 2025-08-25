'use client'

import { useState } from 'react'
import { Copy, Check, FileText, Bot, Zap, ChevronDown, ChevronUp } from 'lucide-react'

const masterPrompts = [
    {
        id: 'chatgpt-content',
        title: 'ChatGPT - Contenido y SEO',
        description: 'Generar textos optimizados, títulos SEO y estructura de contenido',
        icon: Bot,
        color: 'bg-green-500',
        phase: 'Fase 1',
        content: `Actúa como un experto en marketing digital, copywriting y SEO especializado en sitios web para pequeños negocios.

Tu tarea es crear el contenido optimizado para SEO y la estructura de textos de un sitio web profesional basándote en la información del cliente.

INFORMACIÓN DEL NEGOCIO:
[INSERTAR DOCUMENTO CON INFORMACIÓN DEL CLIENTE]

SECCIONES A CREAR:
[INSERTAR LISTA DE SECCIONES ACORDADAS - ej: Hero, Sobre Nosotros, Servicios, Contacto, etc.]

REQUISITOS DE ENTREGA:

Para cada sección, proporciona:
1. Título principal (H1) - SEO optimizado con palabras clave relevantes
2. Subtítulos (H2, H3) - Jerárquicos y descriptivos
3. Textos completos - Persuasivos, claros y orientados a conversión
4. Call-to-actions (CTAs) - Específicos para cada sección
5. Alt text para imágenes - Descriptivo y con keywords
6. Meta título y meta descripción - Para la página principal

Criterios de contenido:
- Textos orientados al público objetivo del negocio
- Lenguaje claro, profesional y cercano
- Keywords naturalmente integradas (no keyword stuffing)
- Enfoque en beneficios más que características
- Llamadas a la acción claras y persuasivas
- Longitud apropiada para web (párrafos cortos, fácil lectura)

SEO básico:
- Incluir palabras clave relevantes al negocio y ubicación
- Estructura de headings lógica (H1 → H2 → H3)
- Meta descripción atractiva y dentro de 150-160 caracteres
- Textos alt descriptivos para imágenes

FORMATO DE ENTREGA:
Organiza toda la información de manera clara, sección por sección, lista para ser copiada y utilizada en el desarrollo.

¿Comenzamos con la creación del contenido?`
    },
    {
        id: 'claude-technical',
        title: 'Claude - Implementación Técnica',
        description: 'Desarrollo de componentes React con Next.js 15, TypeScript y Tailwind',
        icon: FileText,
        color: 'bg-blue-500',
        phase: 'Fase 2',
        content: `Actúa como un desarrollador senior especializado en Next.js 15, TypeScript y Tailwind CSS v3.4.1.

Tu tarea es crear componentes React profesionales, responsivos y optimizados para un sitio web de negocio local.

STACK TÉCNICO:
- Next.js 15 con App Router (/app) - NO usar pages router
- TypeScript
- Tailwind CSS v3.4.1 únicamente
- Componentes modulares en app/components/
- next/image para imágenes
- Diseño mobile-first

LIBRERÍAS DISPONIBLES:
- embla-carousel-react - Para carruseles de imágenes (clientes, testimonios, galería)
- framer-motion - Para animaciones suaves y transiciones
- lucide-react - Set completo de iconos modernos
- clsx - Para manejo de classNames condicionales

CONTENIDO Y ESTRUCTURA:
[INSERTAR AQUÍ EL OUTPUT COMPLETO DE CHATGPT DE LA FASE 1]

INFORMACIÓN DE DISEÑO:
Colores de marca: [INSERTAR PALETA DE COLORES DEL CLIENTE]
Estilo visual: [INSERTAR DESCRIPCIÓN DE ESTILO - ej: moderno, elegante, minimalista]
Imágenes disponibles: [DESCRIBIR QUE IMÁGENES TIENE EL CLIENTE]

REQUISITOS TÉCNICOS:

Estructura de archivos OBLIGATORIA:
- Cada sección como componente en app/components/
- Importar todo en app/page.tsx principal
- Ejemplo: app/components/Hero.tsx, app/components/About.tsx, etc.
- Usar ÚNICAMENTE App Router (estructura /app)

Navegación requerida:
- Navbar fijo/sticky en la parte superior
- Menú móvil: Sidebar dinámico con overlay (NO dropdown simple)
- El sidebar debe deslizarse desde la izquierda/derecha con animación suave
- Cerrar sidebar al hacer clic en overlay o enlaces

Footer obligatorio:
- Footer profesional con información del cliente
- INCLUIR: "Desarrollado por [pacoguerraq](https://pacoguerraq.com)" con hyperlink funcional
- El crédito debe ser discreto pero visible

Responsive design:
- Mobile-first approach obligatorio
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navegación móvil con sidebar animado
- Imágenes y textos que se adapten perfectamente

Uso de librerías:
- Framer Motion: Animaciones de entrada, hover states, transiciones de página
- Lucide React: Todos los iconos (menú hamburguesa, redes sociales, servicios, etc.)
- Embla Carousel: Si hay sección de clientes/testimonios/galería
- clsx: Para estados condicionales (menú activo, hover, etc.)

Optimización:
- Semantic HTML con roles ARIA
- next/image con lazy loading y optimization
- Espaciado generoso y jerarquía visual clara
- Contraste adecuado para accesibilidad (WCAG 2.1)
- Performance optimizado

Interactividad avanzada:
- Hover states suaves con framer-motion
- Scroll suave entre secciones
- Animaciones de entrada cuando elementos entran en viewport
- Estados loading para formularios
- Micro-interacciones en botones y enlaces

ENTREGA:
- Código TypeScript limpio y modular
- Cada componente en archivo separado (app/components/)
- Solo utilidades de Tailwind (no CSS custom)
- Imports organizados en app/page.tsx
- Comentarios donde sea necesario
- Estructura de archivos clara y escalable

ESTRUCTURA DE ARCHIVOS ESPERADA:
app/
├── page.tsx                 // Página principal con todos los imports
├── layout.tsx              // Layout global
├── globals.css             // Estilos globales de Tailwind
└── components/
    ├── Navbar.tsx          // Navegación principal con sidebar
    ├── Hero.tsx            // Sección hero
    ├── About.tsx           // Sobre nosotros
    ├── Services.tsx        // Servicios/productos
    ├── Testimonials.tsx    // Testimonios (con carousel si aplica)
    ├── Contact.tsx         // Contacto
    └── Footer.tsx          // Footer con crédito

Comenzamos con [NOMBRE DE LA PRIMERA SECCIÓN A DESARROLLAR]?`
    },
    {
        id: 'claude-refinement',
        title: 'Claude - Refinamiento y Optimización',
        description: 'Optimizar componentes existentes para performance y accesibilidad',
        icon: Zap,
        color: 'bg-purple-500',
        phase: 'Opcional',
        content: `Como desarrollador experto, necesito que refines y optimices el componente anterior considerando:

ASPECTOS A MEJORAR:
- Performance: ¿Hay optimizaciones adicionales?
- Accesibilidad: ¿Cumple con estándares WCAG?
- Responsividad: ¿Se ve perfecto en todos los tamaños?
- SEO: ¿La estructura HTML es semánticamente correcta?
- UX: ¿La interacción es intuitiva?

CONSIDERACIONES ESPECÍFICAS:
[INSERTAR FEEDBACK ESPECÍFICO O AJUSTES NECESARIOS]

PRUEBAS:
- Verificar en mobile (375px - iPhone SE)
- Verificar en tablet (768px - iPad)
- Verificar en desktop (1200px+)
- Contrastar con herramientas de accesibilidad

Proporciona la versión optimizada del componente.`
    }
]

export default function MasterPromptsPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)

    const copyToClipboard = async (content: string, promptId: string) => {
        try {
            await navigator.clipboard.writeText(content)
            setCopiedId(promptId)
            setTimeout(() => setCopiedId(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const toggleExpanded = (promptId: string) => {
        setExpandedPrompt(expandedPrompt === promptId ? null : promptId)
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Master Prompts</h1>
                    <p className="text-gray-600 mt-1">AI prompts for streamlined website development workflow</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{masterPrompts.length} prompts available</span>
                </div>
            </div>

            {/* Workflow explanation */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-blue-900 mb-3">Workflow Recomendado</h3>
                        <div className="text-sm text-blue-800 space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0 mt-0.5">1</span>
                                <span className="leading-relaxed">Usar prompt de ChatGPT para generar contenido SEO optimizado</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex-shrink-0 mt-0.5">2</span>
                                <span className="leading-relaxed">Copiar resultado y usar prompt de Claude para implementación técnica</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0 mt-0.5">3</span>
                                <span className="leading-relaxed">Usar prompt de refinamiento para optimizaciones específicas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prompts */}
            <div className="space-y-6">
                {masterPrompts.map((prompt) => {
                    const isExpanded = expandedPrompt === prompt.id
                    const IconComponent = prompt.icon

                    return (
                        <div
                            key={prompt.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-4 lg:p-6">
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 mb-4">
                                    <div className="flex items-start space-x-3 lg:space-x-4 flex-1 min-w-0">
                                        <div className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${prompt.color} flex items-center justify-center`}>
                                            <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                                    {prompt.phase}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{prompt.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{prompt.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <button
                                            onClick={() => copyToClipboard(prompt.content, prompt.id)}
                                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                                        >
                                            {copiedId === prompt.id ? (
                                                <>
                                                    <Check className="w-4 h-4 text-green-600" />
                                                    <span className="text-green-600 hidden sm:inline">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Copy</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => toggleExpanded(prompt.id)}
                                            className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors"
                                        >
                                            {isExpanded ? (
                                                <>
                                                    <ChevronUp className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Hide</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="w-4 h-4" />
                                                    <span className="hidden sm:inline">View</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 bg-gray-900 rounded-lg p-3 lg:p-4 border">
                                        <pre className="text-xs lg:text-sm text-gray-100 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                                            {prompt.content}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Usage tips */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 mb-1">Tips de Uso</h4>
                        <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                            <li>• Reemplaza los placeholders [INSERTAR...] con información específica del cliente</li>
                            <li>• Usa el prompt de ChatGPT primero para generar todo el contenido</li>
                            <li>• Copia el resultado completo al prompt de Claude para implementación</li>
                            <li>• El prompt de refinamiento es opcional para optimizaciones específicas</li>
                            <li>• Guarda los resultados de cada fase para referencia futura</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}