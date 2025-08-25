'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Code, GitBranch, Wrench, Terminal, Github } from 'lucide-react'

type Step = {
    id: string
    title: string
    description: string
    type: 'instruction' | 'link' | 'code' | 'prompt'
    content: string
    link?: string
}

const templateSteps: Step[] = [
    {
        id: 'login-github',
        title: 'Login to Client GitHub Account',
        description: 'Access the dedicated GitHub account for this client',
        type: 'instruction',
        content: `Log in with the new GitHub account (the one dedicated for the target client)`
    },
    {
        id: 'use-template',
        title: 'Create Repository from Template',
        description: 'Use the template repository to create a new project',
        type: 'link',
        content: `Visit the template repository and click "Use this template"`,
        link: 'https://github.com/pacoguerraq/template-website'
    },
    {
        id: 'add-collaborator',
        title: 'Add Personal Account as Collaborator',
        description: 'Give access to your personal GitHub account',
        type: 'instruction',
        content: `On the new repo go to Settings > Collaborators and add personal GitHub account from local machine so you can clone to local environment`
    },
    {
        id: 'clone-repo',
        title: 'Clone Repository',
        description: 'Clone the repository to your local machine',
        type: 'code',
        content: `git clone [repository-url]
cd [project-name]`
    },
    {
        id: 'install-deps',
        title: 'Install Dependencies',
        description: 'Install all pre-configured packages',
        type: 'code',
        content: `nvm use 22
npm i`
    },
    {
        id: 'create-env',
        title: 'Create Environment File',
        description: 'Set up local development environment',
        type: 'code',
        content: `# Create .env file and add:
NEXT_PUBLIC_HOST=http://localhost:3000`
    },
    {
        id: 'modify-seo',
        title: 'Configure SEO Files',
        description: 'Update robots.ts and sitemap.ts with client information',
        type: 'instruction',
        content: `Modify robots.ts and sitemap.ts with the appropriate information from the client.`
    },
    {
        id: 'create-favicon',
        title: 'Generate Favicon',
        description: 'Create icon.png with ChatGPT',
        type: 'prompt',
        content: `Take this image [attach logo image] and generate an optimized website icon (favicon style). The requirements are:
Aspect ratio: 1:1 (square).
Size: small but optimized (start with 512x512, scalable down to 64x64, 32x32, 16x16).
Content: use the logo or main element in the image.
Placement: center the logo in the square.
Background: keep the same background color/style as the original logo.
Quality: clear, sharp, and optimized for use as a favicon.
Output: PNG format with transparent background if the original had transparency, otherwise keep the original background.

Save as app/icon.png`
    },
    {
        id: 'create-og-image',
        title: 'Generate Open Graph Image',
        description: 'Create opengraph-image for social media previews',
        type: 'prompt',
        content: `Take this image [attach logo/image] and generate an optimized Open Graph image for social media link previews. The requirements are:
Size: 1200 x 630 pixels.
Aspect ratio: 1.91:1 (standard OG format).
Content: use the logo or main element in the image.
Placement: center the logo horizontally and vertically.
Background: keep the same background color/style as the original logo. If transparent, place it on a clean white background.
Quality: sharp, clear, optimized for web and social media previews.
Output: PNG format.

Save as app/opengraph-image.jpg (or png)`
    },
    {
        id: 'develop-ai',
        title: 'Start Development with AI',
        description: 'Use AI tools to build the project',
        type: 'instruction',
        content: `Start using AI (Claude AI and GitHub Copilot) to develop the project and components using the master prompts.`
    },
    {
        id: 'finalize',
        title: 'Finalize Project',
        description: 'Create not-found page and update README',
        type: 'instruction',
        content: `At the end, create (or modify existing) not-found.tsx file with style and format of site. Also modify README.md file.`
    },
    {
        id: 'deploy',
        title: 'Deploy to Vercel',
        description: 'Deploy and configure environment variables',
        type: 'instruction',
        content: `Deploy on Vercel and add .env to environment variables and share preview link with client.`
    }
]

