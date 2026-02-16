import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import PageHero from '../components/PageHero';
import vaanilai from '../assets/weather.png';
import farmer_community from '../assets/farmer_community.png';
import farmer_ecommerce from '../assets/farmer_ecommerce.png';
import farmer_schemes from '../assets/farmer_schemes.png';
import farmer_market from '../assets/market.png';
import farmer_disease from '../assets/farmer_disease.png';
import market_prices from '../assets/market_prices.png';
import { CloudRain, ShoppingCart, Activity, Users, BookOpen, AlertTriangle, Wheat } from 'lucide-react';

const FeatureCard = ({ image, title, color, link }) => (
    <Link to={link} className={`group block bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-green-50 cursor-pointer`}>
        <div className="h-40 overflow-hidden relative">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute bottom-0 left-0 w-full h-1.5 `}></div>
        </div>
        <div className="p-5 text-center">
            <h3 className="text-lg font-bold font-tamil text-earth group-hover:text-paddy transition-colors">{title}</h3>
        </div>
    </Link>
);

const Home = () => {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <AuthModal />

            <PageHero
                title="உழவன் உயர்வான்"
                subtitle="தமிழ் விவசாயத்தின் டிஜிட்டல் புரட்சி"
                image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                icon={Wheat}
            />

            {/* Features Grid */}
            <section className="container mx-auto px-6 py-20 -mt-10 relative z-10">
                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        image={vaanilai}
                        title="வானிலை"
                        color="border-blue-500"
                        link="/weather"
                    />
                    <FeatureCard
                        image={farmer_ecommerce}
                        title="விற்பனை சந்தை"
                        color="border-green-600"
                        link="/ecommerce"
                    />
                    <FeatureCard
                        image={market_prices}
                        title="சந்தை விலை"
                        color="border-yellow-500"
                        link="/market"
                    />
                    <FeatureCard
                        image={farmer_disease}
                        title="நோய் கண்டறிதல்"
                        color="border-red-500"
                        link="/diseases"
                    />
                    <FeatureCard
                        image={farmer_community}
                        title="விவசாயக் குழுக்கள்"
                        color="border-purple-500"
                        link="/community"
                    />
                    <FeatureCard
                        image={farmer_schemes}
                        title="விவசாய திட்டங்கள்"
                        color="border-indigo-500"
                        link="/advisory"
                    />
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-earth text-cream text-center py-6 font-tamil">
                <p>&copy; 2026 தமிழ் விவசாயி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
                <div className="mt-2 text-sm opacity-70">விவசாயிகளின் நண்பன்</div>
            </footer>
        </div>
    );
};

export default Home;
