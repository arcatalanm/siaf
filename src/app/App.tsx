import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import imgHero from "@/imports/SiafPortalDeInicioYAccesoRestaurado/43e866de2b36e1b9b27520aaf6c724923f0a25bd.png";
import imgVehicleRef from "@/imports/SiafRegistroDeVehiculo/5848b8826c1793e8eaf819d4a4dd3dfd56140e91.png";
import imgQR from "@/imports/SiafComprobanteDeTransito/dc1ad0f755ca3eca21b0af38312a1e0de0180ae9.png";
import imgBorderCrossing from "@/imports/SiafGrupoYMenores/6577eec21c4b5c00fe1d7170e68b50ecc220aa86.png";
import imgOfficerAvatar from "@/imports/SiafPanelDeControlOperativo/5bb23819c5c83e53fc72fbc6173f5ddcbe57baed.png";
import imgVehiclePhoto from "@/imports/SiafInspeccionYVerificacionIntegrada/04009ff459091a8d224b1100cc78c1c2826c4a71.png";
import imgOfficerPDI from "@/imports/SiafInspeccionYVerificacionIntegrada/f4d09cda23e7e84eeb03936ceb6a75f76da2255a.png";

// ─── Types ───────────────────────────────────────────────────────
type View =
  | "login"
  | "clave-unica"
  | "recuperar"
  | "registro-usuario"
  | "dashboard"
  | "vehiculo"
  | "grupo"
  | "comprobante"
  | "panel"
  | "inspeccion"
  | "auditoria"
  | "declaracion-sag"
  | "registro-mascotas"
  | "declaracion-mercancias"
  | "usuarios"
  | "reportes";

type UserType = "ciudadano" | "funcionario";

interface VehicleData {
  patente: string; pais: string; marca: string;
  modelo: string; anio: string; vin: string;
}
interface Minor { id: string; nombre: string; rut: string; edad: string; }

// ─── Shared UI ───────────────────────────────────────────────────
function SiafLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 10v6c0 7.18 5.14 13.9 12 15.5C22.86 29.9 28 23.18 28 16v-6L16 4z"
          stroke={dark ? "#031636" : "white"} strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <path d="M11 16l3.5 3.5L21 12" stroke={dark ? "#031636" : "white"}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-black text-xl tracking-tight ${dark ? "text-[#031636]" : "text-white"}`}>SIAF</span>
    </div>
  );
}

function Badge({ color, label }: { color: "green" | "red" | "blue" | "gray" | "orange"; label: string }) {
  const styles = {
    green: "bg-[#dcfce7] text-[#166534]", red: "bg-[#ffdad6] text-[#93000a]",
    blue: "bg-[#d8e3fa] text-[#5a6578]", gray: "bg-[#e4e1e5] text-[#44474e]",
    orange: "bg-[#fef3c7] text-[#92400e]",
  };
  return <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${styles[color]}`}>{label}</span>;
}

function RiskBars({ level }: { level: 1 | 2 | 3 }) {
  const colors = level === 3 ? ["#ba1a1a","#ba1a1a","#ba1a1a"]
    : level === 2 ? ["#fb923c","#fb923c","#e4e1e5"]
    : ["#4ade80","#4ade80","#4ade80"];
  return (
    <div className="flex gap-0.5 items-center">
      {colors.map((c, i) => <div key={i} style={{ background: c }} className="w-3.5 h-1.5 rounded-[2px]" />)}
    </div>
  );
}

