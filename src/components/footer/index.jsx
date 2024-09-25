import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Sol Kısım: Şirket İsmi */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Deneme</h1>
            <p className="mt-1 text-gray-400">© 2024 React-App. Tüm Hakları Saklıdır.</p>
          </div>

          {/* Orta Kısım: Sosyal Medya İkonları */}
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>

          {/* Sağ Kısım: İletişim Bilgileri */}
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-gray-400">İletişim: info@sirket.com</p>
            <p className="text-gray-400">Adres: Örnek Mah. 123, Şehir, Ülke</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
