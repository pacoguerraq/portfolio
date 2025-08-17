// assets/assets.ts
import user_image from './media/user-image.png';
import code_icon from './media/code-icon.png';
import code_icon_dark from './media/code-icon-dark.png';
import edu_icon from './media/edu-icon.png';
import edu_icon_dark from './media/edu-icon-dark.png';
import project_icon from './media/project-icon.png';
import project_icon_dark from './media/project-icon-dark.png';
import vscode from './media/vscode.png';
import firebase from './media/firebase.png';
import vercel from './media/vercel.png';
import docker from './media/docker.png';
import htmlcss from './media/htmlcss.png';
import tailwindcss from './media/tailwindcss.png';
import dynamodb from './media/dynamodb.png';
import vercelDark from './media/vercel-dark.png';
import postgres from './media/postgres.png';
import figma from './media/figma.png';
import git from './media/git.png';
import mongodb from './media/mongodb.png';
import nextjs from './media/nextjs.png';
import nextjsDark from './media/nextjs-dark.png';
import right_arrow_white from './media/right-arrow-white.png';
import nodejs from './media/nodejs.png';
import aws from './media/aws.png';
import logo from './media/logo.png';
import react from './media/react.svg'
import logo_dark from './media/logo_dark.png';
import mail_icon from './media/mail_icon.png';
import mail_icon_dark from './media/mail_icon_dark.png';
import profile_img from './media/profile-img.png';
import download_icon from './media/download-icon.png';
import hand_icon from './media/hand-icon.png';
import header_bg_color from './media/header-bg-color.png';
import moon_icon from './media/moon_icon.png';
import sun_icon from './media/sun_icon.png';
import arrow_icon from './media/arrow-icon.png';
import arrow_icon_dark from './media/arrow-icon-dark.png';
import menu_black from './media/menu-black.png';
import menu_white from './media/menu-white.png';
import close_black from './media/close-black.png';
import close_white from './media/close-white.png';
import web_icon from './media/web-icon.png';
import mobile_icon from './media/mobile-icon.png';
import ui_icon from './media/ui-icon.png';
import graphics_icon from './media/graphics-icon.png';
import right_arrow from './media/right-arrow.png';
import send_icon from './media/send-icon.png';
import right_arrow_bold from './media/right-arrow-bold.png';
import right_arrow_bold_dark from './media/right-arrow-bold-dark.png';
import claude from './media/claude.png';
import github from './media/github.png';
import { StaticImageData } from 'next/image';

interface Assets {
    user_image: StaticImageData;
    code_icon: StaticImageData;
    code_icon_dark: StaticImageData;
    edu_icon: StaticImageData;
    edu_icon_dark: StaticImageData;
    project_icon: StaticImageData;
    project_icon_dark: StaticImageData;
    react: string;
    vscode: StaticImageData;
    firebase: StaticImageData;
    aws: StaticImageData;
    docker: StaticImageData;
    tailwindcss: StaticImageData;
    htmlcss: StaticImageData;
    dynamodb: StaticImageData;
    figma: StaticImageData;
    git: StaticImageData;
    mongodb: StaticImageData;
    postgres: StaticImageData;
    nextjs: StaticImageData;
    nextjsDark: StaticImageData;
    nodejs: StaticImageData;
    vercel: StaticImageData;
    vercelDark: StaticImageData;
    right_arrow_white: StaticImageData;
    logo: StaticImageData;
    logo_dark: StaticImageData;
    mail_icon: StaticImageData;
    mail_icon_dark: StaticImageData;
    profile_img: StaticImageData;
    download_icon: StaticImageData;
    hand_icon: StaticImageData;
    header_bg_color: StaticImageData;
    moon_icon: StaticImageData;
    sun_icon: StaticImageData;
    arrow_icon: StaticImageData;
    arrow_icon_dark: StaticImageData;
    menu_black: StaticImageData;
    menu_white: StaticImageData;
    close_black: StaticImageData;
    close_white: StaticImageData;
    web_icon: StaticImageData;
    mobile_icon: StaticImageData;
    ui_icon: StaticImageData;
    graphics_icon: StaticImageData;
    right_arrow: StaticImageData;
    send_icon: StaticImageData;
    right_arrow_bold: StaticImageData;
    right_arrow_bold_dark: StaticImageData;
    claude: StaticImageData;
    github: StaticImageData;
}

export const assets: Assets = {
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
    right_arrow_bold_dark,
    claude,
    github
};

interface InfoItem {
    icon: StaticImageData;
    iconDark: StaticImageData;
    title: string;
    description: string;
}

export const infoList: InfoItem[] = [
    {
        icon: assets.edu_icon,
        iconDark: assets.edu_icon_dark,
        title: 'Education',
        description: 'B.S. Computer Science and Technology Engineering (Aug 2020 - Jun 2024)'
    },
    {
        icon: assets.project_icon,
        iconDark: assets.project_icon_dark,
        title: 'Projects',
        description: 'Web applications, e-commerce platforms, and custom systems for businesses, improving efficiency and user experience'
    }
];

interface ServiceItem {
    icon: StaticImageData;
    title: string;
    description: string;
    link: string;
}

