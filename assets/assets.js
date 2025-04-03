import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import vercel from './vercel.png';
import docker from './docker.png';
import htmlcss from './htmlcss.png';
import tailwindcss from './tailwindcss.png';
import dynamodb from './dynamodb.png';
import vercelDark from './vercel-dark.png';
import postgres from './postgres.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import nextjs from './nextjs.png';
import nextjsDark from './nextjs-dark.png';
import right_arrow_white from './right-arrow-white.png';
import nodejs from './nodejs.png';
import aws from './aws.png';
import logo from './logo.png';
import react from './react.svg'
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    react,
    vscode,
    firebase,
    aws,
    docker,
    tailwindcss,
    htmlcss,
    dynamodb,
    figma,
    git,
    mongodb,
    postgres,
    nextjs,
    nextjsDark,
    nodejs,
    vercel,
    vercelDark,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark
};

export const infoList = [
    // { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript, TypeScript, Python' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'B.S. Computer Science and Technology Engineering (Aug 2020 - Jun 2024)' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Web applications, e-commerce platforms, and custom systems for businesses, improving efficiency and user experience' }
];

export const serviceData = [
    {
        icon: assets.web_icon,
        title: 'Custom Web Development',
        description: 'I build fast, responsive, and scalable web applications tailored to your business needs, ensuring high performance and seamless user experience.',
        link: ''
    },
    {
        icon: assets.ui_icon,
        title: 'E-Commerce Solutions',
        description: 'Secure and efficient online stores with payment gateways, inventory management, and a great shopping experience.',
        link: ''
    },
    {
        icon: assets.mobile_icon,
        title: 'Custom Business Systems',
        description: 'Creating internal platforms and automation tools to streamline business operations, from order management to AI-powered chatbots.',
        link: ''
    },
    {
        icon: assets.graphics_icon,
        title: 'API Development & Integration',
        description: 'Designing and implementing RESTful APIs and integrating third-party services to enhance your digital ecosystem.',
        link: ''
    },
]

export const workData = [
    {
        title: 'We The People',
        type: 'E-Commerce Website',
        description: 'Built an online store with payment processing and secure authentication.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/wethepeople.png',
        link: "https://www.wethepeoplewear.com.mx/",
    },
    {
        title: 'Pastelería El Postre',
        type: 'E-Commerce Website',
        description: "Rebuilt a bakery's online store with Next.js, improving UX and boosting online orders by 25%.",
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/elpostre.png',
        link: "https://www.elpostre.com.mx/",
    },
    {
        title: 'Galería del Dulce',
        type: "Order Management System",
        description: 'Developed a real-time order processing platform, integrating iPos API for automated inventory updates.',
        techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'iPos API'],
        bgImage: '/galeriadeldulce.png',
        link: "https://galeria-del-dulce.vercel.app/",
    },
    {
        title: 'Cassad',
        type: 'Business Website',
        description: 'Developed a professional website for legal and real estate services, enhancing online presence.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
        bgImage: '/cassad.png',
        link: "https://cassad.vercel.app/",
    },
    {
        title: 'Portfolio Site',
        type: 'Personal Website',
        description: 'Designed and developed my portfolio to showcase my projects, experience, and services.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel', 'Motion', 'Web3Forms'],
        bgImage: '/pacoguerraq.png',
        link: "https://www.pacoguerraq.com/",
    },
    {
        title: 'Order Registration Platform',
        type: 'Custom Business System',
        description: 'Created a system for local businesses to register and print orders efficiently, reducing errors and improving workflow.',
        techStack: ['Vue.js', 'Node.js', 'Express.js', 'Knex.js', 'Objection.js', 'PostgreSQL', 'Bcrypt', 'Celebrate'],
        bgImage: '/work-4.png',
        link: "",
    },
    {
        title: 'Perficient AI Chatbot',
        type: 'AI-Powered Chatbot',
        description: 'Built an AI chatbot integrated with OpenAI API, enabling employees to automate workflows and schedule meetings via Outlook.',
        techStack: ['Angular', 'TypeScript', 'OpenAI API', 'Azure DevOps API', 'Outlook API'],
        bgImage: '/work-1.png',
        link: "",
    },
    {
        title: 'Comisión del Hermano Mayor',
        type: 'Website Re-Design',
        description: "Redesigned and modernized a local fraternity's website with a custom admin panel for easy content management.",
        techStack: ['Django', 'Bootstrap', 'Python', 'Docker', 'PostgreSQL'],
        bgImage: '/work-3.png',
        link: "",
    },

]

export const toolsData = [
    {
        name: 'Visual Studio Code',
        icon: assets.vscode,
        darkIcon: assets.vscode
    },
    {
        name: 'Git Version Control',
        icon: assets.git,
        darkIcon: assets.git
    },
    {
        name: 'HTML & CSS',
        icon: assets.htmlcss,
        darkIcon: assets.htmlcss
    },
    {
        name: 'React',
        icon: assets.react,
        darkIcon: assets.react
    },
    {
        name: 'Next.js',
        icon: assets.nextjs,
        darkIcon: assets.nextjsDark
    },
    {
        name: 'Tailwind CSS',
        icon: assets.tailwindcss,
        darkIcon: assets.tailwindcss
    },
    {
        name: 'Node.js',
        icon: assets.nodejs,
        darkIcon: assets.nodejs
    },
    {
        name: 'PostgreSQL',
        icon: assets.postgres,
        darkIcon: assets.postgres
    },
    {
        name: 'AWS DynamoDB (NoSQL)',
        icon: assets.dynamodb,
        darkIcon: assets.dynamodb
    },
    {
        name: 'Vercel',
        icon: assets.vercel,
        darkIcon: assets.vercel
    },
    {
        name: 'Amazon Web Services',
        icon: assets.aws,
        darkIcon: assets.aws
    }
];