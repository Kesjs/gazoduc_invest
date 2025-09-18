import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { 
  FiArrowRight, 
  FiShield, 
  FiDollarSign, 
  FiTrendingUp, 
  FiUsers, 
  FiAward, 
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiLayers,
  FiUserCheck,
  FiHelpCircle,
  FiMail,
  FiPhone,
  FiMapPin,
  FiZap,
  FiGlobe,
  FiDroplet,
  FiTarget
} from 'react-icons/fi';
import Footer from '@/components/Footer';

const testimonials = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Investisseur depuis 2022',
    content: 'Grâce à Gazoduc Invest, j\'ai pu diversifier mon portefeuille avec des actifs dans l\'énergie. Les retours sont réguliers et le service client est réactif.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marie Lambert',
    role: 'Business Angel',
    content: 'En tant qu\'investisseuse expérimentée, je recommande Gazoduc Invest pour leur approche professionnelle et leurs opportunités d\'investissement uniques dans le secteur du GNL.',
    rating: 4
  },
  {
    id: 3,
    name: 'Thomas Martin',
    role: 'Retraité',
    content: 'Je cherchais un investissement sûr avec des rendements intéressants pour compléter ma retraite. Gazoduc Invest a dépassé mes attentes !',
    rating: 5
  }
];

const faqs = [
  {
    question: "Qu'est-ce que le GNL ?",
    answer: "Le Gaz Naturel Liquéfié (GNL) est du gaz naturel refroidi à -161°C pour le transformer en liquide, ce qui permet son transport sur de longues distances par méthaniers."
  },
  {
    question: "Quel est le montant minimum d'investissement ?",
    answer: "Vous pouvez commencer à investir avec seulement 32$. Nous croyons que l'investissement dans l'énergie doit être accessible à tous."
  },
  {
    question: "Comment sont calculés les rendements ?",
    answer: "Les rendements sont calculés quotidiennement en fonction de la performance de nos actifs dans le secteur du GNL et varient selon la formule d'investissement choisie."
  },
  {
    question: "Quelle est la durée d'investissement recommandée ?",
    answer: "Nous recommandons un horizon d'investissement minimum de 6 mois pour profiter pleinement des opportunités à moyen terme du marché du GNL."
  }
];