export const serviceData: ServiceItem[] = [
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
        description: 'Creating internal platforms and automation tools to streamline business operations, from order management to inventory tracking.',
        link: ''
    },
    {
        icon: assets.graphics_icon,
        title: 'API Development & Integration',
        description: 'Designing and implementing RESTful APIs and integrating third-party services to enhance your digital ecosystem.',
        link: ''
    },
]

interface WorkItem {
    title: string;
    type: string;
    category: 'static-website' | 'custom-platform';
    inProgress?: boolean;
    description: string;
    techStack: string[];
    bgImage: string;
    link: string;
}

export const workData: WorkItem[] = [
    {
        title: 'Fyradrive',
        type: 'Vehicle Seller Platform',
        category: 'custom-platform',
        description: 'A platform for buying and selling vehicles, featuring advanced search filters, admin dashboard, and statistics.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Motion'],
        bgImage: '/fyradrive.png',
        link: "https://fyradrive-three.vercel.app/",
    },
    {
        title: 'Vía Propósito',
        type: 'Custom Website',
        category: 'custom-platform',
        inProgress: false,
        description: 'A platform to discover your personal profile and strengths through a quick, personalized self-assessment test with instant results.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'Next-Auth', 'Nodemailer'],
        bgImage: '/viaproposito.png',
        link: "https://viaproposito.vercel.app/"
    },
    {
        title: 'Portfolio Site',
        type: 'Personal Website',
        category: 'static-website',
        description: 'Designed and developed my portfolio to showcase my projects, experience, and services.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel', 'Motion', 'Web3Forms'],
        bgImage: '/pacoguerraq.png',
        link: "https://www.pacoguerraq.com/",
    },
    {
        title: 'We The People',
        type: 'E-Commerce Website',
        category: 'custom-platform',
        description: 'Built an online store with payment processing and secure authentication.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/wethepeople.png',
        link: "https://www.wethepeoplewear.com.mx/",
    },
    {
        title: 'Pastelería El Postre',
        type: 'E-Commerce Website',
        category: 'custom-platform',
        description: "Rebuilt a bakery's online store with Next.js, improving UX and boosting online orders by 25%.",
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/elpostre.png',
        link: "https://www.elpostre.com.mx/",
    },
    {
        title: 'Galería del Dulce',
        type: "Order Management System",
        category: 'custom-platform',
        description: 'Developed a real-time order processing platform, integrating iPos API for automated inventory updates.',
        techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'iPos API'],
        bgImage: '/galeriadeldulce.png',
        link: "https://galeria-del-dulce.vercel.app/",
    },
    {
        title: 'Cassad',
        type: 'Custom Website',
        category: 'static-website',
        description: 'Developed a professional website for legal and real estate services, enhancing online presence.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
        bgImage: '/cassad.png',
        link: "https://cassad.vercel.app/",
    },
    {
        title: 'ConTagg',
        type: 'NFC Devices Platform',
        category: 'custom-platform',
        inProgress: true,
        description: 'A platform to manage NFC devices for sharing personal, medical, or pet info securely—includes device activation, profile management, and scan analytics.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/contagg.png',
        link: "https://contagg.vercel.app/",
    },
    {
        title: 'STARTS',
        type: 'Business Innovation Platform',
        category: 'custom-platform',
        inProgress: true,
        description: 'Collaborative innovation platform that transforms employee ideas into business solutions using gamification, structured evaluation, and actionable analytics.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'AWS Cognito', 'AWS RDS Postgres', 'AWS S3', 'AWS Lambda', 'AWS API Gateway'],
        bgImage: '/starts.png',
        link: "https://starts-nu.vercel.app/"
    },
    {
        title: 'Unlid',
        type: 'Real Estate Platform',
        category: 'custom-platform',
        inProgress: true,
        description: 'A platform for posting and requesting real estate properties, featuring user authentication, property management, and advanced search capabilities.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'Stripe', 'Next-Auth', 'Nodemailer'],
        bgImage: '/unlid.png',
        link: "https://www.unlid.com.mx/"
    },
    // {
    //     title: 'Order Registration Platform',
    //     type: 'Custom Business System',
    //     category: 'custom-platform',
    //     description: 'Created a system for local businesses to register and print orders efficiently, reducing errors and improving workflow.',
    //     techStack: ['Vue.js', 'Node.js', 'Express.js', 'Knex.js', 'Objection.js', 'PostgreSQL', 'Bcrypt', 'Celebrate'],
    //     bgImage: '/work-4.png',
    //     link: "",
    // },
]

interface ToolItem {
    name: string;
    icon: StaticImageData | string;
    darkIcon: StaticImageData | string;
}

export const toolsData: ToolItem[] = [
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
        name: 'GitHub',
        icon: assets.github,
        darkIcon: assets.github
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
        name: 'Vercel',
        icon: assets.vercel,
        darkIcon: assets.vercel
    },
    {
        name: 'Amazon Web Services',
        icon: assets.aws,
        darkIcon: assets.aws
    },
    {
        name: 'PostgreSQL',
        icon: assets.postgres,
        darkIcon: assets.postgres
    },
    // {
    //     name: 'AWS DynamoDB (NoSQL)',
    //     icon: assets.dynamodb,
    //     darkIcon: assets.dynamodb
    // },
    {
        name: 'Claude AI',
        icon: assets.claude,
        darkIcon: assets.claude
    }
];