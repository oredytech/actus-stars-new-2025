import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm();
  const {
    toast
  } = useToast();
  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais."
    });
    reset();
  };
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-black/50 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-mdh-gold mb-6 text-center">Contactez-nous</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-200 mb-4">
                Vous avez des questions, des suggestions ou vous souhaitez nous signaler une actualité importante ? N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous répondre dans les plus brefs délais.
              </p>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-mdh-gold mb-4">Nos coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone size={20} className="text-mdh-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold">Téléphone</p>
                      <p className="text-gray-300">+243 818 878 850</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-mdh-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold">Email</p>
                      <p className="text-gray-300">contact@actustars.net</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Home size={20} className="text-mdh-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold">Adresse</p>
                      <p className="text-gray-300">Commune de GOMA référence HOPE CHANNEL TV</p>
                      <p className="text-gray-300">Goma, République Démocratique du Congo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-mdh-gold mb-4">Heures d'ouverture</h2>
                <p className="text-gray-300">Lundi - Vendredi: 8h00 - 18h00</p>
                <p className="text-gray-300">Samedi: 9h00 - 15h00</p>
                <p className="text-gray-300">Dimanche: Fermé</p>
              </div>
            </div>
            
            <div>
              <Card className="bg-black/70 border border-mdh-red/30">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-mdh-gold mb-4">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nom complet</Label>
                      <Input id="name" {...register("name", {
                      required: "Le nom est requis"
                    })} className="bg-gray-800 border-gray-700 text-white" placeholder="Votre nom complet" />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input id="email" type="email" {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })} className="bg-gray-800 border-gray-700 text-white" placeholder="votre@email.com" />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Sujet</Label>
                      <Input id="subject" {...register("subject", {
                      required: "Le sujet est requis"
                    })} className="bg-gray-800 border-gray-700 text-white" placeholder="Sujet de votre message" />
                      {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message</Label>
                      <textarea id="message" {...register("message", {
                      required: "Le message est requis"
                    })} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white h-32" placeholder="Votre message ici..." />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message.message as string}</p>}
                    </div>
                    
                    <Button type="submit" className="bg-mdh-gold hover:bg-mdh-gold/80 text-black w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default ContactPage;