const partners = [
  { name: 'TotalEnergies', logo: '/partners/total.png' },
  { name: 'Engie', logo: '/partners/engie.png' },
  { name: 'Shell', logo: '/partners/shell.png' },
  { name: 'BP', logo: '/partners/bp.png' },
];

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Gazoduc Invest – Investissez dans le Gaz Naturel Liquéfié</title>
        <meta name="description" content="Gazoduc Invest est une société d'investissement spécialisée dans le Gaz Naturel Liquéfié (GNL). Investissez dès 32$ et bénéficiez de retours quotidiens." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-24 pb-32 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">🚀 Leader en Afrique de l'Ouest</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Investissez dans l'<span className="text-yellow-300">avenir énergétique</span> du Bénin
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              Gazoduc Invest vous ouvre les portes des opportunités d'investissement dans le GNL, 
              une énergie propre et stratégique pour le développement économique de notre région.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button
                onClick={() => router.push('/auth/signup')}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                Démarrer mon investissement <FiArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-5 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-lg"
              >
                Découvrir nos solutions
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Rentabilité jusqu'à 300%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Support 7j/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Sécurité des fonds garantie</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 74.7C120 69 240 59 360 66.7C480 75 600 101 720 101.3C840 101 960 75 1080 69.3C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z" fill="#F9FAFB" fillOpacity="0.9"/>
          </svg>
        </div>
      </header>

      <main>
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '15+', label: 'Pays desservis', icon: <FiGlobe className="w-8 h-8 mx-auto mb-2 text-primary" /> },
                { number: '50M$+', label: 'Actifs sous gestion', icon: <FiDollarSign className="w-8 h-8 mx-auto mb-2 text-primary" /> },
                { number: '10K+', label: 'Investisseurs actifs', icon: <FiUsers className="w-8 h-8 mx-auto mb-2 text-primary" /> },
                { number: '24/7', label: 'Support client', icon: <FiClock className="w-8 h-8 mx-auto mb-2 text-primary" /> }
              ].map((stat, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {stat.icon}
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Gazoduc Invest ?</h2>
              <p className="text-gray-600">Découvrez pourquoi des milliers d'investisseurs nous font confiance pour gérer leurs actifs dans le secteur de l'énergie.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiDollarSign className="w-8 h-8 mb-4" />,
                  title: 'Investissement accessible',
                  description: 'Commencez avec seulement 32$ et bénéficiez de retours sur investissement quotidiens.'
                },
                {
                  icon: <FiTrendingUp className="w-8 h-8 mb-4" />,
                  title: 'Rentabilité élevée',
                  description: 'Jusqu\'à 300% de retour sur investissement sur 10 mois avec nos formules premium.'
                },
                {
                  icon: <FiShield className="w-8 h-8 mb-4" />,
                  title: 'Sécurité garantie',
                  description: 'Vos investissements sont sécurisés et gérés par des professionnels du secteur.'
                },
                {
                  icon: <FiZap className="w-8 h-8 mb-4" />,
                  title: 'Secteur porteur',
                  description: 'Le GNL est une énergie de transition essentielle dans le paysage énergétique mondial.'
                },
                {
                  icon: <FiUserCheck className="w-8 h-8 mb-4" />,
                  title: 'Accompagnement personnalisé',
                  description: 'Un conseiller dédié vous accompagne dans votre stratégie d\'investissement.'
                },
                {
                  icon: <FiBarChart2 className="w-8 h-8 mb-4" />,
                  title: 'Tableau de bord complet',
                  description: 'Suivez en temps réel la performance de vos investissements.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Plans */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Nos formules d'investissement</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Choisissez la formule qui correspond à vos objectifs financiers et commencez à générer des revenus passifs dès aujourd'hui.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Starter',
                  price: '32 $',
                  features: [
                    'Quotidien: 0,48 $',
                    'Hebdomadaire: 2,4 $',
                    'Mensuel: 9,6 $',
                    'Total sur 10 mois: 96 $'
                  ],
                  featured: false
                },
                {
                  name: 'Croissance',
                  price: '75 $',
                  features: [
                    'Quotidien: 1,12 $',
                    'Hebdomadaire: 5,6 $',
                    'Mensuel: 22,5 $',
                    'Total sur 10 mois: 225 $'
                  ],
                  featured: false
                },
                {
                  name: 'Premium',
                  price: '999 $',
                  fee: '+30 $ de frais',
                  features: [
                    'Quotidien: 14,99 $',
                    'Hebdomadaire: 74,95 $',
                    'Mensuel: 299,8 $',
                    'Total sur 10 mois: 2.997 $'
                  ],
                  featured: true
                },
                {
                  name: 'Élite',
                  price: '1999 $',
                  fee: '+30 $ de frais',
                  features: [
                    'Quotidien: 29,99 $',
                    'Hebdomadaire: 149,95 $',
                    'Mensuel: 599,8 $',
                    'Total sur 10 mois: 5.997 $'
                  ],
                  featured: false
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-md overflow-hidden ${
                    plan.featured ? 'ring-2 ring-primary transform md:-translate-y-2' : ''
                  }`}
                >
                  {plan.featured && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                      Le plus populaire
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-center mb-4">
                      {plan.price}
                      {plan.fee && <span className="text-sm font-normal text-gray-500 block">{plan.fee}</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => router.push('/auth/signup')}
                      className={`w-full py-3 px-4 rounded-lg font-medium ${
                        plan.featured
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      Choisir cette offre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral Program */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary-light p-8 rounded-xl text-white">
              <FiUsers className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Programme de parrainage</h2>
              <p className="text-xl mb-6">
                Parrainez vos amis et recevez des récompenses exclusives pour chaque personne que vous invitez.
              </p>
              <button
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center mx-auto gap-2"
              >
                Créer un compte <FiArrowRight className="ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'investisseurs qui font croître leur argent avec Gazoduc Invest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => router.push('/auth/signup')}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                S'inscrire maintenant
              </button>
              <button
                onClick={() => router.push('/auth/signin')}
                className="bg-white border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-gray-600">Démarrez votre parcours d'investissement en 3 étapes simples</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Créez votre compte',
                  description: 'Inscrivez-vous en quelques minutes et complétez votre profil d\'investisseur.'
                },
                {
                  step: '2',
                  title: 'Choisissez votre formule',
                  description: 'Sélectionnez la formule d\'investissement qui correspond à vos objectifs et à votre budget.'
                },
                {
                  step: '3',
                  title: 'Suivez vos performances',
                  description: 'Visualisez en temps réel la croissance de votre investissement sur votre tableau de bord.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
              <p className="text-gray-600">Découvrez ce que disent nos investisseurs à propos de leur expérience avec Gazoduc Invest.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-gray-600">Trouvez les réponses aux questions les plus courantes sur nos services d'investissement.</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos partenaires</h2>
              <p className="text-gray-600">Nous collaborons avec les acteurs majeurs du secteur de l'énergie</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {partners.map((partner, index) => (
                <div key={index} className="h-12 flex items-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                        `<svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="150" height="40" fill="#F3F4F6" rx="4"/>
                          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="10" fill="#6B7280">${partner.name}</text>
                        </svg>`
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 to-primary-dark text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à transformer votre avenir financier ?</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                Rejoignez la communauté d'investisseurs qui façonnent l'avenir énergétique du Bénin et de l'Afrique de l'Ouest.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl text-left">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-400 text-gray-900 p-3 rounded-full">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Contactez-nous</h3>
                      <p className="text-gray-300 text-sm">contact@gazoduc-invest.bj</p>
                      <p className="text-gray-300 text-sm">+229 61 23 45 67</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl text-left">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-400 text-gray-900 p-3 rounded-full">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Notre agence</h3>
                      <p className="text-gray-300 text-sm">Rue 333, Immeuble Le Général</p>
                      <p className="text-gray-300 text-sm">Godomey, Cotonou</p>
                      <p className="text-gray-300 text-sm">Bénin</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => router.push('/auth/signup')}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                >
                  Démarrer maintenant <FiArrowRight className="ml-2" />
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10 font-semibold px-8 py-5 rounded-lg transition-all duration-300 text-lg"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 80L60 74.7C120 69 240 59 360 66.7C480 75 600 101 720 101.3C840 101 960 75 1080 69.3C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z" fill="#F9FAFB" fillOpacity="1"/>
            </svg>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
