import React from 'react';

const PageHero = ({ title, subtitle, image, icon: Icon }) => {
    return (
        <header className="relative h-[300px] md:h-[350px] bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('${image}')` }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            <div className="relative text-center text-white p-6 max-w-4xl z-10">
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {Icon && <Icon size={48} className="mb-4 text-turmeric opacity-90" />}
                    <h1 className="text-3xl md:text-5xl font-bold font-tamil mb-4 drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-lg md:text-2xl font-tamil drop-shadow-md opacity-90 max-w-2xl">
                        {subtitle}
                    </p>
                    <div className="mt-6 h-1 w-16 bg-turmeric rounded-full shadow-lg"></div>
                </div>
            </div>
        </header>
    );
};

export default PageHero;