// Shared officer navigation bar
function OfficerHeader({
  active, onNavigate, onLogout,
}: {
  active: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}) {
  return (
    <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center justify-between px-10 z-20 shrink-0 sticky top-0">
      <div className="flex items-center gap-8">
        <span className="font-black text-xl text-black tracking-tight">SIAF</span>
        <nav className="flex items-center gap-1">
          {[
            { key: "panel",     label: "Panel Control",    onClick: () => onNavigate("panel") },
            { key: "usuarios",  label: "Gestión Usuarios", onClick: () => onNavigate("usuarios") },
            { key: "reportes",  label: "Reportes",         onClick: () => onNavigate("reportes") },
            { key: "auditoria", label: "Auditoría / Logs",  onClick: () => onNavigate("auditoria") },
          ].map(item => (
            <button key={item.key} onClick={item.onClick}
              className={`px-4 py-2 text-sm font-semibold transition-colors
                ${active === item.key
                  ? "text-black font-bold border-b-2 border-black rounded-none"
                  : "text-[#44474e] hover:bg-gray-100 rounded-lg"}`}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 20a2 2 0 002-2H6a2 2 0 002 2zm6-6V9c0-3.07-1.64-5.64-4.5-6.32V2a1.5 1.5 0 10-3 0v.68C3.63 3.36 2 5.92 2 9v5l-2 2v1h16v-1l-2-2z" fill="#44474E" />
          </svg>
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>
        <div className="w-px h-8 bg-[#c5c6cf]" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-sm text-[#1b1b1e]">Oficial R. Méndez</p>
            <p className="text-[#44474e] text-xs font-bold uppercase tracking-[0.5px]">CONTROL FRONTERIZO</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cf]">
            <img src={imgOfficerAvatar} alt="Officer" className="w-full h-full object-cover" />
          </div>
          <button onClick={onLogout} title="Cerrar sesión"
            className="text-[#44474e] hover:text-black transition-colors ml-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 16H3a1 1 0 01-1-1V3a1 1 0 011-1h4M12 13l4-4-4-4M16 9H7"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────
function LoginScreen({
  onLogin, onForgotPassword, onRegister, onClaveUnica,
}: {
  onLogin: (type: UserType, rut: string) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  onClaveUnica: () => void;
}) {
  const [rut, setRut] = useState("");
  const [pwd, setPwd] = useState("");
  const [instMode, setInstMode] = useState(false);
  const [instRut, setInstRut] = useState("");
  const [instPwd, setInstPwd] = useState("");
  const [activeModal, setActiveModal] = useState<"tramites" | "pasos" | "ayuda" | null>(null);

  function handleCitizenSubmit() {
    if (!rut.trim() || !pwd.trim()) { toast.error("Ingrese RUT y contraseña"); return; }
    toast.success("Autenticando...");
    setTimeout(() => onLogin("ciudadano", rut), 900);
  }

  function handleOfficerSubmit() {
    if (!instRut.trim() || !instPwd.trim()) { toast.error("Ingrese sus credenciales institucionales"); return; }
    toast.success("Verificando credenciales institucionales...");
    setTimeout(() => onLogin("funcionario", instRut), 900);
  }

  return (
    <div className="relative min-h-screen w-full" style={{ fontFamily: "Inter,sans-serif", background: "#fbf8fc" }}>
      <Toaster richColors />
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <SiafLogo />
        <nav className="flex items-center gap-6">
          <button onClick={() => setActiveModal("tramites")} className="text-sm text-white font-medium hover:opacity-80">Trámites</button>
          <button onClick={() => setActiveModal("pasos")} className="text-sm text-white font-medium hover:opacity-80">Pasos Fronterizos</button>
          <button onClick={() => setActiveModal("ayuda")} className="text-sm text-white font-medium hover:opacity-80">Ayuda</button>
          <button onClick={() => {
            const el = document.getElementById("acceso-sistema");
            el?.scrollIntoView({ behavior: "smooth" });
          }} className="border border-white text-white text-sm font-medium px-5 py-1.5 rounded-md hover:bg-white/10">Ingresar</button>
        </nav>
      </header>

      <div className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgHero} alt="" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-[#031636]/85" />
        </div>
        <div className="relative z-10 text-center pt-28 pb-52 px-4">
          <p className="text-white/80 text-xs font-bold tracking-[1.2px] uppercase mb-4">SERVICIO NACIONAL DE ADUANAS — CHILE</p>
          <h1 className="text-white text-5xl font-extrabold leading-tight mb-4">Sistema Integral de Aduanas<br />y Fronteras</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">La plataforma digital unificada para la gestión rápida y segura de tránsitos vehiculares y control de fronteras.</p>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 -mt-48 pb-32 grid grid-cols-7 gap-8">
        {/* Left — citizen */}
        <div id="acceso-sistema" className="col-span-7 md:col-span-4 bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-[#031636] text-2xl font-bold mb-1">Acceso al Sistema</h2>
          <p className="text-gray-500 text-sm mb-8">Elija su método de autenticación preferido.</p>

          {/* ClaveÚnica button */}
          <button onClick={onClaveUnica}
            className="w-full bg-[#0056b2] text-white rounded-lg p-4 flex items-center justify-between mb-8 hover:bg-[#004494] transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.5a2 2 0 110 4 2 2 0 010-4zm0 8c-2.33 0-7 1.17-7 3.5V18h14v-1c0-2.33-4.67-3.5-7-3.5z" fill="white" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white/70 text-xs font-bold uppercase tracking-wider">INGRESAR CON</p>
                <p className="text-white text-lg font-bold">ClaveÚnica</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">O MEDIANTE</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">RUT</label>
              <input value={rut} onChange={e => setRut(e.target.value)} placeholder="12.345.678-9"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">CONTRASEÑA</label>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <button onClick={onForgotPassword} className="text-xs font-bold text-[#031636] hover:underline">
                ¿Olvidó su contraseña?
              </button>
              <button onClick={handleCitizenSubmit}
                className="bg-[#031636] text-white text-sm font-bold px-8 py-2.5 rounded-lg hover:bg-[#0a2a5e] transition-colors">
                Iniciar Sesión
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-8 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              ¿No tiene cuenta?{" "}
              <button onClick={onRegister} className="font-bold text-[#031636] hover:underline">Registrarse</button>
            </p>
            <span className="text-xs text-gray-400">RF-09 / RF-01</span>
          </div>
        </div>

        {/* Right — institutional */}
        <div className="col-span-7 md:col-span-3 bg-[#0f172a] rounded-xl p-8 flex flex-col">
          <h3 className="text-white text-xl font-bold mb-2">Acceso Institucional</h3>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">Funcionarios del Servicio Nacional de Aduanas y entidades vinculadas.</p>

          {!instMode ? (
            <button onClick={() => setInstMode(true)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-6 flex items-center justify-between hover:bg-white/20 transition-colors mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 rounded-lg p-2.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L3 5v5c0 4.41 2.99 8.54 7 9.5 4.01-.96 7-5.09 7-9.5V5l-7-3z"
                      stroke="white" strokeWidth="1.67" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base">Soy Funcionario</p>
                  <p className="text-white/50 text-xs">Acceso a panel de control y auditoría</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.4">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-[0.5px]">RUT Institucional</label>
                <input value={instRut} onChange={e => setInstRut(e.target.value)} placeholder="12.345.678-9"
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-[0.5px]">Contraseña Institucional</label>
                <input type="password" value={instPwd} onChange={e => setInstPwd(e.target.value)} placeholder="••••••••"
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleOfficerSubmit}
                  className="flex-1 bg-white text-[#0f172a] font-bold py-2.5 rounded-lg text-sm hover:bg-white/90 transition-colors">
                  Ingresar al Panel
                </button>
                <button onClick={() => setInstMode(false)} className="px-4 border border-white/30 text-white/70 rounded-lg text-sm hover:bg-white/10">✕</button>
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="6" width="12" height="8" rx="1.5" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
                <path d="M4 6V4.5a3 3 0 016 0V6" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Encriptación AES-256 de extremo a extremo
            </div>
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L1.5 3.5v4C1.5 10.63 3.99 13.5 7 14c3.01-.5 5.5-3.37 5.5-6.5v-4L7 1z"
                  stroke="white" strokeOpacity="0.5" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Cumple Ley 19.628 de Protección de Datos
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#031636] py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-2">
            <SiafLogo />
            <p className="text-white/60 text-sm mt-4 leading-relaxed">Sistema oficial del Gobierno de Chile para la facilitación del comercio y el tránsito fronterizo.</p>
          </div>
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">INSTITUCIONAL</p>
            {["Aduanas de Chile","Ministerio de Hacienda","Transparencia"].map(l => (
              <p key={l} className="text-white/80 text-sm mb-3 hover:text-white cursor-pointer">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">SOPORTE</p>
            {["Mesa de Ayuda: 600 570 7040","Preguntas Frecuentes","Términos de Uso"].map(l => (
              <p key={l} className="text-white/80 text-sm mb-3 hover:text-white cursor-pointer">{l}</p>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-white/10 mt-8 pt-8">
          <p className="text-white/30 text-xs text-center tracking-widest uppercase">© 2024 SERVICIO NACIONAL DE ADUANAS — GOBIERNO DE CHILE</p>
        </div>
      </footer>

      {/* --- MODAL TRÁMITES --- */}
      {activeModal === "tramites" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl relative border border-gray-100">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">✕</button>
            <h3 className="text-2xl font-bold text-[#031636] mb-4 flex items-center gap-2">
              <span>📋</span> Trámites Habilitados en SIAF
            </h3>
            <p className="text-[#44474e] text-sm mb-6 leading-relaxed">
              SIAF permite realizar los siguientes trámites de control fronterizo y aduanero de manera 100% digital anticipada:
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-xl">🚗</div>
                <div>
                  <h4 className="font-bold text-sm text-black">Registro y Salida Temporal de Vehículos (RF-02)</h4>
                  <p className="text-xs text-[#6b7280] mt-0.5">Permiso de salida temporal para vehículos con patente nacional.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xl">🌿</div>
                <div>
                  <h4 className="font-bold text-sm text-black">Declaración Jurada Conjunta SAG-Aduanas (RF-04)</h4>
                  <p className="text-xs text-[#6b7280] mt-0.5">Declaración obligatoria de productos biológicos, vegetales o derivados animales.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xl">🐾</div>
                <div>
                  <h4 className="font-bold text-sm text-black">Registro Sanitario de Mascotas</h4>
                  <p className="text-xs text-[#6b7280] mt-0.5">Validación de certificados zoosanitarios y microchips para perros, gatos u otros animales domésticos.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xl">📦</div>
                <div>
                  <h4 className="font-bold text-sm text-black">Declaración de Mercancías y Equipaje (RF-05)</h4>
                  <p className="text-xs text-[#6b7280] mt-0.5">Declaración de aranceles para bienes y equipajes que exceden la franquicia de USD 500.</p>
                </div>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full bg-[#031636] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0c2a5e] transition-colors mt-8">
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL PASOS FRONTERIZOS --- */}
      {activeModal === "pasos" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl relative border border-gray-100">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">✕</button>
            <h3 className="text-2xl font-bold text-[#031636] mb-2 flex items-center gap-2">
              <span>🏔️</span> Estado de Pasos Fronterizos
            </h3>
            <p className="text-[#6b7280] text-sm mb-6">Información actualizada de congestión y tiempos de espera promedio.</p>
            <div className="space-y-4">
              {[
                { nombre: "Los Libertadores (Cristo Redentor)", estado: "Operativo", espera: "18 min", carga: 72 },
                { nombre: "Cardenal Samoré", estado: "Operativo", espera: "8 min", carga: 35 },
                { nombre: "Paso Pehuenche", estado: "Operativo", espera: "5 min", carga: 20 },
                { nombre: "Paso Colchane (Pisiga)", estado: "Alta demanda", espera: "45 min", carga: 90 },
              ].map(paso => (
                <div key={paso.nombre} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-black">{paso.nombre}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${paso.estado === "Operativo" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                      {paso.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${paso.carga > 80 ? "bg-red-500" : paso.carga > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${paso.carga}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 shrink-0 font-semibold">~{paso.espera}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full bg-[#031636] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0c2a5e] transition-colors mt-6">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL AYUDA --- */}
      {activeModal === "ayuda" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative border border-gray-100">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">✕</button>
            <h3 className="text-2xl font-bold text-[#031636] mb-4 flex items-center gap-2">
              <span>💡</span> Centro de Ayuda SIAF
            </h3>
            <div className="space-y-4 text-sm text-[#44474e] leading-relaxed">
              <div>
                <h4 className="font-bold text-black text-sm">¿Cómo ingreso al sistema?</h4>
                <p className="text-xs text-[#6b7280] mt-1">Puede ingresar de forma segura usando su <strong>ClaveÚnica</strong> del Registro Civil, o bien mediante su RUT y contraseña registrada.</p>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">¿Qué es el código QR generado?</h4>
                <p className="text-xs text-[#6b7280] mt-1">Es el comprobante digital con firma criptográfica. Al presentarlo en ventanilla, el funcionario escaneará el código validando su trámite en 5 segundos.</p>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">¿Tiene problemas técnicos?</h4>
                <p className="text-xs text-[#6b7280] mt-1">Llámenos a la mesa de ayuda al número <strong>600 570 7040</strong> (lunes a domingo, 24 horas) o escríbanos a <strong>soporte@aduanas.cl</strong>.</p>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full bg-[#031636] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0c2a5e] transition-colors mt-6">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CLAVE ÚNICA REDIRECT ─────────────────────────────────────────
function ClaveUnicaScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"redirect" | "auth" | "returning">("redirect");

  useEffect(() => {
    const t1 = setTimeout(() => setStep("auth"), 1800);
    const t2 = setTimeout(() => setStep("returning"), 3400);
    const t3 = setTimeout(() => onComplete(), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const stepLabels = {
    redirect: { title: "Redirigiendo a ClaveÚnica...", desc: "Será redirigido de forma segura al portal de autenticación del Gobierno de Chile." },
    auth: { title: "Autenticando con ClaveÚnica", desc: "Verificando su identidad con el Registro Civil e Identificación (SRCeI)." },
    returning: { title: "Volviendo a SIAF...", desc: "Autenticación exitosa. Configurando su sesión en el Sistema Integral de Aduanas." },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center max-w-md w-full mx-4">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-[#0056b2]/10 flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M22 4L4 13v9c0 10.49 7.28 20.3 18 22.5C32.72 42.3 40 32.49 40 22V13L22 4z"
                fill="none" stroke="#0056b2" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M15 22l5 5 9-10" stroke="#0056b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-[#0056b2]/20 border-t-[#0056b2] animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-[#031636] mb-2 text-center">{stepLabels[step].title}</h2>
        <p className="text-[#6b7280] text-sm text-center leading-relaxed mb-6">{stepLabels[step].desc}</p>
        <div className="flex gap-2">
          {(["redirect","auth","returning"] as const).map((s, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500
              ${(["redirect","auth","returning"] as const).indexOf(step) >= i ? "w-8 bg-[#0056b2]" : "w-2 bg-gray-200"}`} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs text-[#6b7280]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="5" width="10" height="7" rx="1" stroke="#6B7280" strokeWidth="1.2" />
            <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Conexión cifrada — Gobierno de Chile
        </div>
      </div>
    </div>
  );
}

// ─── RECUPERAR CONTRASEÑA ─────────────────────────────────────────
function RecuperarScreen({ onBack }: { onBack: () => void }) {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!rut.trim() && !email.trim()) { toast.error("Ingrese su RUT o correo electrónico"); return; }
    toast.success("Enviando enlace de recuperación...");
    setTimeout(() => setSent(true), 700);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#44474e] font-medium mb-8 hover:text-black transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio de sesión
        </button>

        {!sent ? (
          <>
            <div className="w-14 h-14 bg-[#031636]/10 rounded-xl flex items-center justify-center mb-6 text-2xl">✉️</div>
            <h2 className="text-2xl font-bold text-[#031636] mb-2">Restablecer Contraseña</h2>
            <p className="text-[#6b7280] text-sm mb-8 leading-relaxed">
              Ingrese su RUT o correo electrónico registrado. Le enviaremos un enlace seguro para restablecer su contraseña (RF-09).
            </p>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">RUT</label>
                <input value={rut} onChange={e => setRut(e.target.value)} placeholder="12.345.678-9"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400 font-bold">O</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">Correo Electrónico</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.cl"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
              </div>
            </div>
            <button onClick={handleSubmit}
              className="mt-8 w-full bg-[#031636] text-white font-bold py-3 rounded-lg hover:bg-[#0a2a5e] transition-colors">
              Enviar Enlace de Recuperación
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✅</div>
            <h3 className="text-xl font-bold text-black mb-2">Enlace Enviado</h3>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-2">
              Revise su correo o mensaje de texto asociado al RUT <strong>{rut || "ingresado"}</strong>.
            </p>
            <p className="text-xs text-[#9ca3af]">El enlace expira en 30 minutos por seguridad.</p>
            <button onClick={onBack} className="mt-8 text-sm font-bold text-[#031636] hover:underline">
              Volver al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REGISTRO DE USUARIO ──────────────────────────────────────────
function RegistroUsuarioScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit() {
    if (!rut.trim() || !nombre.trim() || !email.trim() || !pwd.trim()) { toast.error("Complete todos los campos obligatorios"); return; }
    if (pwd !== pwdConfirm) { toast.error("Las contraseñas no coinciden"); return; }
    if (pwd.length < 8) { toast.error("La contraseña debe tener al menos 8 caracteres"); return; }
    toast.success("Registrando usuario...");
    setTimeout(() => setDone(true), 900);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✅</div>
          <h3 className="text-2xl font-bold text-black mb-2">Registro Exitoso</h3>
          <p className="text-[#6b7280] text-sm mb-2 leading-relaxed">Bienvenido <strong>{nombre}</strong>. Su cuenta ha sido creada correctamente.</p>
          <p className="text-xs text-[#9ca3af] mb-8">Recibirá un correo de confirmación a <strong>{email}</strong>.</p>
          <button onClick={onComplete} className="w-full bg-[#031636] text-white font-bold py-3 rounded-lg hover:bg-[#0a2a5e] transition-colors">
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf8fc] py-12" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full mx-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#44474e] font-medium mb-8 hover:text-black transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio de sesión
        </button>

        <h2 className="text-2xl font-bold text-[#031636] mb-1">Registro de Nuevo Usuario</h2>
        <p className="text-[#6b7280] text-sm mb-8">Cree su cuenta de viajero en el Sistema SIAF.</p>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">RUT *</label>
              <input value={rut} onChange={e => setRut(e.target.value)} placeholder="12.345.678-9"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">Nombre Completo *</label>
              <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Juan Pérez"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">Correo Electrónico *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.cl"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">Contraseña *</label>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Mín. 8 caracteres"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5px]">Confirmar *</label>
              <input type="password" value={pwdConfirm} onChange={e => setPwdConfirm(e.target.value)} placeholder="Repetir contraseña"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
            </div>
          </div>
        </div>

        {pwd.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${pwd.length > i * 3 ? pwd.length >= 10 ? "bg-[#16a34a]" : "bg-[#fb923c]" : "bg-gray-200"}`} />
            ))}
            <span className="text-xs text-[#44474e]">{pwd.length >= 10 ? "Fuerte" : pwd.length >= 6 ? "Moderada" : "Débil"}</span>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 p-3 bg-[#f5f3f7] rounded-lg">
          <input type="checkbox" id="terms" className="mt-0.5 shrink-0" />
          <label htmlFor="terms" className="text-xs text-[#44474e] leading-relaxed">
            Acepto los <button className="font-bold text-[#031636] hover:underline">Términos de Uso</button> y la{" "}
            <button className="font-bold text-[#031636] hover:underline">Política de Privacidad</button> del SIAF.
          </label>
        </div>

        <button onClick={handleSubmit} className="mt-6 w-full bg-[#031636] text-white font-bold py-3 rounded-lg hover:bg-[#0a2a5e] transition-colors">
          Crear Cuenta
        </button>
        <p className="text-xs text-[#9ca3af] text-center mt-4">
          ¿Ya tiene una cuenta?{" "}
          <button onClick={onBack} className="text-[#031636] font-bold hover:underline">Iniciar Sesión</button>
        </p>
      </div>
    </div>
  );
}

// ─── DASHBOARD CIUDADANO ──────────────────────────────────────────
function DashboardCiudadano({ userName, onStartTramite, onLogout }: {
  userName: string; onStartTramite: (view: View) => void; onLogout: () => void;
}) {
  const [showHelp, setShowHelp] = useState(false);

  const servicios = [
    { icon: "🚗", title: "Registro de Vehículo", desc: "Declare los datos de su vehículo para cruzar la frontera (RF-02).", badge: "Disponible", badgeColor: "green" as const },
    { icon: "🌿", title: "Declaración SAG", desc: "Declare productos de origen vegetal, animal o alimentos (RF-04).", badge: "Disponible", badgeColor: "green" as const },
    { icon: "🐾", title: "Registro de Mascotas", desc: "Viaje con su mascota. Ingrese antecedentes sanitarios requeridos.", badge: "Disponible", badgeColor: "green" as const },
    { icon: "📦", title: "Declaración de Mercancías", desc: "Declare artículos de valor o bienes que lleva consigo.", badge: "Disponible", badgeColor: "green" as const },
  ];

  const pasos = [
    { nombre: "Los Libertadores", estado: "Operativo", espera: "18 min", carga: 72 },
    { nombre: "Cardenal Samoré", estado: "Operativo", espera: "8 min", carga: 35 },
    { nombre: "Paso Pehuenche", estado: "Operativo", espera: "5 min", carga: 20 },
    { nombre: "Colchane", estado: "Alta demanda", espera: "45 min", carga: 90 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center px-10 justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl text-black">SIAF</span>
          <nav className="flex gap-1">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-3 py-2 text-sm font-semibold rounded-lg text-black bg-gray-100 hover:bg-gray-200">Inicio</button>
            <button onClick={() => document.getElementById("servicios-disponibles")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="px-3 py-2 text-sm font-semibold rounded-lg text-[#44474e] hover:bg-gray-100">Trámites</button>
            <button onClick={() => document.getElementById("pasos-fronterizos")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="px-3 py-2 text-sm font-semibold rounded-lg text-[#44474e] hover:bg-gray-100">Pasos Fronterizos</button>
            <button onClick={() => setShowHelp(true)} className="px-3 py-2 text-sm font-semibold rounded-lg text-[#44474e] hover:bg-gray-100">Ayuda</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold text-sm text-[#1b1b1e]">{userName}</p>
            <p className="text-xs text-[#44474e]">Ciudadano</p>
          </div>
          <div className="w-9 h-9 bg-[#d8e3fa] rounded-full flex items-center justify-center font-bold text-[#5a6578] text-sm">
            {userName[0]?.toUpperCase()}
          </div>
          <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-10 flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#7384a9] text-sm font-semibold uppercase tracking-wider mb-1">Panel de Servicios</p>
            <h1 className="text-3xl font-bold text-[#1b1b1e] tracking-tight">
              Bienvenido, <span className="text-[#031636]">{userName}</span>
            </h1>
            <p className="text-[#44474e] mt-2">¿Qué trámite desea realizar hoy en el Sistema Integral de Aduanas y Fronteras?</p>
          </div>
          <button onClick={() => onStartTramite("vehiculo")}
            className="bg-[#031636] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-[#0a2a5e] transition-colors flex items-center gap-3 shadow-lg">
            <span className="text-lg">+</span>
            Iniciar Nuevo Trámite
          </button>
        </div>

        <div className="bg-[#031636] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse" />
            <span className="text-white font-semibold text-sm">Sistema SIAF operativo — Todos los servicios disponibles</span>
          </div>
          <div className="flex gap-6">
            {[{ val: "3", label: "Pasos abiertos" }, { val: "842", label: "Tránsitos hoy" }, { val: "~18m", label: "Tiempo promedio" }].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-white font-black text-xl">{stat.val}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <h2 id="servicios-disponibles" className="font-bold text-[#1b1b1e] text-lg mb-4 scroll-mt-20">Servicios Disponibles</h2>
            <div className="grid grid-cols-2 gap-4">
              {servicios.map(s => (
                <div key={s.title}
                  className="text-left p-5 rounded-xl border-2 border-[#e2e8f0] bg-white text-[#1b1b1e]">
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm leading-tight text-[#1b1b1e]">{s.title}</h3>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0
                      ${s.badgeColor === "green" ? "bg-[#dcfce7] text-[#166534]"
                        : s.badgeColor === "blue" ? "bg-[#d8e3fa] text-[#5a6578]"
                        : "bg-[#e4e1e5] text-[#44474e]"}`}>
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#6b7280]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            <h2 id="pasos-fronterizos" className="font-bold text-[#1b1b1e] text-lg mb-4 scroll-mt-20">Estado Pasos Fronterizos</h2>
            <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden mb-4">
              {pasos.map((paso, i) => (
                <div key={paso.nombre} className={`p-4 ${i < pasos.length - 1 ? "border-b border-[#e2e8f0]" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-sm text-[#1b1b1e]">{paso.nombre}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full
                      ${paso.estado === "Operativo" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"}`}>
                      {paso.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#e4e1e5] rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${paso.carga > 80 ? "bg-[#ba1a1a]" : paso.carga > 60 ? "bg-[#fb923c]" : "bg-[#4ade80]"}`}
                        style={{ width: `${paso.carga}%` }} />
                    </div>
                    <span className="text-xs text-[#44474e] font-semibold shrink-0">~{paso.espera}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
              <h3 className="font-bold text-sm text-[#1b1b1e] mb-3">Mis Trámites Recientes</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "🚗", title: "Registro Vehículo KJ-LH-42", date: "Hace 2 días" },
                  { icon: "🌿", title: "Declaración SAG #SG-9092", date: "Hace 2 días" },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[#dcfce7] rounded-lg flex items-center justify-center shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1b1b1e] text-xs truncate">{item.title}</p>
                      <p className="text-[#6b7280] text-xs">{item.date}</p>
                    </div>
                    <Badge color="green" label="Aprobado" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#081b3b] px-10 py-8 flex items-center justify-between">
        <div>
          <p className="text-[#7384a9] font-bold text-lg">SIAF</p>
          <p className="text-[#7384a9]/80 text-sm">© 2024 Servicio Nacional de Aduanas - Gobierno de Chile</p>
        </div>
        <div className="flex gap-6">
          {["Privacidad","Términos de Uso","Contacto","Transparencia"].map(l => (
            <button key={l} className="text-[#7384a9]/80 text-sm font-semibold hover:text-[#7384a9]">{l}</button>
          ))}
        </div>
      </footer>

      {/* --- AYUDA DIALOG --- */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">✕</button>
            <h3 className="text-2xl font-bold text-[#031636] mb-4 flex items-center gap-2">
              <span>💡</span> Soporte Ciudadano SIAF
            </h3>
            <div className="space-y-4 text-sm text-[#44474e] leading-relaxed">
              <div>
                <h4 className="font-bold text-black text-sm">¿Cómo realizo un trámite?</h4>
                <p className="text-xs text-[#6b7280] mt-1">Selecciona cualquiera de las tarjetas de servicios en tu pantalla principal, rellena los datos requeridos y descarga tu código QR al finalizar.</p>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">¿Es obligatorio registrar mascotas?</h4>
                <p className="text-xs text-[#6b7280] mt-1">Sí. Todo animal doméstico que cruce la frontera debe estar registrado en el SAG, poseer microchip y certificado zoosanitario vigente.</p>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Contacto Directo</h4>
                <p className="text-xs text-[#6b7280] mt-1">Si tienes consultas operacionales en el control fronterizo, llama al <strong>600 570 7040</strong> o acércate a la oficina SAG/Aduanas del paso.</p>
              </div>
            </div>
            <button onClick={() => setShowHelp(false)} className="w-full bg-[#031636] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0c2a5e] transition-colors mt-6">
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PROGRESS STEPPER ────────────────────────────────────────────
function ProgressStepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="relative flex items-center justify-between max-w-3xl mx-auto w-full">
      <div className="absolute h-0.5 bg-[#c5c6cf] left-[12%] right-[12%] top-5 z-0" />
      <div className="absolute h-0.5 bg-black left-[12%] top-5 z-0 transition-all duration-300"
        style={{ width: `${(currentStep / (steps.length - 1)) * 76}%` }} />
      {steps.map((s, i) => {
        const active = i === currentStep, done = i < currentStep;
        return (
          <div key={s} className="flex flex-col items-center gap-2 z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-colors duration-300
              ${active ? "bg-black text-white" : done ? "bg-[#7384a9] text-white" : "bg-[#f5f3f7] text-[#44474e] border border-[#c5c6cf]"}`}>
              {done ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9l3.5 3.5L14 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : i + 1}
            </div>
            <span className={`text-xs font-semibold ${active || done ? "text-black" : "text-[#44474e]"}`}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── REGISTRO VEHÍCULO ────────────────────────────────────────────
function RegistroVehiculoScreen({ onNext, onBack, onLogout, data, setData, hasPets }: {
  onNext: () => void; onBack: () => void; onLogout: () => void;
  data: VehicleData; setData: (d: VehicleData) => void;
  hasPets: boolean;
}) {
  function validate() {
    if (!data.patente.trim()) { toast.error("Ingrese la patente del vehículo"); return; }
    if (!data.marca.trim()) { toast.error("Ingrese la marca del vehículo"); return; }
    if (!data.vin.trim() || data.vin.length < 10) { toast.error("VIN debe tener al menos 10 caracteres"); return; }
    onNext();
  }
  const countriesList = ["Chile","Argentina","Brasil","Uruguay","Bolivia","Perú","Colombia","Paraguay"];
  const steps = hasPets ? ["Vehículo", "Grupo", "SAG", "Mascotas", "Mercancías"] : ["Vehículo", "Grupo", "SAG", "Mercancías"];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter,sans-serif", background: "#fbf8fc" }}>
      <Toaster richColors />
      <header className="bg-[#fbf8fc] border-b border-[#c5c6cf] h-20 flex items-center px-10 justify-between shrink-0">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl text-black">SIAF</span>
          <nav className="flex gap-1">
            {["Trámites","Declaraciones","Manifiestos","Estadísticas"].map(l => (
              <button key={l} className="px-3 py-2 text-sm font-semibold text-[#44474e] rounded-lg hover:bg-gray-100">{l}</button>
            ))}
          </nav>
        </div>
        <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">Cerrar Sesión</button>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-12">
        <ProgressStepper steps={steps} currentStep={0} />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 bg-white rounded-xl border border-[#e2e8f0] shadow-[0_4px_6px_rgba(3,22,54,0.05)] p-8">
            <h1 className="text-2xl font-semibold text-black tracking-tight mb-2">Información del Vehículo</h1>
            <p className="text-[#44474e] mb-8">Ingrese los detalles técnicos del vehículo que cruzará la frontera.</p>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#1b1b1e]">Patente (Placa)</label>
                  <input value={data.patente} onChange={e => setData({ ...data, patente: e.target.value.toUpperCase() })}
                    placeholder="Ej: AB-CD-12"
                    className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1b1b1e]">País de Origen</label>
                  <select value={data.pais} onChange={e => setData({ ...data, pais: e.target.value })}
                    className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base outline-none focus:border-black transition-colors bg-white">
                    {countriesList.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#1b1b1e]">Marca</label>
                  <input value={data.marca} onChange={e => setData({ ...data, marca: e.target.value })} placeholder="Toyota, Ford..."
                    className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1b1b1e]">Modelo</label>
                  <input value={data.modelo} onChange={e => setData({ ...data, modelo: e.target.value })} placeholder="Corolla, Ranger..."
                    className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1b1b1e]">Año</label>
                  <input value={data.anio} onChange={e => setData({ ...data, anio: e.target.value })} placeholder="2024" type="number" min="1990" max="2025"
                    className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base outline-none focus:border-black transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#1b1b1e]">VIN (Número de Chasis)</label>
                <input value={data.vin} onChange={e => setData({ ...data, vin: e.target.value.toUpperCase() })}
                  placeholder="17 CARACTERES ALFANUMÉRICOS" maxLength={17}
                  className="mt-2 w-full border border-[#c5c6cf] rounded-lg px-4 py-3 text-base uppercase outline-none focus:border-black transition-colors font-mono tracking-widest" />
                <p className="mt-2 text-xs italic text-[#44474e]">Ubicado usualmente en el borde del parabrisas o marco de la puerta.</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#c5c6cf]">
              <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#44474e] hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#44474E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Volver
              </button>
              <button onClick={validate} className="bg-black text-white px-10 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                Continuar Registro
              </button>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_4px_12px_rgba(3,22,54,0.05)] overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={imgVehicleRef} alt="Vehículo" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-black mb-3">Requisitos de Ingreso</h3>
                <ul className="space-y-3">
                  {["Padrón o Título de Dominio del vehículo actualizado.","Seguro Obligatorio Internacional (RCI) vigente.","Permiso de circulación y revisión técnica al día."].map(r => (
                    <li key={r} className="flex gap-3 text-sm text-[#44474e]">
                      <svg className="shrink-0 mt-0.5" width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 1L1 5.5v5C1 14.42 4.13 18.93 8 20c3.87-1.07 7-5.58 7-9.5v-5L8 1z" fill="#7384A9" /></svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#081b3b] rounded-xl p-6">
              <p className="text-sm font-bold text-[#7384a9] mb-2">¿Necesita Asistencia?</p>
              <p className="text-[#7384a9] text-sm mb-3 opacity-80 leading-relaxed">Contacte a la mesa de ayuda técnica de Aduanas.</p>
              <p className="text-[#7384a9] font-semibold text-sm">📞 600 370 2000</p>
            </div>
            <div className="bg-[#f5f3f7] rounded-full px-4 py-2 flex items-center gap-2 self-start">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-xs uppercase tracking-widest text-[#44474e]">SISTEMA SINCRONIZADO</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#081b3b] px-10 py-8 flex items-center justify-between">
        <div>
          <p className="text-[#7384a9] font-bold text-lg">SIAF</p>
          <p className="text-[#7384a9]/80 text-sm">© 2024 Servicio Nacional de Aduanas - Gobierno de Chile</p>
        </div>
        <div className="flex gap-6">
          {["Privacidad","Términos de Uso","Contacto","Transparencia"].map(l => (
            <button key={l} className="text-[#7384a9]/80 text-sm font-semibold hover:text-[#7384a9]">{l}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── GRUPO Y MENORES ──────────────────────────────────────────────
function RegistroGrupoScreen({ onNext, onBack, onLogout, minors, setMinors, hasPets, setHasPets }: {
  onNext: () => void; onBack: () => void; onLogout: () => void;
  minors: Minor[]; setMinors: (m: Minor[]) => void;
  hasPets: boolean; setHasPets: (v: boolean) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newRut, setNewRut] = useState("");
  const [newEdad, setNewEdad] = useState("");
  const steps = hasPets ? ["Vehículo", "Grupo", "SAG", "Mascotas", "Mercancías"] : ["Vehículo", "Grupo", "SAG", "Mercancías"];

  function addMinor() {
    if (!newNombre.trim() || !newRut.trim() || !newEdad.trim()) { toast.error("Complete todos los campos del menor"); return; }
    setMinors([...minors, { id: Date.now().toString(), nombre: newNombre, rut: newRut, edad: newEdad }]);
    setNewNombre(""); setNewRut(""); setNewEdad(""); setShowAddForm(false);
    toast.success("Menor agregado correctamente");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter,sans-serif", background: "#fbf8fc" }}>
      <Toaster richColors />
      <header className="bg-[#fbf8fc] border-b border-[#c5c6cf] h-20 flex items-center px-10 justify-between shrink-0">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl text-black">SIAF</span>
          <nav className="flex gap-1">
            {["Trámites","Declaraciones","Manifiestos","Estadísticas"].map((l, i) => (
              <button key={l} className={`px-3 py-2 text-sm font-semibold rounded-lg ${i === 0 ? "text-black bg-gray-100" : "text-[#44474e] hover:bg-gray-100"}`}>{l}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold text-sm text-[#1b1b1e]">Juan Pérez</p>
            <p className="text-xs text-[#44474e]">Titular</p>
          </div>
          <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">Cerrar Sesión</button>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-8">
        <ProgressStepper steps={steps} currentStep={1} />
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#44474e] text-sm">Paso 2 de {steps.length}</p>
            <h1 className="text-[#1b1b1e] text-xl font-normal mt-2">Grupo de Viaje y Menores</h1>
            <p className="text-[#44474e] mt-1 text-sm leading-relaxed max-w-lg">Gestione los integrantes de su grupo familiar y declare menores de edad o mascotas.</p>
          </div>
          <div className="bg-[#f5f3f7] border border-[#c5c6cf] rounded-lg px-3 py-3 flex items-center gap-3">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 1L1 5.5v5C1 14.42 4.13 18.93 8 20c3.87-1.07 7-5.58 7-9.5v-5L8 1z" fill="black" /></svg>
            <div>
              <p className="font-bold text-sm text-[#1b1b1e]">Validación Notarial</p>
              <p className="text-xs text-[#44474e]">Conexión activa con SRCeI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-6">
            <div className="bg-[rgba(216,227,250,0.3)] rounded-r-lg border-l-4 border-[#545f72] pl-5 pr-4 py-4 flex gap-4">
              <svg className="shrink-0 mt-0.5" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path d="M9 2L2 5.5v4.25C2 13.7 5.1 17.53 9 18.5c3.9-.97 7-4.8 7-8.75V5.5L9 2zm0 5.5h1v4H9V7.5zm0-2.5h1v1.5H9V5z" fill="#545F72" />
              </svg>
              <div>
                <h4 className="font-bold text-[#5a6578] text-base">Declaración Jurada y Responsabilidad Legal</h4>
                <p className="text-[rgba(90,101,120,0.9)] text-sm mt-1 leading-relaxed">Toda información tiene carácter de declaración jurada bajo el Art. 210 del Código Penal.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#c5c6cf] overflow-hidden">
              <div className="border-b border-[#c5c6cf] px-6 py-6 flex items-center justify-between">
                <h3 className="text-[#1b1b1e] text-base font-normal">Integrantes del Grupo</h3>
                <button onClick={() => setShowAddForm(true)} className="bg-black text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  + Agregar Menor
                </button>
              </div>

              {showAddForm && (
                <div className="border-b border-[#c5c6cf] px-6 py-5 bg-[#f5f3f7]">
                  <h4 className="font-semibold text-sm text-[#1b1b1e] mb-4">Agregar menor de edad</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="text-xs font-semibold text-[#44474e]">Nombre completo</label>
                      <input value={newNombre} onChange={e => setNewNombre(e.target.value)}
                        className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#44474e]">RUT</label>
                      <input value={newRut} onChange={e => setNewRut(e.target.value)} placeholder="24.000.000-0"
                        className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#44474e]">Edad</label>
                      <input value={newEdad} onChange={e => setNewEdad(e.target.value)} type="number" min="0" max="17"
                        className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addMinor} className="bg-black text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-800">Confirmar</button>
                    <button onClick={() => setShowAddForm(false)} className="border border-[#c5c6cf] text-sm px-5 py-2 rounded-lg hover:bg-gray-100">Cancelar</button>
                  </div>
                </div>
              )}

              <div className="px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d8e3fa] rounded-full flex items-center justify-center text-xl">👤</div>
                  <div>
                    <p className="font-bold text-[#1b1b1e]">Juan Alberto Pérez Rodríguez</p>
                    <p className="text-[#44474e] text-sm">Titular / Conductor • RUT: 12.345.678-9</p>
                  </div>
                </div>
                <div className="bg-[#e4e1e5] px-3 py-1 rounded-full text-xs text-[#44474e]">Sujeto a Control</div>
              </div>

              {minors.map(m => (
                <div key={m.id} className="border-t border-[#c5c6cf] px-6 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[rgba(8,27,59,0.1)] rounded-full flex items-center justify-center text-xl">👦</div>
                    <div>
                      <p className="font-bold text-[#1b1b1e]">{m.nombre}</p>
                      <p className="text-[#44474e] text-sm">Menor de Edad • RUT: {m.rut} • {m.edad} años</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#7384a9] text-xs font-bold">Notaría Digital: Pendiente</span>
                    <button onClick={() => setMinors(minors.filter(x => x.id !== m.id))} className="text-[#75777f] hover:text-red-500 transition-colors">✕</button>
                  </div>
                </div>
              ))}

              {minors.length === 0 && !showAddForm && (
                <div className="border-t border-[#c5c6cf] flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-[#f0edf1] rounded-full border-2 border-dashed border-[#c5c6cf] flex items-center justify-center mb-4 text-2xl">👨‍👩‍👧</div>
                  <p className="font-bold text-[#1b1b1e] text-base">¿Viaja con más acompañantes?</p>
                  <p className="text-[#44474e] text-sm text-center max-w-xs mt-2 leading-relaxed">Todos los menores deben contar con autorización notarial vigente si no viajan con ambos padres.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[#c5c6cf] p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[rgba(0,74,47,0.1)] w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">🐾</div>
                <div className="flex-1 flex items-start justify-between">
                  <div>
                    <p className="text-[#1b1b1e] text-base font-normal">Declaración SAG (Mascotas)</p>
                    <p className="text-[#44474e] text-sm mt-1">¿Transporta animales domésticos (perros, gatos, hurones)?</p>
                  </div>
                  <button onClick={() => { setHasPets(!hasPets); toast.success(hasPets ? "Declaración SAG removida" : "Mascota declarada al SAG"); }}
                    className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors shrink-0 ${hasPets ? "bg-black" : "bg-[#e4e1e5]"}`}>
                    <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform ${hasPets ? "translate-x-5" : "translate-x-0.5"}`}
                      style={{ border: "1px solid #d1d5db" }} />
                  </button>
                </div>
              </div>
              {hasPets && (
                <div className="mt-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 text-sm text-[#166534]">
                  <p className="font-semibold">Declaración SAG registrada</p>
                  <p className="mt-1 text-xs opacity-80">Deberá presentar documentación veterinaria vigente en el punto de control.</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e4e1e5] shadow-sm p-6">
              <h4 className="font-bold text-[#1b1b1e] text-sm uppercase tracking-[0.8px] mb-4">RESUMEN DE DECLARACIÓN</h4>
              <div className="space-y-3">
                {[
                  { label: "Total Integrantes", value: `${minors.length + 1} Persona${minors.length === 0 ? "" : "s"}` },
                  { label: "Menores Declarados", value: String(minors.length) },
                  { label: "Mascotas (SAG)", value: hasPets ? "Declara" : "No declara" },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#c5c6cf] last:border-0">
                    <span className="text-[#44474e] text-sm">{row.label}</span>
                    <span className="font-bold text-[#1b1b1e] text-sm">{row.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#44474e] text-sm">Estado Notarial</span>
                  <span className="text-[#006e1c] font-bold text-sm">✓ Al día</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button onClick={onNext} className="w-full bg-black text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                  Continuar a Declaración SAG →
                </button>
                <button onClick={onBack} className="w-full border border-[#75777f] py-3 rounded-lg text-[#44474e] text-sm hover:bg-gray-50 transition-colors">
                  Volver al Paso Anterior
                </button>
              </div>
            </div>
            <div className="h-48 rounded-xl overflow-hidden relative border border-[#c5c6cf]">
              <img src={imgBorderCrossing} alt="Paso fronterizo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white text-xs">Paso Los Libertadores, Chile.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#081b3b] px-10 py-8 flex items-center justify-between">
        <div>
          <p className="text-[#7384a9] font-bold">SIAF</p>
          <p className="text-[#7384a9]/80 text-sm">© 2024 Servicio Nacional de Aduanas - Gobierno de Chile</p>
        </div>
        <div className="flex gap-6">
          {["Privacidad","Términos de Uso","Contacto","Transparencia"].map(l => (
            <button key={l} className="text-[#7384a9]/80 text-sm hover:text-[#7384a9]">{l}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── DECLARACION SAG (RF-04) ──────────────────────────────────────
function DeclaracionSagScreen({
  onNext, onBack, onLogout,
  sagVegetal, setSagVegetal, sagVegetalDetalle, setSagVegetalDetalle,
  sagAnimal, setSagAnimal, sagAnimalDetalle, setSagAnimalDetalle,
  hasPets
}: {
  onNext: () => void; onBack: () => void; onLogout: () => void;
  sagVegetal: boolean; setSagVegetal: (v: boolean) => void;
  sagVegetalDetalle: string; setSagVegetalDetalle: (s: string) => void;
  sagAnimal: boolean; setSagAnimal: (v: boolean) => void;
  sagAnimalDetalle: string; setSagAnimalDetalle: (s: string) => void;
  hasPets: boolean;
}) {
  const [signed, setSigned] = useState(false);

  const handleSubmit = () => {
    if (!signed) {
      toast.error("Debe aceptar la declaración jurada para continuar");
      return;
    }
    toast.success("Declaración SAG registrada exitosamente");
    onNext();
  };

  const steps = hasPets ? ["Vehículo", "Grupo", "SAG", "Mascotas", "Mercancías"] : ["Vehículo", "Grupo", "SAG", "Mercancías"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center px-10 justify-between shrink-0">
        <span className="font-black text-xl text-black tracking-tight">SIAF</span>
        <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">Cerrar Sesión</button>
      </header>

      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <ProgressStepper steps={steps} currentStep={2} />
        <div>
          <p className="text-[#44474e] text-sm font-semibold uppercase tracking-wider">Trámite SAG (RF-04) • Paso 3 de {steps.length}</p>
          <h1 className="text-3xl font-bold text-[#1b1b1e] tracking-tight mt-1">Declaración Jurada Conjunta SAG-Aduanas</h1>
          <p className="text-[#44474e] mt-2 text-sm leading-relaxed">Declare de forma anticipada si ingresa productos de origen vegetal, animal o alimentos al país.</p>
        </div>

        <div className="bg-white rounded-xl border border-[#c5c6cf] p-6 space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h3 className="font-bold text-base text-[#1b1b1e]">1. Productos de Origen Vegetal</h3>
              <p className="text-xs text-[#6b7280] mt-1">¿Trae consigo semillas, frutas frescas, flores, tierra o vegetales procesados?</p>
            </div>
            <button onClick={() => setSagVegetal(!sagVegetal)}
              className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors shrink-0 ${sagVegetal ? "bg-[#031636]" : "bg-[#e4e1e5]"}`}>
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform ${sagVegetal ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {sagVegetal && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Especifique qué productos vegetales porta</label>
              <textarea value={sagVegetalDetalle} onChange={e => setSagVegetalDetalle(e.target.value)} placeholder="Ej: Manzanas (2 kg), semillas de girasol..."
                className="w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white h-20 resize-none" />
            </div>
          )}

          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-6 pt-2">
            <div>
              <h3 className="font-bold text-base text-[#1b1b1e]">2. Productos de Origen Animal o Derivados</h3>
              <p className="text-xs text-[#6b7280] mt-1">¿Trae embutidos, quesos, carnes frescas o enlatadas, miel, o subproductos animales?</p>
            </div>
            <button onClick={() => setSagAnimal(!sagAnimal)}
              className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors shrink-0 ${sagAnimal ? "bg-[#031636]" : "bg-[#e4e1e5]"}`}>
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform ${sagAnimal ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {sagAnimal && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Especifique qué productos animales porta</label>
              <textarea value={sagAnimalDetalle} onChange={e => setSagAnimalDetalle(e.target.value)} placeholder="Ej: Queso mantecoso sellado (1 kg), cecinas..."
                className="w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white h-20 resize-none" />
            </div>
          )}

          <div className="bg-[#fdf2f2] border-l-4 border-[#ba1a1a] p-4 text-xs text-[#9b1c1c] rounded-r-lg">
            <p className="font-bold uppercase tracking-wider mb-1">IMPORTANTE</p>
            <p className="leading-relaxed">El ocultamiento de productos regulados por el SAG puede conllevar multas severas e incautación de las mercancías de forma inmediata en el paso fronterizo.</p>
          </div>

          <div className="flex items-start gap-3 pt-4">
            <input type="checkbox" id="signed-sag" checked={signed} onChange={e => setSigned(e.target.checked)} className="mt-1" />
            <label htmlFor="signed-sag" className="text-sm text-[#44474e] leading-relaxed">
              Declaro bajo juramento que toda la información provista en este formulario es verídica y que asumo las responsabilidades legales que de ella emanen.
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button onClick={handleSubmit} className="flex-1 bg-[#031636] text-white py-3.5 rounded-lg font-bold hover:bg-[#0c2a5e] transition-colors">
            {hasPets ? "Continuar a Mascotas →" : "Continuar a Mercancías →"}
          </button>
          <button onClick={onBack} className="px-6 border border-[#c5c6cf] text-[#44474e] rounded-lg hover:bg-gray-50 transition-colors">
            Volver
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── REGISTRO DE MASCOTAS ─────────────────────────────────────────
function RegistroMascotasScreen({
  onNext, onBack, onLogout, mascotaData, setMascotaData, hasPets
}: {
  onNext: () => void; onBack: () => void; onLogout: () => void;
  mascotaData: { nombre: string; tipo: string; raza: string; microchip: string; certificado: string; origen: string };
  setMascotaData: (data: any) => void;
  hasPets: boolean;
}) {
  const handleSubmit = () => {
    if (!mascotaData.nombre.trim() || !mascotaData.microchip.trim() || !mascotaData.certificado.trim()) {
      toast.error("Complete el nombre, microchip y certificado zoosanitario");
      return;
    }
    toast.success("Mascota registrada correctamente en el SIAF");
    onNext();
  };
  const steps = hasPets ? ["Vehículo", "Grupo", "SAG", "Mascotas", "Mercancías"] : ["Vehículo", "Grupo", "SAG", "Mercancías"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center px-10 justify-between shrink-0">
        <span className="font-black text-xl text-black tracking-tight">SIAF</span>
        <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">Cerrar Sesión</button>
      </header>

      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <ProgressStepper steps={steps} currentStep={3} />
        <div>
          <p className="text-[#44474e] text-sm font-semibold uppercase tracking-wider">Trámite SAG / Mascotas • Paso 4 de {steps.length}</p>
          <h1 className="text-3xl font-bold text-[#1b1b1e] tracking-tight mt-1">Registro de Tránsito de Mascotas</h1>
          <p className="text-[#44474e] mt-2 text-sm leading-relaxed">Registre los antecedentes sanitarios y de identificación de la mascota con la que ingresará o saldrá del país.</p>
        </div>

        <div className="bg-white rounded-xl border border-[#c5c6cf] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Nombre de la Mascota *</label>
              <input value={mascotaData.nombre} onChange={e => setMascotaData({ ...mascotaData, nombre: e.target.value })} placeholder="Ej: Rocky"
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Tipo de Mascota *</label>
              <select value={mascotaData.tipo} onChange={e => setMascotaData({ ...mascotaData, tipo: e.target.value })}
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white">
                <option value="Perro">🐕 Perro</option>
                <option value="Gato">🐈 Gato</option>
                <option value="Hurón">🦦 Hurón</option>
                <option value="Otro">🐾 Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Raza / Descripción *</label>
              <input value={mascotaData.raza} onChange={e => setMascotaData({ ...mascotaData, raza: e.target.value })} placeholder="Ej: Golden Retriever"
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">País de Origen / Procedencia</label>
              <select value={mascotaData.origen} onChange={e => setMascotaData({ ...mascotaData, origen: e.target.value })}
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white">
                <option value="Argentina">Argentina</option>
                <option value="Chile">Chile</option>
                <option value="Perú">Perú</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Nº de Microchip (15 dígitos) *</label>
              <input value={mascotaData.microchip} onChange={e => setMascotaData({ ...mascotaData, microchip: e.target.value })} placeholder="981020003004005"
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">Nº de Certificado Sanitario *</label>
              <input value={mascotaData.certificado} onChange={e => setMascotaData({ ...mascotaData, certificado: e.target.value })} placeholder="CERT-2024-88A"
                className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
            </div>
          </div>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 text-xs text-[#166534] flex gap-2">
            <span>ℹ️</span>
            <div>
              <p className="font-semibold">Requisitos del Control Fronterizo</p>
              <p className="mt-0.5 leading-relaxed">Su mascota debe tener la vacuna antirrábica vigente (aplicada al menos 21 días antes del viaje) y estar en buenas condiciones generales de salud al momento de la fiscalización.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button onClick={handleSubmit} className="flex-1 bg-[#031636] text-white py-3.5 rounded-lg font-bold hover:bg-[#0c2a5e] transition-colors">
            Registrar Mascota →
          </button>
          <button onClick={onBack} className="px-6 border border-[#c5c6cf] text-[#44474e] rounded-lg hover:bg-gray-50 transition-colors">
            Volver
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── DECLARACION DE MERCANCIAS (RF-05) ────────────────────────────
function DeclaracionMercanciasScreen({
  onNext, onBack, onLogout, mercancias, setMercancias, hasPets
}: {
  onNext: () => void; onBack: () => void; onLogout: () => void;
  mercancias: { id: string; descripcion: string; cantidad: number; valor: number }[];
  setMercancias: (m: any[]) => void;
  hasPets: boolean;
}) {
  const [desc, setDesc] = useState("");
  const [cant, setCant] = useState(1);
  const [val, setVal] = useState(0);

  const addItem = () => {
    if (!desc.trim() || cant <= 0 || val <= 0) {
      toast.error("Indique una descripción, cantidad y valor válidos");
      return;
    }
    setMercancias([...mercancias, { id: Date.now().toString(), descripcion: desc, cantidad: cant, valor: val }]);
    setDesc("");
    setCant(1);
    setVal(0);
    toast.success("Artículo agregado");
  };

  const removeItem = (id: string) => {
    setMercancias(mercancias.filter(item => item.id !== id));
    toast.info("Artículo removido");
  };

  const totalUSD = mercancias.reduce((acc, item) => acc + (item.valor * item.cantidad), 0);
  const franchiseLimit = 500;
  const paysTaxes = totalUSD > franchiseLimit;

  const handleSubmit = () => {
    toast.success("Declaración de mercancías guardada correctamente");
    onNext();
  };
  const steps = hasPets ? ["Vehículo", "Grupo", "SAG", "Mascotas", "Mercancías"] : ["Vehículo", "Grupo", "SAG", "Mercancías"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center px-10 justify-between shrink-0">
        <span className="font-black text-xl text-black tracking-tight">SIAF</span>
        <button onClick={onLogout} className="border border-[#75777f] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">Cerrar Sesión</button>
      </header>

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <ProgressStepper steps={steps} currentStep={hasPets ? 4 : 3} />
        <div>
          <p className="text-[#44474e] text-sm font-semibold uppercase tracking-wider">Trámite Aduanero (RF-05) • Paso {hasPets ? 5 : 4} de {steps.length}</p>
          <h1 className="text-3xl font-bold text-[#1b1b1e] tracking-tight mt-1">Declaración de Mercancías y Equipaje</h1>
          <p className="text-[#44474e] mt-2 text-sm leading-relaxed">Declare equipaje acompañado, artículos comerciales, obsequios o dinero en efectivo sobre el límite permitido.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-[#c5c6cf] p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#1b1b1e]">Agregar Artículo a la Declaración</h3>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <label className="text-xs font-bold text-[#44474e]">Descripción del Artículo</label>
                  <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Ej: PlayStation 5 Slim"
                    className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                </div>
                <div className="col-span-3">
                  <label className="text-xs font-bold text-[#44474e]">Cant.</label>
                  <input type="number" min="1" value={cant} onChange={e => setCant(parseInt(e.target.value) || 1)}
                    className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                </div>
                <div className="col-span-3">
                  <label className="text-xs font-bold text-[#44474e]">Valor Unit. (USD)</label>
                  <input type="number" min="0" value={val} onChange={e => setVal(parseFloat(e.target.value) || 0)}
                    className="mt-1 w-full border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white" />
                </div>
              </div>
              <button onClick={addItem} className="w-full bg-[#031636] text-white py-2 rounded-lg font-semibold text-xs hover:bg-[#0c2a5e] transition-colors">
                + Agregar a la Lista
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#c5c6cf] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-sm text-[#1b1b1e]">Detalle de Artículos Declarados</h3>
              </div>
              {mercancias.length === 0 ? (
                <div className="p-12 text-center text-[#6b7280] text-sm">
                  No ha declarado artículos. Si no lleva mercancías sobre la franquicia, puede continuar.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {mercancias.map(item => (
                    <div key={item.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-[#1b1b1e]">{item.descripcion}</p>
                        <p className="text-xs text-[#6b7280]">Cantidad: {item.cantidad} • Valor Unitario: USD {item.valor}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-sm text-black">Total: USD {item.cantidad * item.valor}</span>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 text-sm">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-4">
            <div className="bg-white rounded-xl border border-[#c5c6cf] p-6 space-y-4">
              <h4 className="font-bold text-[#1b1b1e] text-xs uppercase tracking-[0.8px]">Resumen de Franquicia</h4>
              <div className="space-y-2 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Límite Exento:</span>
                  <span>USD 500</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Monto Declarado:</span>
                  <span className="font-bold text-[#1b1b1e]">USD {totalUSD}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold text-gray-500">Estado de Impuestos:</p>
                {paysTaxes ? (
                  <div className="mt-2 bg-[#fdf2f2] border border-[#fde8e8] rounded-lg p-3 text-xs text-[#9b1c1c] leading-relaxed">
                    <p className="font-bold">Sujeto al pago de impuestos</p>
                    <p className="mt-1">Excede la franquicia por <strong>USD {totalUSD - franchiseLimit}</strong>. Deberá pagar arancel aduanero del 19% de IVA en frontera.</p>
                  </div>
                ) : (
                  <div className="mt-2 bg-[#f3faf7] border border-[#def7ec] rounded-lg p-3 text-xs text-[#03543f] leading-relaxed">
                    <p className="font-bold">✓ Exento de aranceles</p>
                    <p className="mt-1">Su declaración se encuentra dentro del rango de franquicia de viajero (USD 500).</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button onClick={handleSubmit} className="flex-1 bg-[#031636] text-white py-3.5 rounded-lg font-bold hover:bg-[#0c2a5e] transition-colors">
            Enviar Declaración Aduanera →
          </button>
          <button onClick={onBack} className="px-6 border border-[#c5c6cf] text-[#44474e] rounded-lg hover:bg-gray-50 transition-colors">
            Volver
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── COMPROBANTE ──────────────────────────────────────────────────
function ComprobanteScreen({
  onHome, tipoTramite, vehicle, hasPets, sagData, mascotaData, mercancias, minors
}: {
  onHome: () => void;
  tipoTramite: "vehiculo" | "sag" | "mascotas" | "mercancias";
  vehicle: VehicleData;
  hasPets: boolean;
  sagData: { sagVegetal: boolean; sagVegetalDetalle: string; sagAnimal: boolean; sagAnimalDetalle: string };
  mascotaData: { nombre: string; tipo: string; raza: string; microchip: string; certificado: string; origen: string };
  mercancias: { id: string; descripcion: string; cantidad: number; valor: number }[];
  minors: Minor[];
}) {
  const folio = "#4501-A" + Math.floor(Math.random() * 900 + 100) + "-X9";
  const fecha = new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  let title = "Salida Temporal de Vehículo";
  let fields: { label: string; value: string }[] = [];

  if (tipoTramite === "vehiculo") {
    title = "Comprobante Integrado de Tránsito SIAF";
    const totalUSD = mercancias.reduce((acc, item) => acc + (item.valor * item.cantidad), 0);
    const vegStr = sagData.sagVegetal ? "Sí: " + (sagData.sagVegetalDetalle || "Vegetales") : "No";
    const animStr = sagData.sagAnimal ? "Sí: " + (sagData.sagAnimalDetalle || "Derivados animales") : "No";
    const petStr = hasPets ? `${mascotaData.nombre || "Rocky"} (${mascotaData.tipo || "Perro"}) - Chip: ${mascotaData.microchip || "981020003004005"}` : "Sin mascotas";
    const mercStr = mercancias.length > 0 ? `${mercancias.length} art. (Total USD ${totalUSD})` : "Sin mercancías sobre franquicia";
    fields = [
      { label: "Vehículo / Patente", value: `${vehicle.marca || "Suzuki"} ${vehicle.modelo || "Swift"} | Patente: ${vehicle.patente || "KJ-LH-42"}` },
      { label: "Grupo de Viaje", value: `1 Titular + ${minors.length} menor(es)` },
      { label: "Declaración SAG Vegetal", value: vegStr },
      { label: "Declaración SAG Animal", value: animStr },
      { label: "Registro de Mascotas", value: petStr },
      { label: "Declaración Aduanas (Mercancías)", value: mercStr },
      { label: "Pago Aranceles", value: totalUSD > 500 ? `Requerido (19% IVA s/ exc.: USD ${Math.round((totalUSD - 500) * 0.19)})` : "Exento (Bajo franquicia)" },
      { label: "Paso Fronterizo & Vigencia", value: "Los Libertadores | Vigencia: 180 días" }
    ];
  } else if (tipoTramite === "sag") {
    title = "Declaración Jurada SAG-Aduanas (RF-04)";
    const vegStr = sagData.sagVegetal ? "Sí: " + (sagData.sagVegetalDetalle || "Vegetales") : "No";
    const animStr = sagData.sagAnimal ? "Sí: " + (sagData.sagAnimalDetalle || "Derivados animales") : "No";
    fields = [
      { label: "Productos Vegetales", value: vegStr },
      { label: "Productos Animales", value: animStr },
      { label: "Declarante", value: "Juan Pérez" },
      { label: "Estado Declaración", value: "Aprobada por IA / Sujeta a revisión" }
    ];
  } else if (tipoTramite === "mascotas") {
    title = "Registro Sanitario de Mascotas (SAG)";
    fields = [
      { label: "Nombre Mascota", value: `${mascotaData.nombre || "Rocky"} (${mascotaData.tipo || "Perro"})` },
      { label: "Nº Microchip / Chip ID", value: mascotaData.microchip || "981020003004005" },
      { label: "Certificado Sanitario", value: mascotaData.certificado || "CERT-2024-88A" },
      { label: "Procedencia", value: mascotaData.origen || "Argentina" }
    ];
  } else if (tipoTramite === "mercancias") {
    title = "Declaración de Mercancías y Equipaje (RF-05)";
    const totalUSD = mercancias.reduce((acc, item) => acc + (item.valor * item.cantidad), 0);
    fields = [
      { label: "Artículos Declarados", value: mercancias.length > 0 ? `${mercancias.length} artículos` : "Ninguno" },
      { label: "Valor Total Declarado", value: `USD ${totalUSD}` },
      { label: "Franquicia Utilizada", value: `USD ${Math.min(totalUSD, 500)} / USD 500` },
      { label: "Pago Aranceles", value: totalUSD > 500 ? `Requerido (19% s/ excedent: USD ${Math.round((totalUSD - 500) * 0.19)})` : "Exento (Bajo franquicia)" }
    ];
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter,sans-serif", background: "#fbf8fc" }}>
      <Toaster richColors />
      <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center px-10 justify-between shrink-0">
        <span className="font-black text-xl text-black tracking-tight">SIAF</span>
        <div className="bg-[#f5f3f7] rounded-full px-3 py-1 flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#16a34a] rounded-full" />
          <span className="text-sm font-semibold text-[#44474e]">Base Aduanas Sincronizada</span>
        </div>
      </header>

      <main className="flex-1 px-10 py-8 flex justify-center">
        <div className="w-full max-w-4xl grid grid-cols-12 gap-6">
          <div className="col-span-7 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#dcfce7] rounded-full flex items-center justify-center text-2xl">✅</div>
                <h1 className="font-semibold text-3xl text-black tracking-tight">Operación Exitosa</h1>
              </div>
              <p className="text-[#44474e] text-base leading-relaxed">Su trámite de aduana ha sido procesado y registrado correctamente. Presente este comprobante en el control fronterizo.</p>
            </div>

            <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-[0_4px_12px_rgba(3,22,54,0.05)]">
              <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] px-4 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[#545f72] font-semibold text-sm uppercase tracking-[0.7px]">ID SOLICITUD</p>
                  <p className="font-bold text-xl text-black">{folio}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#44474e] text-sm">Fecha de Emisión</p>
                  <p className="text-[#1b1b1e] text-sm">{fecha}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                {fields.map(f => (
                  <div key={f.label}>
                    <p className="text-[#545f72] font-semibold text-xs uppercase tracking-[0.3px]">{f.label}</p>
                    <p className="font-semibold text-[#1b1b1e] text-sm mt-0.5 leading-snug">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mx-1 mb-4 bg-[#eae7eb] border-l-4 border-black rounded-lg px-3 py-2 flex gap-2 items-start">
                <span className="shrink-0 text-base">ℹ️</span>
                <p className="text-[#1b1b1e] text-sm">Este documento es una copia digital válida. El código QR contiene la firma electrónica del Servicio Nacional de Aduanas.</p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button onClick={() => toast.success("Comprobante PDF generado y descargando...")}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors">
                📥 Descargar Comprobante PDF
              </button>
              <button onClick={onHome}
                className="flex items-center gap-2 bg-white border border-[#c5c6cf] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                🏠 Volver al Inicio
              </button>
            </div>
          </div>

          <div className="col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-sm p-8 flex flex-col items-center gap-4">
              <div className="bg-white border border-[#c5c6cf] rounded-lg p-4 max-w-[220px] aspect-square flex items-center justify-center">
                <img src={imgQR} alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-black uppercase">CÓDIGO DE VALIDACIÓN RÁPIDA</p>
                <p className="text-[#44474e] text-sm mt-1 leading-snug">Escanee este código en los puntos de control.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#c5c6cf] overflow-hidden">
              <div className="bg-[#eae7eb] px-4 py-3">
                <p className="font-bold text-sm uppercase text-black">INSTRUCCIONES DE VIAJE</p>
              </div>
              <div className="p-4 space-y-4">
                {[
                  "Tenga su cédula de identidad o pasaporte vigente junto a este comprobante.",
                  "Al llegar a la ventanilla única, informe que realizó el trámite digitalmente.",
                  `Siga las señaléticas de "Trámites Digitales" para un flujo preferente.`,
                ].map((instruction, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-[#e4e1e5] rounded-full flex items-center justify-center font-bold text-sm text-black shrink-0">{i + 1}</div>
                    <p className="text-[#1b1b1e] text-sm leading-snug">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#081b3b] px-10 py-8 flex items-center justify-between">
        <div>
          <p className="text-[#7384a9] font-bold text-lg">SIAF</p>
          <p className="text-[#7384a9]/80 text-sm">© 2024 Servicio Nacional de Aduanas - Gobierno de Chile</p>
        </div>
        <div className="flex gap-6">
          {["Privacidad","Términos de Uso","Contacto","Transparencia"].map(l => (
            <button key={l} className="text-[#7384a9]/80 text-sm font-semibold hover:text-[#7384a9]">{l}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── PANEL DE CONTROL ─────────────────────────────────────────────
const TRANSIT_DATA = [
  { id: "1", time: "10:42:01", patente: "KJ-PR-42", folio: "FOL: 88492021-X", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "2", time: "10:40:15", patente: "LX-29-33", folio: "FOL: 90211833-K", qr: "CADUCADO" as const, risk: 3 as const },
  { id: "3", time: "10:38:22", patente: "BP-HS-99", folio: "FOL: 87661290-A", qr: "PROCESANDO" as const, risk: 2 as const },
  { id: "4", time: "10:35:44", patente: "TY-01-20", folio: "FOL: 11223344-Z", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "5", time: "10:33:10", patente: "MN-67-FD", folio: "FOL: 55443322-B", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "6", time: "10:30:05", patente: "XR-44-PQ", folio: "FOL: 99887766-C", qr: "CADUCADO" as const, risk: 3 as const },
];

function PanelControlScreen({ onInspect, onNavigate, onLogout }: {
  onInspect: (id: string, patente: string) => void; onNavigate: (view: View) => void; onLogout: () => void;
}) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = TRANSIT_DATA.filter(r =>
    r.patente.toLowerCase().includes(search.toLowerCase()) || r.folio.toLowerCase().includes(search.toLowerCase())
  );
  const qrColor = { "VÁLIDO": "green", "CADUCADO": "red", "PROCESANDO": "blue" } as const;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="panel" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 px-10 py-6 flex flex-col gap-6 bg-[#fbf8fc]">
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por patente, RUT o folio..."
              className="w-full bg-white border border-[#c5c6cf] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#44474e] outline-none focus:border-[#031636] transition-colors" />
            <svg className="absolute left-3.5 top-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5.5 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM11 11l-2-2" stroke="#44474E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {search && <p className="text-sm text-[#44474e]">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para "{search}"</p>}
        </div>

        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Vehículos en espera", value: "124", sub: "+12% vs ayer", subColor: "#ba1a1a", iconBg: "#D8E2FF" },
            { label: "Tránsitos Aprobados", value: "842", sub: "Lote 08:00–10:00", subColor: "#7384a9", iconBg: "#D8E3FA" },
            { label: "Alertas Activas (RF-15)", value: "03", sub: "PRIORIDAD CRÍTICA", subColor: "#ba1a1a", iconBg: "#FFDAD6", critical: true },
            { label: "Tf. Promedio (mins)", value: "18.5", progress: 65, iconBg: "#E4E1E5" },
          ].map((s, i) => (
            <div key={i} className={`bg-white rounded-xl p-4 border shadow-sm flex flex-col justify-between
              ${s.critical ? "border-l-4 border-l-[#ba1a1a] border-[#c5c6cf]" : "border-[#c5c6cf]"}`}>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-[#44474e] leading-tight">{s.label}</p>
                <div className="rounded-lg w-8 h-8 shrink-0" style={{ background: s.iconBg }} />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-semibold tracking-tight" style={{ color: s.critical ? "#ba1a1a" : "black" }}>{s.value}</p>
                {(s as { progress?: number }).progress !== undefined
                  ? <div className="bg-[#e4e1e5] h-1.5 rounded-full mt-2 overflow-hidden"><div className="bg-[#364669] h-full rounded-full" style={{ width: `${(s as { progress: number }).progress}%` }} /></div>
                  : <p className="text-sm font-bold mt-1" style={{ color: (s as { subColor: string }).subColor }}>{(s as { sub: string }).sub}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden">
            <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] px-4 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xl text-black">Flujo en Tiempo Real</h3>
                <p className="text-sm text-[#44474e]">Últimos 50 movimientos registrados</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsExportOpen(true)} className="border border-[#75777f] text-sm px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50">Exportar</button>
                <button className="bg-black text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800">Filtros</button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#eae7eb]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">HORA</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">PATENTE / FOLIO</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-36">ESTADO QR</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">RIESGO</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(row => (
                  <tr key={row.id}
                    className={`border-t border-[#c5c6cf] hover:bg-gray-50 cursor-pointer transition-colors ${row.qr === "CADUCADO" ? "bg-[rgba(255,218,214,0.05)]" : ""}`}
                    onClick={() => onInspect(row.id, row.patente)}>
                    <td className="px-4 py-5 text-sm text-[#1b1b1e] font-mono">{row.time}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-base text-black">{row.patente}</p>
                      <p className="text-[#44474e] text-xs">{row.folio}</p>
                    </td>
                    <td className="px-4 py-5"><Badge color={qrColor[row.qr]} label={row.qr} /></td>
                    <td className="px-4 py-5"><RiskBars level={row.risk} /></td>
                    <td className="px-4 py-5 text-right">
                      <button onClick={e => { e.stopPropagation(); onInspect(row.id, row.patente); }}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium text-[#44474e] hover:text-black">
                        Ver →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-[#c5c6cf] overflow-hidden">
              <div className="bg-[#410006] px-4 py-4 flex items-center gap-2">
                <span className="text-white text-sm">🔔</span>
                <h4 className="text-white font-bold text-xs uppercase tracking-[1.4px]">ALERTAS RF-15 (FRONTERA)</h4>
              </div>
              <div className="p-3 space-y-3">
                {[
                  { p: "01 - CRÍTICA", t: "HACE 2 MIN", title: "Desvío de Ruta Detectado - RF-15-X90", bg: "bg-[#ffdad6]", border: "border-[#ba1a1a]", tc: "text-[#93000a]", action: "INTERVENIR AHORA", as: "bg-[#ba1a1a] text-white", cb: () => toast.error("Intervención registrada. Unidades enviadas.") },
                  { p: "02 - ALTA", t: "HACE 15 MIN", title: "Inconsistencia de Carga (Peso Neto)", bg: "bg-[#fff7ed]", border: "border-orange-500", tc: "text-[#7c2d12]", action: "SOLICITAR REVISIÓN", as: "border border-orange-400 text-[#7c2d12] hover:bg-orange-50", cb: () => toast.warning("Revisión física solicitada") },
                  { p: "03 - MEDIA", t: "HACE 42 MIN", title: "QR Escaneado 2x sin coincidencia", bg: "bg-[#fef9c3]", border: "border-yellow-400", tc: "text-[#713f12]", action: "MARCAR REVISADA", as: "border border-yellow-400 text-[#713f12] hover:bg-yellow-50", cb: () => toast.info("Alerta marcada como revisada") },
                ].map(alert => (
                  <div key={alert.title} className={`${alert.bg} border-l-4 ${alert.border} rounded-lg pl-4 pr-3 py-3`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`${alert.tc} text-xs font-black uppercase`}>PRIORIDAD: {alert.p}</span>
                      <span className={`${alert.tc} text-xs`}>{alert.t}</span>
                    </div>
                    <p className={`font-bold ${alert.tc} text-xs mb-3`}>{alert.title}</p>
                    <button onClick={alert.cb} className={`w-full text-xs font-bold uppercase py-1.5 rounded ${alert.as}`}>{alert.action}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onConfirm={(fmt) => {
        setIsExportOpen(false);
        toast.success(`Archivo de tránsitos exportado en formato ${fmt.toUpperCase()} con éxito.`);
      }} />
    </div>
  );
}

// ─── INSPECCIÓN ───────────────────────────────────────────────────
function InspeccionScreen({ patente, onBack, onNavigate, onLogout }: {
  patente: string; onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"vehiculo" | "acompanantes" | "sag" | "pdi">("vehiculo");
  const [result, setResult] = useState<"pending" | "aprobado" | "retenido" | "derivado">("pending");

  function handleAction(action: "aprobado" | "retenido" | "derivado") {
    setResult(action);
    const msgs = { aprobado: "✓ Tránsito aprobado. Paso autorizado.", retenido: "⚠ Vehículo retenido para inspección física.", derivado: "→ Caso derivado a unidad especializada." };
    toast[action === "aprobado" ? "success" : action === "retenido" ? "warning" : "info"](msgs[action]);
  }

  const tabs = [
    { key: "vehiculo" as const, label: "Datos del Vehículo" },
    { key: "acompanantes" as const, label: "Acompañantes/Menores" },
    { key: "sag" as const, label: "Declaración SAG" },
    { key: "pdi" as const, label: "Control PDI" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="inspeccion" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-6 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#44474e] font-medium hover:text-black mb-2 transition-colors">
              ← Volver a Listado
            </button>
            <h1 className="text-3xl font-semibold text-[#1b1b1e] tracking-tight">Detalle de Inspección<br />#8829-2026</h1>
            <p className="text-[#44474e] mt-1">Paso Los Libertadores | Última actualización: hace 14 minutos</p>
          </div>
          <div className="flex items-center gap-3">
            {result !== "pending" && (
              <Badge color={result === "aprobado" ? "green" : result === "retenido" ? "orange" : "blue"} label={result.toUpperCase()} />
            )}
            {result === "pending" ? (
              <>
                <button onClick={() => toast.info("Borrador guardado")} className="border-2 border-black px-5 py-2.5 rounded-lg text-base font-normal hover:bg-gray-50 transition-colors">Guardar Borrador</button>
                <button onClick={() => handleAction("retenido")} className="bg-[#ba1a1a] text-white px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-[#9e1515] transition-colors">Retener</button>
                <button onClick={() => handleAction("derivado")} className="bg-[#545f72] text-white px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-[#444f60] transition-colors">Derivar</button>
                <button onClick={() => handleAction("aprobado")} className="bg-black text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition-colors">Aprobar</button>
              </>
            ) : (
              <button onClick={onBack} className="border border-[#c5c6cf] px-6 py-3 rounded-lg text-sm font-semibold text-[#44474e] hover:bg-gray-50 transition-colors">Volver al Panel</button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden">
              <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] flex">
                {tabs.map(t => (
                  <button key={t.key} onClick={() => setActiveTab(t.key)}
                    className={`px-6 py-4 text-base transition-colors ${activeTab === t.key ? "font-normal text-black border-b-2 border-black" : "text-[#44474e] hover:text-black"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {activeTab === "vehiculo" && (
                  <div className="flex gap-8">
                    <div className="space-y-5 w-64">
                      <div>
                        <p className="text-xs font-bold text-[#44474e] uppercase tracking-[0.5px]">PATENTE (PLACA)</p>
                        <p className="text-5xl font-bold text-black tracking-tight mt-1">{patente || "AA-BB-12"}</p>
                        <div className="flex items-center gap-1 mt-2 bg-[#dcfce7] px-2 py-0.5 rounded w-fit">
                          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
                          <span className="text-xs font-bold text-[#166534]">SIN ENCARGO POR ROBO</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#44474e]">Marca / Modelo</p>
                        <p className="font-semibold text-[#1b1b1e] text-xl mt-1">Toyota Hilux 2024</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#44474e]">Propietario</p>
                        <div className="bg-[#f5f3f7] border border-[#c5c6cf] rounded-lg p-3 flex items-center gap-3 mt-2">
                          <div className="bg-white shadow-sm h-10 w-9 rounded flex items-center justify-center text-base shrink-0">👤</div>
                          <div>
                            <p className="font-bold text-[#1b1b1e] text-sm">Ricardo Fuentes Silva</p>
                            <p className="text-[#44474e] text-xs">RUT: 15.662.339-K</p>
                          </div>
                          <span className="ml-auto text-[#16a34a]">✓</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="rounded-xl overflow-hidden h-72">
                        <img src={imgVehiclePhoto} alt="Vehículo" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {["Vista Frontal","Motor (Chasis)"].map(l => (
                          <span key={l} className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "acompanantes" && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">👨‍👩‍👧</span>
                      <h3 className="font-semibold text-[#1b1b1e] text-xl">Acompañantes y Menores</h3>
                      <span className="bg-[#eae7eb] px-3 py-1 rounded-full text-sm font-bold">2 Pasajeros</span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        { name: "Elena Silva Roa", rut: "16.221.002-4", role: "Cónyuge", status: "✓ VALIDADO CIVIL", statusColor: "text-[#16a34a]", minor: false },
                        { name: "Tomás Fuentes S.", rut: "24.110.887-1", role: "Menor", status: "✓ Validación Notarial OK", statusColor: "text-[#16a34a]", minor: true },
                      ].map(p => (
                        <div key={p.rut} className={`border border-[#c5c6cf] rounded-lg p-4 flex gap-4 w-72 ${p.minor ? "bg-[rgba(8,27,59,0.03)] border-l-4" : ""}`}>
                          <div className="bg-[#f0edf1] rounded w-14 h-14 shrink-0 flex items-center justify-center text-2xl">{p.minor ? "👦" : "👤"}</div>
                          <div>
                            <p className="font-bold text-[#1b1b1e]">{p.name}</p>
                            <p className="text-[#44474e] text-sm">{p.rut}</p>
                            <Badge color={p.minor ? "red" : "gray"} label={p.role} />
                            <p className={`text-xs font-bold mt-1.5 ${p.statusColor}`}>{p.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "sag" && (
                  <div className="max-w-xs">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🌿</span>
                      <h3 className="font-semibold text-[#1b1b1e] text-xl">Declaración SAG</h3>
                    </div>
                    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 mb-4">
                      <p className="font-medium text-[#166534] text-sm">Declaración Digital #SG-9092 enviada satisfactoriamente.</p>
                      <p className="text-[#15803d] text-xs uppercase mt-1">SIN PRODUCTOS DE ORIGEN VEGETAL/ANIMAL.</p>
                    </div>
                    <button onClick={() => toast.info("Generando PDF de declaración SAG...")}
                      className="w-full border border-[#c5c6cf] rounded py-2 text-[#44474e] text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                      📄 Ver PDF Declaración
                    </button>
                  </div>
                )}
                {activeTab === "pdi" && (
                  <div className="max-w-xs">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🔵</span>
                      <h3 className="font-semibold text-[#1b1b1e] text-xl">Control PDI</h3>
                    </div>
                    <div className="space-y-3">
                      {[{ label: "Arraigos / Alertas", value: "SIN ALERTAS", ok: true }, { label: "Control Migratorio", value: "HABILITADO", ok: true }].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#c5c6cf]">
                          <span className="text-[#44474e] text-sm">{row.label}</span>
                          <span className="font-bold text-sm text-[#16a34a]">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden self-start">
            <div className="border-b border-[#c5c6cf] px-6 py-6 flex items-center justify-between">
              <h3 className="font-semibold text-[#1b1b1e] text-xl">Timeline Auditoría</h3>
              <span className="bg-black text-white text-xs font-black px-2 py-0.5 rounded">RF-19</span>
            </div>
            <div className="p-6 space-y-4">
              {[
                { time: "10:42:01", action: "Inicio de Trámite", desc: "Usuario ingresó solicitud de tránsito", color: "#7384a9" },
                { time: "10:43:15", action: "Validación QR", desc: "Código QR verificado en base de datos", color: "#16a34a" },
                { time: "10:44:02", action: "Verificación PDI", desc: "Control migratorio completado", color: "#16a34a" },
                { time: "10:44:55", action: "Revisión SAG", desc: "Declaración SAG procesada", color: "#16a34a" },
                {
                  time: "10:45:30",
                  action: result === "pending" ? "Pendiente" : `Resultado: ${result}`,
                  desc: result === "pending" ? "Esperando acción del funcionario" : "Acción registrada en el sistema",
                  color: result === "aprobado" ? "#16a34a" : result === "retenido" ? "#fb923c" : result === "derivado" ? "#5a6578" : "#7384a9",
                },
              ].map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: event.color }} />
                    {i < 4 && <div className="w-px flex-1 bg-[#c5c6cf] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#1b1b1e] text-sm">{event.action}</p>
                      <span className="text-[#44474e] text-xs font-mono">{event.time}</span>
                    </div>
                    <p className="text-[#44474e] text-xs mt-0.5">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── AUDITORÍA ────────────────────────────────────────────────────
const AUDIT_ROWS = [
  { ts: "2023-10-27\n14:22:09.112", user: "m_gonzalez_adu", module: "RF-05 Declaraciones", action: "Modificación de Manifiesto #4422-X", ip: "186.105.42.21", result: "APROBADO" as const },
  { ts: "2023-10-27\n14:18:55.004", user: "ext_user_unknown", module: "Auth Service", action: "Intento de login fallido (5x)", ip: "45.230.12.98", result: "BLOQUEADO" as const },
  { ts: "2023-10-27\n14:15:30.450", user: "j_perez_valp", module: "Contenedores", action: "Consulta de carga peligrosa", ip: "201.187.5.33", result: "ALERTA" as const },
  { ts: "2023-10-27\n14:10:12.887", user: "system_daemon", module: "Sync Regional", action: "Sincronización de base de datos Aduana-Z", ip: "Internal", result: "APROBADO" as const },
  { ts: "2023-10-27\n14:05:44.221", user: "k_morales_adm", module: "RF-15 Fronteras", action: "Cierre de turno - Paso Los Libertadores", ip: "10.0.2.45", result: "APROBADO" as const },
];

function AuditoriaScreen({ onNavigate, onLogout }: { onNavigate: (view: View) => void; onLogout: () => void }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const resultColor = { "APROBADO": "green", "BLOQUEADO": "red", "ALERTA": "orange" } as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="auditoria" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-black tracking-tight">Centro de Auditoría (RF-19)</h1>
            <p className="text-[#545f72] text-base mt-1">Monitoreo inalterable de eventos y control de seguridad fronteriza.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => toast.info("Abriendo filtros avanzados...")}
              className="bg-[#e4e1e5] border border-[#c5c6cf] px-5 py-2.5 rounded-lg flex items-center gap-2 text-[#1b1b1e] text-sm hover:bg-[#d4d1d5] transition-colors">
              ⚙ Filtros Avanzados
            </button>
            <button onClick={() => setIsExportOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-sm hover:bg-gray-800 transition-colors">
              📄 Exportar Reporte
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 flex gap-6">
            {[
              { iconBg: "#D8E2FF", label: "TOTAL EVENTOS 24H", value: "14,292", sub: "+12% hoy" },
              { iconBg: "#FFDAD6", label: "ALERTAS DE SEGURIDAD", value: "84", sub: "-5% vs ayer", subRed: true },
              { iconBg: "#D8E3FA", label: "INTEGRIDAD DEL LOG", value: "100%", sub: "Estable" },
            ].map(s => (
              <div key={s.label} className="flex-1 bg-white rounded-xl p-4 border border-[#c5c6cf] shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg w-9 h-8 shrink-0" style={{ background: s.iconBg }} />
                  <span className={`text-sm font-bold ${(s as { subRed?: boolean }).subRed ? "text-[#ba1a1a]" : "text-[#44474e]"}`}>{s.sub}</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-[#545f72] uppercase tracking-tight">{s.label}</p>
                  <p className="text-4xl font-bold text-[#1b1b1e] tracking-tight mt-1">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-4 bg-[#081b3b] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-[#7384a9] text-lg mb-1">Resumen Institucional</h4>
              <p className="text-[#7384a9] text-sm opacity-80 mb-4 leading-relaxed">Exportación masiva para auditoría externa 2024.</p>
            </div>
            <div className="space-y-2">
              {["PDF Generado (Q3)","Excel Consolidado"].map(item => (
                <button key={item} onClick={() => toast.success(`Descargando ${item}...`)}
                  className="flex items-center gap-2 text-[#7384a9] text-sm hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-[#7384a9] rounded-full" /> {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden">
          <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] px-6 py-4 flex items-center justify-between">
            <h3 className="font-semibold text-[#1b1b1e] text-xl">Registro de Auditoría Detallado</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#545f72]">Streaming en tiempo real activado</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0edf1]">
                  {["TIMESTAMP","USUARIO","MÓDULO / ACCIÓN","DIRECCIÓN IP","RESULTADO","DETALLE"].map((h, i) => (
                    <th key={h} className={`px-6 py-5 text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf] ${i === 5 ? "text-right" : i === 4 ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUDIT_ROWS.map((row, i) => (
                  <tr key={i} className="border-t border-[#c5c6cf] hover:bg-[#fafafa] transition-colors">
                    <td className="px-6 py-5">{row.ts.split("\n").map((l, j) => <p key={j} className="font-mono text-xs text-[#545f72]">{l}</p>)}</td>
                    <td className="px-6 py-5 font-bold text-[#1b1b1e] text-sm">{row.user}</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-[#1b1b1e] text-sm">{row.module}</p>
                      <p className="text-[#44474e] text-xs">{row.action}</p>
                    </td>
                    <td className="px-6 py-5 text-[#545f72] text-sm pl-12">{row.ip}</td>
                    <td className="px-6 py-5 text-center"><Badge color={resultColor[row.result]} label={row.result} /></td>
                    <td className="px-6 py-5 text-right">
                      <button onClick={() => toast.info(`Cargando detalle: ${row.action}`)}
                        className={`font-bold text-sm hover:underline ${row.result === "BLOQUEADO" ? "text-[#ba1a1a]" : "text-black"}`}>
                        {row.result === "BLOQUEADO" ? "Analizar" : row.result === "ALERTA" ? "Ver Hash" : "Ver JSON"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#f5f3f7] border-t border-[#c5c6cf] px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-[#44474e]">Mostrando 5 de 14,292 entradas registradas hoy.</span>
            <div className="flex gap-2">
              <button onClick={() => toast.info("Página anterior")} className="bg-white border border-[#c5c6cf] rounded px-3 py-1.5 text-sm hover:bg-gray-50">← Ant.</button>
              <button onClick={() => toast.info("Página siguiente")} className="bg-white border border-[#c5c6cf] rounded px-3 py-1.5 text-sm hover:bg-gray-50">Sig. →</button>
            </div>
          </div>
        </div>
      </main>
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onConfirm={(fmt) => {
        setIsExportOpen(false);
        toast.success(`Reporte de auditoría exportado en formato ${fmt.toUpperCase()} con éxito.`);
      }} />
    </div>
  );
}

// ─── EXPORT MODAL ─────────────────────────────────────────────────
function ExportModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: (format: string) => void }) {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsExporting(false);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleConfirm() {
    setIsExporting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            onConfirm(selectedFormat);
          }, 300);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#c5c6cf] shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
        <h3 className="font-semibold text-lg text-black">Exportar Datos</h3>
        {!isExporting ? (
          <>
            <p className="text-sm text-[#44474e]">Seleccione el formato en el cual desea exportar y descargar el listado o reporte actual.</p>
            <div className="flex flex-col gap-2.5">
              {[
                { id: "excel", title: "Microsoft Excel (.xlsx)", desc: "Ideal para análisis de datos y hojas de cálculo." },
                { id: "csv", title: "Valores separados por comas (.csv)", desc: "Ideal para importar a otros sistemas." },
                { id: "pdf", title: "Documento PDF (.pdf)", desc: "Ideal para impresión y visualización limpia." },
              ].map(f => (
                <label key={f.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                  ${selectedFormat === f.id ? "border-black bg-gray-50" : "border-[#c5c6cf] hover:border-gray-300"}`}>
                  <input type="radio" name="export-format" checked={selectedFormat === f.id} onChange={() => setSelectedFormat(f.id)} className="mt-1" />
                  <div>
                    <p className="text-sm font-bold text-black">{f.title}</p>
                    <p className="text-xs text-[#44474e]">{f.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={onClose} className="px-4 py-2 border border-[#c5c6cf] rounded-lg text-sm text-[#44474e] hover:bg-gray-50">Cancelar</button>
              <button onClick={handleConfirm} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">Confirmar Exportación</button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-black h-full rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm font-semibold text-[#44474e]">Generando archivo... {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GESTIÓN DE USUARIOS ──────────────────────────────────────────
type SiafUser = {
  id: string;
  name: string;
  rut: string;
  email: string;
  role: string;
  status: string;
};

function UsuariosScreen({ onNavigate, onLogout }: { onNavigate: (view: View) => void; onLogout: () => void }) {
  const [users, setUsers] = useState<SiafUser[]>([
    { id: "1", name: "Ariel Catalán", rut: "12.345.678-9", email: "ariel.catalan@siaf.cl", role: "Ciudadano", status: "Activo" },
    { id: "2", name: "Vicente Orellana", rut: "18.765.432-1", email: "v.orellana@aduana.cl", role: "Funcionario", status: "Activo" },
    { id: "3", name: "Diego Rebaza", rut: "15.987.654-3", email: "d.rebaza@pdi.cl", role: "Funcionario", status: "Activo" },
    { id: "4", name: "Joshua Reyes", rut: "16.321.654-K", email: "j.reyes@sag.cl", role: "Funcionario", status: "Inactivo" },
    { id: "5", name: "Cindy Contador", rut: "11.222.333-4", email: "cindy.contador@siaf.cl", role: "Administrador", status: "Activo" },
  ]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<SiafUser | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Edit user form fields:
  const [editName, setEditName] = useState("");
  const [editRut, setEditRut] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.rut.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function startEdit(u: SiafUser) {
    setEditingUser(u);
    setEditName(u.name);
    setEditRut(u.rut);
    setEditEmail(u.email);
    setEditRole(u.role);
    setEditStatus(u.status);
  }

  function handleUpdate() {
    if (!editName.trim() || !editRut.trim() || !editEmail.trim()) {
      toast.error("Por favor complete todos los campos obligatorios.");
      return;
    }
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name: editName, rut: editRut, email: editEmail, role: editRole, status: editStatus } : u));
    setEditingUser(null);
    toast.success("Usuario actualizado correctamente.");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="usuarios" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-black tracking-tight">Gestión de Usuarios</h1>
            <p className="text-[#545f72] text-base mt-1">Administración de credenciales, roles y accesos institucionales.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsExportOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-sm hover:bg-gray-800 transition-colors cursor-pointer border-none">
              📥 Exportar Listado
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#c5c6cf] shadow-sm">
          <div className="relative max-w-sm flex-1">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre, RUT o correo..."
              className="w-full bg-white border border-[#c5c6cf] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#44474e] outline-none focus:border-[#031636] transition-colors" />
            <svg className="absolute left-3.5 top-3.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5.5 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM11 11l-2-2" stroke="#44474E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {search && <p className="text-sm text-[#44474e]">{filtered.length} usuario{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>}
        </div>

        <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0edf1]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">NOMBRE</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">RUT</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">CORREO ELECTRÓNICO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">ROL / PERFIL</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">ESTADO</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-[#44474e] uppercase tracking-[0.6px] border-b border-[#c5c6cf]">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-t border-[#c5c6cf] hover:bg-[#fafafa] transition-colors">
                    <td className="px-6 py-4 font-bold text-[#1b1b1e] text-sm">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-[#545f72] font-mono">{u.rut}</td>
                    <td className="px-6 py-4 text-sm text-[#545f72]">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full
                        ${u.role === "Administrador" ? "bg-purple-100 text-purple-800" : u.role === "Funcionario" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${u.status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Activo" ? "bg-green-600" : "bg-red-600"}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => startEdit(u)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#c5c6cf] rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                        ✏️ Editar
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#c5c6cf] shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <h3 className="font-semibold text-lg text-black">Editar Perfil de Usuario</h3>
            <div className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nombre Completo *</label>
                <input value={editName} onChange={e => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">RUT *</label>
                <input value={editRut} onChange={e => setEditRut(e.target.value)}
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black font-mono" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Correo Electrónico *</label>
                <input value={editEmail} onChange={e => setEditEmail(e.target.value)} type="email"
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Rol / Perfil</label>
                  <select value={editRole} onChange={e => setEditRole(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
                    <option value="Ciudadano">Ciudadano</option>
                    <option value="Funcionario">Funcionario</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Estado</label>
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setEditingUser(null)}
                className="px-4 py-2 border border-[#c5c6cf] rounded-lg text-sm text-[#44474e] hover:bg-gray-50">Cancelar</button>
              <button onClick={handleUpdate}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">Actualizar</button>
            </div>
          </div>
        </div>
      )}

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onConfirm={(fmt) => {
        setIsExportOpen(false);
        toast.success(`Listado de usuarios exportado en formato ${fmt.toUpperCase()} con éxito.`);
      }} />
    </div>
  );
}

// ─── GENERACIÓN DE REPORTES ───────────────────────────────────────
function ReportesScreen({ onNavigate, onLogout }: { onNavigate: (view: View) => void; onLogout: () => void }) {
  const [reportType, setReportType] = useState("transitos");
  const [dateDesde, setDateDesde] = useState("2026-06-01");
  const [dateHasta, setDateHasta] = useState("2026-06-22");
  const [paso, setPaso] = useState("todos");
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  function handleGenerate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGeneratedData({
        title: reportType === "transitos" ? "Tránsitos por Tipo de Vehículo" 
               : reportType === "alertas" ? "Alertas de Riesgo Detectadas" 
               : reportType === "inspecciones" ? "Inspecciones de Andén"
               : "Declaraciones Sanitarias SAG",
        dateRange: `Desde ${dateDesde} hasta ${dateHasta}`,
        paso: paso === "todos" ? "Todos los Pasos Fronterizos" : paso === "libertadores" ? "Paso Los Libertadores" : "Paso Pehuenche",
        total: reportType === "transitos" ? 1492 : reportType === "alertas" ? 84 : reportType === "inspecciones" ? 920 : 341,
        items: reportType === "transitos" ? [
          { label: "Automóviles", count: 850, pct: "57%" },
          { label: "Camionetas", count: 420, pct: "28%" },
          { label: "Motos", count: 120, pct: "8%" },
          { label: "Minibuses / Furgones", count: 102, pct: "7%" },
        ] : reportType === "alertas" ? [
          { label: "Rojo (Crítico - Placa Encargo Robo)", count: 12, pct: "14%" },
          { label: "Naranja (Menores sin autorización notarial)", count: 32, pct: "38%" },
          { label: "Amarillo (Discrepancia datos declarados)", count: 40, pct: "48%" },
        ] : reportType === "inspecciones" ? [
          { label: "Aprobados en Andén Primario", count: 850, pct: "92%" },
          { label: "Retenidos para control", count: 45, pct: "5%" },
          { label: "Derivados a Fosa Secundaria", count: 25, pct: "3%" },
        ] : [
          { label: "Productos de Origen Vegetal", count: 180, pct: "53%" },
          { label: "Productos de Origen Animal", count: 110, pct: "32%" },
          { label: "Mascotas Reguladas (SAG/Sanitarios)", count: 51, pct: "15%" },
        ]
      });
      toast.success("Reporte estadístico generado correctamente.");
    }, 800);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="reportes" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-3xl text-black tracking-tight">Centro de Reportes y Estadísticas</h1>
          <p className="text-[#545f72] text-base mt-1">Configure parámetros para generar análisis consolidados de los flujos fronterizos.</p>
        </div>

        <div className="grid grid-cols-4 gap-6 bg-white p-5 rounded-xl border border-[#c5c6cf] shadow-sm">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-700 mb-1.5">Tipo de Reporte *</label>
            <select value={reportType} onChange={e => { setReportType(e.target.value); setGeneratedData(null); }}
              className="bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
              <option value="transitos">Tránsitos por Tipo de Vehículo</option>
              <option value="alertas">Alertas de Riesgo Detectadas</option>
              <option value="inspecciones">Inspecciones de Andén</option>
              <option value="sag">Declaraciones Sanitarias SAG</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-700 mb-1.5">Paso Fronterizo</label>
            <select value={paso} onChange={e => { setPaso(e.target.value); setGeneratedData(null); }}
              className="bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
              <option value="todos">Todos los Pasos</option>
              <option value="libertadores">Paso Los Libertadores</option>
              <option value="pehuenche">Paso Pehuenche</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-700 mb-1.5">Fecha Desde *</label>
            <input type="date" value={dateDesde} onChange={e => { setDateDesde(e.target.value); setGeneratedData(null); }}
              className="bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
          </div>

          <div className="flex flex-col justify-end">
            <button onClick={handleGenerate} disabled={loading}
              className="bg-black text-white py-2 px-5 rounded-lg text-sm font-bold shadow hover:bg-gray-800 transition-colors disabled:bg-gray-400 h-9 flex items-center justify-center cursor-pointer border-none">
              {loading ? "Generando..." : "📊 Generar Reporte"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white border border-[#c5c6cf] rounded-xl shadow-sm">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500">Procesando y consolidando métricas históricas...</p>
          </div>
        )}

        {generatedData && !loading && (
          <div className="bg-white rounded-xl border border-[#c5c6cf] shadow-sm p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start border-b pb-4 border-[#c5c6cf]">
              <div>
                <h3 className="text-2xl font-bold text-black">{generatedData.title}</h3>
                <div className="flex gap-4 text-xs text-[#545f72] font-semibold mt-1">
                  <span>📅 {generatedData.dateRange}</span>
                  <span>📍 {generatedData.paso}</span>
                </div>
              </div>
              <button onClick={() => setIsExportOpen(true)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 shadow transition-colors cursor-pointer border-none">
                📥 Exportar Reporte
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 bg-[#fbf8fc] rounded-lg p-5 border border-[#c5c6cf] flex flex-col justify-center">
                <span className="text-xs font-bold text-[#545f72] uppercase tracking-wider">TOTAL REGISTROS</span>
                <span className="text-5xl font-extrabold text-black tracking-tight mt-2">{generatedData.total}</span>
                <span className="text-xs text-green-700 font-bold mt-1.5">✓ 100% Integridad de datos</span>
              </div>

              <div className="col-span-2 border border-[#c5c6cf] rounded-lg p-5 flex flex-col gap-4">
                <h4 className="font-bold text-sm text-gray-700">Desglose Estadístico</h4>
                <div className="flex flex-col gap-3">
                  {generatedData.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-800">{item.label}</span>
                        <span className="font-bold text-black">{item.count} ({item.pct})</span>
                      </div>
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-black h-full rounded-full" style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onConfirm={(fmt) => {
        setIsExportOpen(false);
        toast.success(`Reporte de ${generatedData.title} exportado en formato ${fmt.toUpperCase()} con éxito.`);
      }} />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<View>("login");
  const [userType, setUserType] = useState<UserType>("ciudadano");
  const [userName, setUserName] = useState("Juan Pérez");
  const [vehicle, setVehicle] = useState<VehicleData>({ patente: "", pais: "Chile", marca: "", modelo: "", anio: "2024", vin: "" });
  const [minors, setMinors] = useState<Minor[]>([]);
  const [hasPets, setHasPets] = useState(false);
  const [inspectPatente, setInspectPatente] = useState("");

  // Nuevos estados para los trámites extendidos
  const [tipoTramite, setTipoTramite] = useState<"vehiculo" | "sag" | "mascotas" | "mercancias">("vehiculo");
  const [sagVegetal, setSagVegetal] = useState(false);
  const [sagVegetalDetalle, setSagVegetalDetalle] = useState("");
  const [sagAnimal, setSagAnimal] = useState(false);
  const [sagAnimalDetalle, setSagAnimalDetalle] = useState("");
  const [mascotaData, setMascotaData] = useState({ nombre: "", tipo: "Perro", raza: "", microchip: "", certificado: "", origen: "Argentina" });
  const [mercancias, setMercancias] = useState<{ id: string; descripcion: string; cantidad: number; valor: number }[]>([]);

  useEffect(() => {
    (window as any).setSiafView = setView;
    (window as any).setSiafUserType = setUserType;
    (window as any).setSiafHasPets = setHasPets;
    (window as any).setSiafTipoTramite = setTipoTramite;
    (window as any).setSiafVehicle = setVehicle;
    (window as any).setSiafMinors = setMinors;
    (window as any).setSiafMascotaData = setMascotaData;
    (window as any).setSiafMercancias = setMercancias;
    (window as any).setSiafSagData = (vegetal: boolean, vegDet: string, animal: boolean, animDet: string) => {
      setSagVegetal(vegetal);
      setSagVegetalDetalle(vegDet || "");
      setSagAnimal(animal);
      setSagAnimalDetalle(animDet || "");
    };
  }, []);

  function handleLogin(type: UserType, rut: string) {
    setUserType(type);
    setUserName(rut === "12.345.678-9" ? "Juan Pérez" : rut);
    if (type === "funcionario") setView("panel");
    else setView("dashboard");
  }

  return (
    <div className="size-full min-h-screen" style={{ fontFamily: "Inter,sans-serif" }}>
      {view === "login" && (
        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={() => setView("recuperar")}
          onRegister={() => setView("registro-usuario")}
          onClaveUnica={() => setView("clave-unica")}
        />
      )}
      {view === "clave-unica" && (
        <ClaveUnicaScreen onComplete={() => handleLogin("ciudadano", "12.345.678-9")} />
      )}
      {view === "recuperar" && (
        <RecuperarScreen onBack={() => setView("login")} />
      )}
      {view === "registro-usuario" && (
        <RegistroUsuarioScreen onBack={() => setView("login")} onComplete={() => setView("login")} />
      )}
      {view === "dashboard" && (
        <DashboardCiudadano
          userName={userName}
          onStartTramite={(targetView) => {
            setTipoTramite(
              targetView === "vehiculo" ? "vehiculo" :
              targetView === "declaracion-sag" ? "sag" :
              targetView === "registro-mascotas" ? "mascotas" : "mercancias"
            );
            setView(targetView);
          }}
          onLogout={() => setView("login")}
        />
      )}
      {view === "vehiculo" && (
        <RegistroVehiculoScreen
          onNext={() => setView("grupo")}
          onBack={() => setView("dashboard")}
          onLogout={() => setView("login")}
          data={vehicle}
          setData={setVehicle}
          hasPets={hasPets}
        />
      )}
      {view === "grupo" && (
        <RegistroGrupoScreen
          onNext={() => setView("declaracion-sag")}
          onBack={() => setView("vehiculo")}
          onLogout={() => setView("login")}
          minors={minors}
          setMinors={setMinors}
          hasPets={hasPets}
          setHasPets={setHasPets}
        />
      )}
      {view === "declaracion-sag" && (
        <DeclaracionSagScreen
          onNext={() => setView(hasPets ? "registro-mascotas" : "declaracion-mercancias")}
          onBack={() => setView("grupo")}
          onLogout={() => setView("login")}
          sagVegetal={sagVegetal}
          setSagVegetal={setSagVegetal}
          sagVegetalDetalle={sagVegetalDetalle}
          setSagVegetalDetalle={setSagVegetalDetalle}
          sagAnimal={sagAnimal}
          setSagAnimal={setSagAnimal}
          sagAnimalDetalle={sagAnimalDetalle}
          setSagAnimalDetalle={setSagAnimalDetalle}
          hasPets={hasPets}
        />
      )}
      {view === "registro-mascotas" && (
        <RegistroMascotasScreen
          onNext={() => setView("declaracion-mercancias")}
          onBack={() => setView("declaracion-sag")}
          onLogout={() => setView("login")}
          mascotaData={mascotaData}
          setMascotaData={setMascotaData}
          hasPets={hasPets}
        />
      )}
      {view === "declaracion-mercancias" && (
        <DeclaracionMercanciasScreen
          onNext={() => setView("comprobante")}
          onBack={() => setView(hasPets ? "registro-mascotas" : "declaracion-sag")}
          onLogout={() => setView("login")}
          mercancias={mercancias}
          setMercancias={setMercancias}
          hasPets={hasPets}
        />
      )}
      {view === "comprobante" && (
        <ComprobanteScreen
          onHome={() => setView("dashboard")}
          tipoTramite={tipoTramite}
          vehicle={vehicle}
          hasPets={hasPets}
          sagData={{ sagVegetal, sagVegetalDetalle, sagAnimal, sagAnimalDetalle }}
          mascotaData={mascotaData}
          mercancias={mercancias}
          minors={minors}
        />
      )}
      {view === "panel" && (
        <PanelControlScreen
          onInspect={(id, patente) => { setInspectPatente(patente); setView("inspeccion"); }}
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
        />
      )}
      {view === "inspeccion" && (
        <InspeccionScreen
          patente={inspectPatente}
          onBack={() => setView("panel")}
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
        />
      )}
      {view === "auditoria" && (
        <AuditoriaScreen onNavigate={(targetView) => setView(targetView)} onLogout={() => setView("login")} />
      )}
      {view === "usuarios" && (
        <UsuariosScreen onNavigate={(targetView) => setView(targetView)} onLogout={() => setView("login")} />
      )}
      {view === "reportes" && (
        <ReportesScreen onNavigate={(targetView) => setView(targetView)} onLogout={() => setView("login")} />
      )}
    </div>
  );
}
