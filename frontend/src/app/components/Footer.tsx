import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const links = {
    product: ['Features', 'Pricing', 'API', 'Documentation'],
    company: ['About', 'Blog', 'Careers', 'Contact'],
    legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  };

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NewsAI
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered news summaries for the modern reader.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                <Twitter className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                <Github className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                <Linkedin className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 NewsAI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with <span className="text-purple-400">React</span> and <span className="text-blue-400">Tailwind CSS</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
