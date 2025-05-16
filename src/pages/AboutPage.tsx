
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, Home } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-black/50 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-mdh-gold mb-6">À propos de Actu Stars</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-200 mb-4">
                Bienvenue sur <span className="text-mdh-gold font-bold">Actu Stars</span>, votre portail d'information de référence en République Démocratique du Congo.
              </p>
              <p className="text-gray-200 mb-4">
                Depuis notre création, nous nous efforçons de fournir une couverture médiatique impartiale et approfondie sur un large éventail de sujets, notamment le sport, la politique, l'économie, le divertissement, et bien plus encore.
              </p>
              <p className="text-gray-200 mb-4">
                Notre équipe de journalistes expérimentés travaille sans relâche pour vous apporter les dernières actualités et analyses, vous permettant de rester informé des événements qui façonnent notre pays et le monde.
              </p>
              <h2 className="text-2xl font-bold text-mdh-gold mt-6 mb-4">Notre mission</h2>
              <p className="text-gray-200 mb-4">
                Notre mission est de fournir une information de qualité, objective et accessible à tous les Congolais, où qu'ils se trouvent. Nous croyons fermement que l'accès à l'information est un droit fondamental et un pilier essentiel de la démocratie.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Notre équipe" 
                className="rounded-lg max-h-80 object-cover shadow-xl" 
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-mdh-gold mt-8 mb-4">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/70 p-4 rounded-md border border-mdh-red/20">
              <h3 className="text-mdh-gold font-bold text-xl mb-2">Intégrité</h3>
              <p className="text-gray-300">Nous nous engageons à maintenir les plus hauts standards d'éthique journalistique, en vérifiant rigoureusement nos sources et en présentant les faits avec honnêteté.</p>
            </div>
            <div className="bg-black/70 p-4 rounded-md border border-mdh-red/20">
              <h3 className="text-mdh-gold font-bold text-xl mb-2">Indépendance</h3>
              <p className="text-gray-300">Notre couverture médiatique reste indépendante de toute influence politique ou commerciale, garantissant une information impartiale.</p>
            </div>
            <div className="bg-black/70 p-4 rounded-md border border-mdh-red/20">
              <h3 className="text-mdh-gold font-bold text-xl mb-2">Innovation</h3>
              <p className="text-gray-300">Nous adoptons les technologies modernes pour vous offrir une expérience d'information optimale sur toutes les plateformes.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-mdh-gold mt-8 mb-4">Notre équipe</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="bg-black/70 p-4 rounded-md text-center border border-mdh-red/20">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src={`https://images.unsplash.com/photo-1${500 + member}?auto=format&fit=crop&w=200&h=200`}
                    alt={`Membre de l'équipe ${member}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-mdh-gold font-bold">Nom du Journaliste {member}</h3>
                <p className="text-gray-400 text-sm">Poste / Spécialité</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
