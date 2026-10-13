import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail } from 'lucide-react';

export default function SupportPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f2f3ff] font-sans flex flex-col">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e2e8f0] shadow-xs">
                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <img src="/favicon.png" alt="Nexus" className="w-8 h-8 rounded-md shadow-sm" />
                    <div className="leading-none">
                        <div className="text-[14px] font-bold text-[#131b2e]">Nexus</div>
                        <div className="text-[9px] font-mono font-medium tracking-widest text-[#707881] uppercase">
                            Enterprise Portal
                        </div>
                    </div>
                </div>

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#006194] hover:text-[#004a72] bg-white border border-[#e2e8f0] hover:border-[#006194] px-3 py-1.5 rounded-md transition-all shadow-xs cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Regresar
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#f2f3ff] text-[#006194] rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-[#006194]/20">
                        AE
                    </div>
                    <h1 className="text-xl font-bold text-[#131b2e] mb-2">Centro de Soporte</h1>
                    <p className="text-[13px] text-[#3f4850] mb-6">
                        Hola, esta web app fue creada por <span className="font-semibold text-[#131b2e]">Andrés Esquivel Breceda</span>.
                    </p>

                    <div className="w-full flex flex-col gap-3 mb-6">
                        <a
                            href="https://www.linkedin.com/in/andres-esquivel-breceda/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#0a66c2] text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#084e96] transition-colors shadow-xs"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/AndresBreceda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#24292e] text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#1b1f23] transition-colors shadow-xs"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                            </svg>
                            GitHub
                        </a>

                        <a
                            href="mailto:a.e.breceda@gmail.com"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#006194] text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#004a72] transition-colors shadow-xs"
                        >
                            <Mail className="w-4 h-4" />
                            Contactar por Correo
                        </a>
                    </div>

                    <div className="text-[11px] text-[#707881] font-mono">
                        Fabrica Nexus Enterprise Portal © 2026
                    </div>
                </div>
            </main>
        </div>
    );
}
