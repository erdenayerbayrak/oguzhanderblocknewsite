'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ProvenSuccess = () => {
  const [activeTab, setActiveTab] = useState('certificates');
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 12;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const certificates = [
    // Tüm sertifikalar (1-58) - Prop Trading Sertifikası
    { id: 1, title: 'Prop Trading Sertifikası', description: 'Uluslararası Forex Trading', image: '/images/sertifika-1.png' },
    { id: 2, title: 'Prop Trading Sertifikası', description: 'Kripto Para Trading', image: '/images/sertifika-2.png' },
    { id: 3, title: 'Prop Trading Sertifikası', description: 'İleri Seviye Teknik Analiz', image: '/images/sertifika-3.png' },
    { id: 4, title: 'Prop Trading Sertifikası', description: 'Profesyonel Risk Yönetimi', image: '/images/sertifika-4.png' },
    { id: 5, title: 'Prop Trading Sertifikası', description: 'Portfolio Yönetimi Uzmanlığı', image: '/images/sertifika-5.png' },
    { id: 6, title: 'Prop Trading Sertifikası', description: 'Gelişmiş Trading Stratejileri', image: '/images/sertifika-6.png' },
    { id: 7, title: 'Prop Trading Sertifikası', description: 'Piyasa Analizi Uzmanlığı', image: '/images/sertifika-7.png' },
    { id: 8, title: 'Prop Trading Sertifikası', description: 'Futures ve Options Trading', image: '/images/sertifika-8.png' },
    { id: 9, title: 'Prop Trading Sertifikası', description: 'Swing Trading Stratejileri', image: '/images/sertifika-9.png' },
    { id: 10, title: 'Prop Trading Sertifikası', description: 'Günlük Trading Uzmanlığı', image: '/images/sertifika-11.png' },
    { id: 11, title: 'Prop Trading Sertifikası', description: 'Scalping Teknikleri', image: '/images/sertifika12.png' },
    { id: 12, title: 'Prop Trading Sertifikası', description: 'Trading Mentorluk', image: '/images/sertifika13.png' },
    { id: 13, title: 'Prop Trading Sertifikası', description: 'Trading Eğitmenliği', image: '/images/sertifika14.png' },
    { id: 14, title: 'Prop Trading Sertifikası', description: 'Üstün Başarı Ödülü', image: '/images/sertifika15.png' },
    { id: 15, title: 'Prop Trading Sertifikası', description: 'Trading Uzmanlığı', image: '/images/sertifika-1.png' },
    { id: 16, title: 'Prop Trading Sertifikası', description: 'Profesyonel Trading', image: '/images/sertifika-2.png' },
    { id: 17, title: 'Prop Trading Sertifikası', description: 'İleri Seviye Trading', image: '/images/sertifika-3.png' },
    { id: 18, title: 'Prop Trading Sertifikası', description: 'Master Trading', image: '/images/sertifika-4.png' },
    { id: 19, title: 'Prop Trading Sertifikası', description: 'Elite Trading', image: '/images/sertifika-5.png' },
    { id: 20, title: 'Prop Trading Sertifikası', description: 'Premium Trading', image: '/images/sertifika-6.png' },
    { id: 21, title: 'Prop Trading Sertifikası', description: 'Trading Uzmanlığı', image: '/images/sertifika1.png' },
    { id: 22, title: 'Prop Trading Sertifikası', description: 'Forex Mastery', image: '/images/sertifika2.png' },
    { id: 23, title: 'Prop Trading Sertifikası', description: 'Kripto Expert', image: '/images/sertifika3.png' },
    { id: 24, title: 'Prop Trading Sertifikası', description: 'Technical Analysis Pro', image: '/images/sertifika4.png' },
    { id: 25, title: 'Prop Trading Sertifikası', description: 'Risk Management Expert', image: '/images/sertifika5.png' },
    { id: 26, title: 'Prop Trading Sertifikası', description: 'Portfolio Management', image: '/images/sertifika6.png' },
    { id: 27, title: 'Prop Trading Sertifikası', description: 'Advanced Trading', image: '/images/sertifika7.png' },
    { id: 28, title: 'Prop Trading Sertifikası', description: 'Market Analysis Pro', image: '/images/sertifika8.png' },
    { id: 29, title: 'Prop Trading Sertifikası', description: 'Futures Trading Expert', image: '/images/sertifika9.png' },
    { id: 30, title: 'Prop Trading Sertifikası', description: 'Swing Trading Master', image: '/images/sertifika10.png' },
    { id: 31, title: 'Prop Trading Sertifikası', description: 'Day Trading Pro', image: '/images/sertifika11.png' },
    { id: 32, title: 'Prop Trading Sertifikası', description: 'Scalping Expert', image: '/images/sertifika12.png' },
    { id: 33, title: 'Prop Trading Sertifikası', description: 'Mentorship Certified', image: '/images/sertifika13.png' },
    { id: 34, title: 'Prop Trading Sertifikası', description: 'Education Specialist', image: '/images/sertifika14.png' },
    { id: 35, title: 'Prop Trading Sertifikası', description: 'Success Achievement', image: '/images/sertifika15.png' },
    { id: 36, title: 'Prop Trading Sertifikası', description: 'Expert Level Trading', image: '/images/sertifika16.png' },
    { id: 37, title: 'Prop Trading Sertifikası', description: 'Professional Trading', image: '/images/sertifika17.png' },
    { id: 38, title: 'Prop Trading Sertifikası', description: 'Advanced Level Trading', image: '/images/sertifika18.png' },
    { id: 39, title: 'Prop Trading Sertifikası', description: 'Master Level Trading', image: '/images/sertifika19.png' },
    { id: 40, title: 'Prop Trading Sertifikası', description: 'Elite Level Trading', image: '/images/sertifika20.png' },
    { id: 41, title: 'Prop Trading Sertifikası', description: 'Premium Level Trading', image: '/images/sertifika21.png' },
    { id: 42, title: 'Prop Trading Sertifikası', description: 'Ultimate Trading', image: '/images/sertifika22.png' },
    { id: 43, title: 'Prop Trading Sertifikası', description: 'Pro Trading Expert', image: '/images/sertifika23.png' },
    { id: 44, title: 'Prop Trading Sertifikası', description: 'Advanced Pro Trading', image: '/images/sertifika24.png' },
    { id: 45, title: 'Prop Trading Sertifikası', description: 'Master Pro Trading', image: '/images/sertifika25.png' },
    { id: 46, title: 'Prop Trading Sertifikası', description: 'Elite Pro Trading', image: '/images/sertifika26.png' },
    { id: 47, title: 'Prop Trading Sertifikası', description: 'Premium Pro Trading', image: '/images/sertifika27.png' },
    { id: 48, title: 'Prop Trading Sertifikası', description: 'Ultimate Pro Trading', image: '/images/sertifika28.png' },
    { id: 49, title: 'Prop Trading Sertifikası', description: 'Expert Pro Trading', image: '/images/sertifika29.png' },
    { id: 50, title: 'Prop Trading Sertifikası', description: 'Advanced Expert Trading', image: '/images/sertifika30.png' },
    { id: 51, title: 'Prop Trading Sertifikası', description: 'Master Expert Trading', image: '/images/sertifika31.png' },
    { id: 52, title: 'Prop Trading Sertifikası', description: 'Elite Expert Trading', image: '/images/sertifika32.png' },
    { id: 53, title: 'Prop Trading Sertifikası', description: 'Premium Expert Trading', image: '/images/sertifika33.png' },
    { id: 54, title: 'Prop Trading Sertifikası', description: 'Ultimate Expert Trading', image: '/images/sertifika34.png' },
    { id: 55, title: 'Prop Trading Sertifikası', description: 'Pro Expert Trading', image: '/images/sertifika35.png' },
    { id: 56, title: 'Prop Trading Sertifikası', description: 'Advanced Pro Expert', image: '/images/sertifika36.png' },
    { id: 57, title: 'Prop Trading Sertifikası', description: 'Master Pro Expert', image: '/images/sertifika37.png' },
    { id: 58, title: 'Prop Trading Sertifikası', description: 'Elite Pro Expert', image: '/images/sertifika38.png' },
    { id: 59, title: 'Prop Trading Sertifikası', description: 'Ultimate Pro Expert', image: '/images/sertifika-1.png' },
    { id: 60, title: 'Prop Trading Sertifikası', description: 'Final Pro Expert', image: '/images/sertifika-2.png' }
  ];

  const pnlResults = [
    { month: 'Ocak 2024', profit: '+$15,230', percentage: '+23.4%' },
    { month: 'Şubat 2024', profit: '+$18,750', percentage: '+28.1%' },
    { month: 'Mart 2024', profit: '+$12,890', percentage: '+19.2%' },
    { month: 'Nisan 2024', profit: '+$21,650', percentage: '+31.8%' },
    { month: 'Mayıs 2024', profit: '+$16,420', percentage: '+24.6%' },
    { month: 'Haziran 2024', profit: '+$19,980', percentage: '+29.3%' }
  ];

  const statistics = [
    { label: 'Toplam Kar', value: '$125,430', color: 'from-green-400 to-green-600' },
    { label: 'Başarı Oranı', value: '%87.3', color: 'from-blue-400 to-blue-600' },
    { label: 'Toplam İşlem', value: '1,247', color: 'from-purple-400 to-purple-600' },
    { label: 'Ortalama Kar', value: '$2,340', color: 'from-orange-400 to-orange-600' },
    { label: 'En Yüksek Kar', value: '$8,750', color: 'from-red-400 to-red-600' },
    { label: 'Risk Oranı', value: '%2.1', color: 'from-teal-400 to-teal-600' }
  ];

  // Pagination hesaplamaları
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const endIndex = startIndex + certificatesPerPage;
  const currentCertificates = certificates.slice(startIndex, endIndex);

  return (
    <section className="py-20 bg-gradient-to-br from-[#121152] via-[#38476b] to-[#ffc1ac]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Kanıtlanmış <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Başarılar</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Yıllarca süren deneyim ve kanıtlanmış sonuçlarla, ticaret dünyasında güvenilir bir rehber olarak yanınızdayız.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          variants={containerVariants}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          <motion.button
            variants={itemVariants}
            onClick={() => {
              setActiveTab('certificates');
              setCurrentPage(1);
            }}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'certificates' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            Sertifikalar
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab('pnl')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'pnl' 
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            PnL Sonuçları
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab('statistics')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'statistics' 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            İstatistikler
          </motion.button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'certificates' && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {currentCertificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedCertificate(cert);
                      setShowModal(true);
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center hidden">
                        <div className="text-4xl text-blue-400">🏆</div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-sm font-semibold">Görüntüle</div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-1 text-sm">{cert.title}</h3>
                    <p className="text-gray-400 text-xs">{cert.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Önceki
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Sonraki
                </button>
              </div>

              {/* Page Info */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
                  Sayfa {currentPage} / {totalPages} • Toplam {certificates.length} Sertifika
                </p>
              </div>
            </>
          )}

          {activeTab === 'pnl' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pnlResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">{result.month}</h3>
                    <div className="text-2xl">💰</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Kar:</span>
                      <span className="text-green-400 font-bold text-lg">{result.profit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Oran:</span>
                      <span className="text-green-400 font-bold">{result.percentage}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-opacity-100 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-xl font-bold">📊</div>
                  </div>
                  <h3 className="text-gray-300 text-sm mb-2">{stat.label}</h3>
                  <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {showModal && selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {selectedCertificate.title}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Certificate Image */}
            <div className="mb-6">
              <img 
                src={selectedCertificate.image} 
                alt={selectedCertificate.title}
                className="w-full h-auto rounded-lg border border-gray-600"
              />
            </div>

            {/* Certificate Info */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Sertifika Detayları
                </h4>
                <p className="text-gray-300">
                  {selectedCertificate.description}
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Sertifika Özellikleri:</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Uluslararası geçerlilik</li>
                  <li>• Profesyonel standartlar</li>
                  <li>• Sürekli güncelleme</li>
                  <li>• Dijital doğrulama</li>
                </ul>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProvenSuccess;