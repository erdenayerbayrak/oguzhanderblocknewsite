'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleCryptoPayment = (plan: any) => {
    // URL parametrelerini hazırla
    const params = new URLSearchParams({
      plan: plan.name,
      price: plan.price,
      period: plan.period
    });
    
    // Yeni sayfaya yönlendir
    window.location.href = `/crypto-payment?${params.toString()}`;
  };

  const plans = [
    {
      name: "Başlangıç",
      price: "₺299",
      period: "/ay",
      topBg: "bg-white",
      bottomGradient: "from-[#a376b5] to-[#4658aa]",
      features: [
        "Temel eğitim videoları",
        "Haftalık market analizi",
        "Topluluk desteği",
        "Mobil uygulama erişimi",
        "Email desteği"
      ],
      popular: false
    },
    {
      name: "Profesyonel",
      price: "₺599",
      period: "/ay",
      topBg: "bg-white",
      bottomGradient: "from-[#73bfa3] to-[#245e91]",
      features: [
        "Tüm eğitim içerikleri",
        "Günlük market analizi",
        "1-on-1 mentorlik",
        "Canlı trading seansları",
        "Telegram grubu",
        "Sinyal servisi"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "₺999",
      period: "/ay",
      topBg: "bg-white",
      bottomGradient: "from-[#ec9c43] to-[#f44935]",
      features: [
        "Premium içerikler",
        "Kişisel portfolio analizi",
        "Haftalık 1-on-1 görüşme",
        "Özel trading stratejileri",
        "Öncelikli destek",
        "Exclusive webinarlar"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" ref={ref} className="py-20" style={{
      background: 'linear-gradient(135deg, #121152, #38476b, #ffc1ac, #b6192e)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fiyatlandırma
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Size en uygun paketi seçin ve trading yolculuğunuza bugün başlayın
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star size={16} className="mr-1" />
                    Popüler
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                {/* Header */}
                <div className={`${plan.topBg} p-6 text-center`}>
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-black">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className={`p-6 bg-gradient-to-br ${plan.bottomGradient}`}>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="text-green-400 mr-3 mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCryptoPayment(plan)}
                      className="w-full py-3 rounded-xl font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300"
                    >
                      Kripto ile Öde
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;