const manualSteps: Step[] = [
    {
        id: 'create-project',
        title: 'Create Next.js Project',
        description: 'Initialize new Next.js project with latest version',
        type: 'code',
        content: `cd Desktop && nvm use 22
npx create-next-app@latest
cd template-website && code .`
    },
    {
        id: 'downgrade-tailwind',
        title: 'Downgrade Tailwind Version',
        description: 'Install specific Tailwind version for compatibility',
        type: 'code',
        content: `npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p`
    },
    {
        id: 'config-tailwind',
        title: 'Configure Tailwind TypeScript',
        description: 'Rename and update Tailwind configuration',
        type: 'code',
        content: `// Rename tailwind.config.js → tailwind.config.ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config`
    },
    {
        id: 'config-postcss',
        title: 'Configure PostCSS',
        description: 'Set up PostCSS configuration',
        type: 'code',
        content: `// postcss.config.js (CommonJS)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
    },
    {
        id: 'config-css',
        title: 'Configure Global CSS',
        description: 'Set up Tailwind CSS directives',
        type: 'code',
        content: `/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    {
        id: 'cleanup',
        title: 'Optional Cleanup',
        description: 'Clean and reinstall dependencies',
        type: 'code',
        content: `rm -rf .next node_modules package-lock.json
npm install`
    },
    {
        id: 'clean-page',
        title: 'Clean Page Content',
        description: 'Remove default content from page.tsx',
        type: 'instruction',
        content: `Remove all content from page.tsx`
    },
    {
        id: 'create-env-manual',
        title: 'Create Environment File',
        description: 'Set up environment variables',
        type: 'code',
        content: `# Create .env file and add:
NEXT_PUBLIC_HOST=http://localhost:3000`
    },
    {
        id: 'config-metadata',
        title: 'Configure SEO Metadata',
        description: 'Add metadata to layout.tsx',
        type: 'code',
        content: `// Add to layout.tsx
export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_HOST ? new URL(process.env.NEXT_PUBLIC_HOST) : undefined,
  title: {
    default: "Pastelería El Postre | Postres de alta calidad",
    template: "%s | Pastelería El Postre",
  },
  description: "Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.",
  openGraph: {
    title: "Pastelería El Postre | Postres de alta calidad",
    description: "Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.",
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "Pastelería El Postre",
  },
};`
    },
    {
        id: 'create-sitemap',
        title: 'Create Sitemap',
        description: 'Add sitemap.ts file',
        type: 'code',
        content: `// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: \`\${process.env.NEXT_PUBLIC_HOST}\`,
            lastModified: new Date(),
        },
        {
            url: \`\${process.env.NEXT_PUBLIC_HOST}/productos/pasteles\`,
            lastModified: new Date(),
        },
        {
            url: \`\${process.env.NEXT_PUBLIC_HOST}/productos/pays\`,
            lastModified: new Date(),
        },
        {
            url: \`\${process.env.NEXT_PUBLIC_HOST}/productos/brownies\`,
            lastModified: new Date(),
        },
    ]
}`
    },
    {
        id: 'create-robots',
        title: 'Create Robots File',
        description: 'Add robots.ts file',
        type: 'code',
        content: `// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/admin/*',
            ],
        },
        sitemap: \`\${process.env.NEXT_PUBLIC_HOST}/sitemap.xml\`,
    };
}`
    },
    {
        id: 'install-libraries',
        title: 'Install Necessary Libraries',
        description: 'Install required packages for the project',
        type: 'code',
        content: `npm install embla-carousel-react framer-motion lucide-react clsx`
    },
    {
        id: 'create-favicon-manual',
        title: 'Generate Favicon',
        description: 'Create icon.png with ChatGPT',
        type: 'prompt',
        content: `Take this image [attach logo image] and generate an optimized website icon (favicon style). The requirements are:
Aspect ratio: 1:1 (square).
Size: small but optimized (start with 512x512, scalable down to 64x64, 32x32, 16x16).
Content: use the logo or main element in the image.
Placement: center the logo in the square.
Background: keep the same background color/style as the original logo.
Quality: clear, sharp, and optimized for use as a favicon.
Output: PNG format with transparent background if the original had transparency, otherwise keep the original background.

Save as app/icon.png`
    },
    {
        id: 'create-og-image-manual',
        title: 'Generate Open Graph Image',
        description: 'Create opengraph-image for social media previews',
        type: 'prompt',
        content: `Take this image [attach logo/image] and generate an optimized Open Graph image for social media link previews. The requirements are:
Size: 1200 x 630 pixels.
Aspect ratio: 1.91:1 (standard OG format).
Content: use the logo or main element in the image.
Placement: center the logo horizontally and vertically.
Background: keep the same background color/style as the original logo. If transparent, place it on a clean white background.
Quality: sharp, clear, optimized for web and social media previews.
Output: PNG format.

Save as app/opengraph-image.jpg (or png)`
    },
    {
        id: 'develop-ai-manual',
        title: 'Start Development with AI',
        description: 'Use AI tools to build the project',
        type: 'instruction',
        content: `Start using AI (Claude AI and GitHub Copilot) to develop the project and components using the master prompts.`
    },
    {
        id: 'finalize-manual',
        title: 'Finalize Project',
        description: 'Create not-found page and update README',
        type: 'instruction',
        content: `At the end, create (or modify existing) not-found.tsx file with style and format of site. Also modify README.md file.`
    },
    {
        id: 'deploy-manual',
        title: 'Deploy to Vercel',
        description: 'Deploy and configure environment variables',
        type: 'instruction',
        content: `Deploy on Vercel and add .env to environment variables and share preview link with client.`
    }
]

export default function ProjectSetupPage() {
    const [activeTab, setActiveTab] = useState('template')
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const copyToClipboard = async (content: string, stepId: string) => {
        try {
            await navigator.clipboard.writeText(content)
            setCopiedId(stepId)
            setTimeout(() => setCopiedId(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const getStepIcon = (type: string) => {
        switch (type) {
            case 'code':
                return Terminal
            case 'link':
                return ExternalLink
            case 'prompt':
                return Code
            default:
                return Wrench
        }
    }

    const getStepColor = (type: string) => {
        switch (type) {
            case 'code':
                return 'bg-green-500'
            case 'link':
                return 'bg-blue-500'
            case 'prompt':
                return 'bg-purple-500'
            default:
                return 'bg-gray-500'
        }
    }

    const currentSteps = activeTab === 'template' ? templateSteps : manualSteps

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Setup</h1>
                    <p className="text-gray-600 mt-1">Step-by-step guide to create new client projects</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <GitBranch className="w-4 h-4" />
                    <span>Next.js 15 + TypeScript + Tailwind</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('template')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'template'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <Github className="w-4 h-4" />
                    <span>Using Template (Recommended)</span>
                </button>
                <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'manual'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <Terminal className="w-4 h-4" />
                    <span>Manual Setup</span>
                </button>
            </div>

            {/* Steps */}
            <div className="space-y-6">
                {currentSteps.map((step, index) => {
                    const StepIcon = getStepIcon(step.type)
                    return (
                        <div key={step.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-lg ${getStepColor(step.type)} flex items-center justify-center`}>
                                            <StepIcon className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                            </div>
                                            {(step.type === 'code' || step.type === 'prompt') && (
                                                <button
                                                    onClick={() => copyToClipboard(step.content, step.id)}
                                                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                                                >
                                                    {copiedId === step.id ? (
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
                                            )}
                                        </div>

                                        {step.type === 'link' && step.link ? (
                                            <div className="mt-4">
                                                <a
                                                    href={step.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <Github className="w-5 h-5 text-blue-600" />
                                                    <span className="text-blue-700 font-medium">Open Template Repository</span>
                                                    <ExternalLink className="w-4 h-4 text-blue-500" />
                                                </a>
                                            </div>
                                        ) : step.type === 'code' || step.type === 'prompt' ? (
                                            <div className="mt-4 bg-gray-900 rounded-lg p-4">
                                                <pre className="text-sm text-gray-100 overflow-x-auto whitespace-pre-wrap font-mono">
                                                    {step.content}
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {step.content}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <GitBranch className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-900 mb-1">Setup Notes</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Always use Node.js v22 for consistency</li>
                            <li>• The template approach is faster and reduces setup errors</li>
                            <li>• Remember to update client-specific information in metadata and SEO files</li>
                            <li>• Test favicon and OG images before deployment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}