'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const CryptoPaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // URL'den plan bilgilerini al
  const planName = searchParams.get('plan') || 'Profesyonel';
  const planPrice = searchParams.get('price') || '₺599';
  const planPeriod = searchParams.get('period') || '/ay';

  // TRC20 USDT adresi
  const trc20Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  
  // QR kod için URL (QR kod servisi kullanarak)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(trc20Address)}`;

  const handlePaymentConfirmation = async () => {
    setIsLoading(true);
    
    try {
      // Ödeme bilgilerini hazırla
      const paymentInfo = {
        plan: planName,
        price: planPrice,
        period: planPeriod,
        address: trc20Address,
        timestamp: new Date().toISOString()
      };
      
      // Telegram bot URL'si - ödeme bilgileriyle birlikte
      const encodedInfo = encodeURIComponent(JSON.stringify(paymentInfo));
      const telegramBotUrl = `https://t.me/trading_oguzhan_bot?start=payment_${encodedInfo}`;
      
      // Yeni sekmede Telegram botunu aç
      window.open(telegramBotUrl, '_blank');
      
      // Ödeme onaylandı olarak işaretle
      setPaymentConfirmed(true);
      
      // 5 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        router.push('/');
      }, 5000);
      
    } catch (error) {
      console.error('Telegram bot bağlantısında hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(trc20Address);
      // Kopyalandı mesajı göster
      const copyButton = document.querySelector('.copy-button');
      if (copyButton) {
        copyButton.textContent = 'Kopyalandı!';
        copyButton.classList.add('text-green-400');
        setTimeout(() => {
          copyButton.textContent = 'Adresi Kopyala';
          copyButton.classList.remove('text-green-400');
        }, 2000);
      }
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      alert('Kopyalama başarısız. Lütfen manuel olarak kopyalayın.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center text-white hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Geri Dön
        </motion.button>

        <div className="max-w-2xl mx-auto">
          {/* Plan Bilgisi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Kripto ile Ödeme
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {planName} Paketi
              </h2>
              <p className="text-3xl font-bold text-blue-300">
                {planPrice} {planPeriod}
              </p>
            </div>
          </motion.div>

          {/* QR Kod ve Adres */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6">
                USDT (TRC20) ile Öde
              </h3>
              
              {/* QR Kod */}
              <div className="mb-6">
                <img
                  src={qrCodeUrl}
                  alt="TRC20 QR Code"
                  className="mx-auto border-4 border-white/20 rounded-xl"
                  width={300}
                  height={300}
                />
              </div>

              {/* Adres */}
              <div className="mb-6">
                <p className="text-white mb-3">Adres:</p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <p className="text-sm font-mono text-gray-300 break-all">
                    {trc20Address}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="copy-button mt-3 text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                >
                  Adresi Kopyala
                </button>
              </div>

              {/* Ödeme Talimatları */}
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-300 mb-2">
                  Ödeme Talimatları:
                </h4>
                <ul className="text-sm text-yellow-200 space-y-1 text-left">
                  <li>• Yukarıdaki QR kodu tarayın veya adresi kopyalayın</li>
                  <li>• USDT (TRC20) ağından ödeme yapın</li>
                  <li>• Ödeme tutarı: {planPrice}</li>
                  <li>• İşlem tamamlandıktan sonra "Ödeme Yaptım" butonuna tıklayın</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Ödeme Yaptım Butonu */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            {!paymentConfirmed ? (
              <button
                onClick={handlePaymentConfirmation}
                disabled={isLoading}
                className={`
                  w-full max-w-md py-4 px-8 rounded-xl font-semibold text-lg
                  transition-all duration-300 transform hover:scale-105
                  ${isLoading 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Yönlendiriliyor...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle size={24} className="mr-3" />
                    Ödeme Yaptım
                  </div>
                )}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle size={48} className="text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-green-300">
                    Ödeme Onaylandı!
                  </h3>
                </div>
                <p className="text-green-200 text-center">
                  Telegram botuna yönlendirildiniz. Hesabınız 24 saat içinde aktif edilecektir.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Güvenlik Notu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              🔒 Tüm işlemler güvenli şekilde gerçekleştirilir. 
              Ödeme sonrası Telegram botumuz üzerinden takip edebilirsiniz.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentPage; 