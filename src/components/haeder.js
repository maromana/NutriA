import React from 'react';
import Head from 'next/head'
import GoogleAnalytics from "@/components/analyse";

const CustomHead = () => {
    const siteTitle = 'NutriA | Tecnología Inteligente para la nutrición'

    const description = 'Utilize AI technology to recognize food images and generate calorie statistics, helping you better manage your dietary health.'
    const pageImage = 'https://aicc.gptdevelopment.online/cor.webp';
    const keywords = 'AI, food recognition, calorie counting, calorie statistics， Calorie Calculator， AI Calorie Calculator， Do Calorie Calculator， '


    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={siteTitle}/>
            <meta name="twitter:title" content={siteTitle}/>
            <meta itemProp="name" content={siteTitle}/>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <meta name="keywords" content={keywords}/>
            <meta name="application-name" content={siteTitle}/>
            <meta property="og:description" content={description}/>
            <meta property="og:site_name" content={siteTitle}/>
            <meta property="og:url" content="https://aicc.gptdevelopment.online/"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content={pageImage}/>
            <meta property="og:image:secure_url" content={pageImage}/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content={siteTitle}/>
            <meta name="twitter:site" content="https://aicc.gptdevelopment.online/"/>
            <meta name="twitter:image" content={pageImage}/>
            <meta name="twitter:description" content={description}/>
        </Head>
    )
}


export const Header = () => {
    return (
        <div>
            <CustomHead/>

            <GoogleAnalytics />
            <header className="bg-base-100 shadow-lg">
                <div className="container mx-auto flex justify-between items-center p-5">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <img src="/health.svg" alt="Logo" className="mr-3 h-6 sm:h-9"/>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NutriA</span>
                    </div>

                </div>
            </header>
        </div>
    );
};
