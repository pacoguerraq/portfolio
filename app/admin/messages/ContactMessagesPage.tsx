// ContactMessagesPage.tsx
'use client'

import { useState } from 'react'
import { Copy, Check, MessageSquare } from 'lucide-react'

const contactMessages = [
    {
        id: 'initial',
        title: 'Mensaje inicial',
        description: 'Primer contacto con el prospecto',
        content: `Hola [nombre del negocio],
Soy Paco, desarrollador web. Me especializo en crear sitios sencillos pero profesionales para que negocios como el tuyo tengan una presencia formal en internet, con diseño moderno, bajo costo y entrega en pocos días.

Vi que aún no cuentas con una página web, y hoy en día es clave para transmitir confianza, aparecer en Google y atraer más clientes. Yo me encargo de todo el proceso para que sea rápido y sin complicaciones. Mis paquetes son accesibles, de bajo costo, incluyen SEO básico y la posibilidad de facturar.

¿Quieres que te comparta las opciones y veamos cuál se adapta mejor a lo que buscas?`,
        color: 'bg-blue-500'
    },
    {
        id: 'interested',
        title: 'Después de mostrarse interesado',
        description: 'Cuando el prospecto muestra interés en el servicio',
        content: `Perfecto! Los paquetes que ofrezco empiezan desde $6,500 MXN + IVA. Todos incluyen un sitio profesional, responsivo y moderno.
Te comparto un PDF con las opciones para que veas cuál se adapta mejor a tu negocio.`,
        color: 'bg-green-500'
    },
    {
        id: 'quotation',
        title: 'Envío de cotización',
        description: 'Al enviar la cotización formal al cliente',
        content: `Te adjunto la cotización con el paquete que platicamos.
Para iniciar, solo necesito que la revises, me confirmes tu elección firmando el documento y realices el anticipo del 50%. Con eso agendamos el proyecto y comenzamos.`,
        color: 'bg-purple-500'
    },
    {
        id: 'signed',
        title: 'Al firmar cotización',
        description: 'Cuando el cliente firma y paga el anticipo',
        content: `Gracias! Ya recibí el pago y el documento firmado.
Te envío el manual para iniciar. En el vienen instrucciones para iniciar que consisten en crear una cuenta gmail y que me proporciones todo lo que quieres que tenga tu sitio. Yo me encargo de todo lo demás. Con eso puedo arrancar el desarrollo y tener tu página lista muy pronto.`,
        color: 'bg-orange-500'
    },
    {
        id: 'development_complete',
        title: 'Al finalizar el desarrollo',
        description: 'Primera versión del sitio terminada',
        content: `Hola! Ya terminé la primera versión de tu sitio.
Te comparto el enlace de prueba para que lo revises con calma: [link].
Incluye 1 ronda de ajustes generales, así que me puedes mandar tus comentarios y cambios en una sola lista para implementarlos. También aprovecho para preguntarte, vas a requerir dominio? Para irte compartiendo la información de como obtenerlo`,
        color: 'bg-teal-500'
    },
    {
        id: 'domain_purchase',
        title: 'Para la compra de dominio',
        description: 'Instrucciones para adquirir el dominio',
        content: `Te comparto un documento con mi recomendación personal de como obtener un dominio. Si deseas comprarlo posteriormente yo me encargo de configurártelo y dejar tu sitio listo.`,
        color: 'bg-indigo-500'
    },
    {
        id: 'final_delivery',
        title: 'Entrega final, gracias, pedir retro/testimonio',
        description: 'Entrega final del proyecto y solicitud de feedback',
        content: `Tu sitio ya está terminado y publicado.

Muchas gracias por confiar en mí para este proyecto. Te envío los accesos y manual básico de uso/documentación para que tengas control total.

Me ayudaría mucho si pudieras darme tu retroalimentación y, si quedaste satisfecho, un breve testimonio para compartir en mi perfil. Esto me permite seguir creciendo y ayudando a más negocios como el tuyo.

¡Gracias otra vez y mucho éxito con tu nueva página web!`,
        color: 'bg-pink-500'
    }
]

export default function ContactMessagesPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const copyToClipboard = async (content: string, messageId: string) => {
        try {
            await navigator.clipboard.writeText(content)
            setCopiedId(messageId)
            setTimeout(() => setCopiedId(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
                    <p className="text-gray-600 mt-1">Template messages for different stages of client communication</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MessageSquare className="w-4 h-4" />
                    <span>{contactMessages.length} templates available</span>
                </div>
            </div>

            <div className="grid gap-6">
                {contactMessages.map((message) => (
                    <div
                        key={message.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded ${message.color} flex items-center justify-center`}>
                                        <MessageSquare className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
                                        <p className="text-sm text-gray-600">{message.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(message.content, message.id)}
                                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                                >
                                    {copiedId === message.id ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="text-green-600">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans leading-relaxed">
                                    {message.content}
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}