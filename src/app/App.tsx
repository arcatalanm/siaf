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
// Shared officer navigation bar
function OfficerHeader({
  active, onNavigate, onLogout, officerRole, setOfficerRole
}: {
  active: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  officerRole: "aduana" | "pdi" | "sag" | "admin";
  setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void;
}) {
  const profileInfo = {
    aduana: { name: "Inspector SNA - J. Valenzuela", dept: "SNA - ADUANAS CHILE", avatar: imgOfficerAvatar, roleLabel: "FISCALIZADOR ADUANERO" },
    pdi: { name: "Agente PDI - D. Rebaza", dept: "POLICÍA DE INVESTIGACIONES", avatar: imgOfficerPDI, roleLabel: "CONTROL MIGRATORIO" },
    sag: { name: "Inspector SAG - V. Orellana", dept: "SAG - SILVOAGROPECUARIO", avatar: imgOfficerAvatar, roleLabel: "INSPECCIÓN SANITARIA" },
    admin: { name: "Administrador - Soporte SIAF", dept: "DEPARTAMENTO DE TI", avatar: imgOfficerAvatar, roleLabel: "SOPORTE Y SISTEMAS" }
  };
  const currentProfile = profileInfo[officerRole] || profileInfo.aduana;

  const allTabs = [
    { key: "panel",     label: "Panel Control",    onClick: () => onNavigate("panel"), allowed: ["aduana", "pdi", "sag"] },
    { key: "usuarios",  label: "Gestión Usuarios", onClick: () => onNavigate("usuarios"), allowed: ["admin"] },
    { key: "reportes",  label: "Reportes",         onClick: () => onNavigate("reportes"), allowed: ["aduana", "pdi", "sag"] },
    { key: "auditoria", label: "Auditoría / Logs",  onClick: () => onNavigate("auditoria"), allowed: ["pdi", "admin"] },
  ];
  const activeTabs = allTabs.filter(tab => tab.allowed.includes(officerRole));

  return (
    <header className="bg-white border-b border-[#c5c6cf] h-16 flex items-center justify-between px-10 z-20 shrink-0 sticky top-0">
      <div className="flex items-center gap-8">
        <span className="font-black text-xl text-black tracking-tight flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-[#031636]">
            <path d="M16 4L4 10v6c0 7.18 5.14 13.9 12 15.5C22.86 29.9 28 23.18 28 16v-6L16 4z"
              stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
            <path d="M11 16l3.5 3.5L21 12" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SIAF
        </span>
        <nav className="flex items-center gap-1">
          {activeTabs.map(item => (
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
        {/* Simular Rol Selector (para evaluación del prototipo) */}
        <div className="flex items-center gap-2 bg-[#f5f3f7] rounded-lg px-3 py-1.5 border border-[#c5c6cf]">
          <span className="text-[10px] font-bold text-[#44474e] uppercase tracking-[0.5px]">Simular Rol:</span>
          <select value={officerRole} onChange={e => {
            const val = e.target.value as any;
            setOfficerRole(val);
            if (val === "admin") {
              onNavigate("usuarios");
            } else {
              onNavigate("panel");
            }
          }} className="bg-transparent text-xs font-bold text-black border-none outline-none cursor-pointer">
            <option value="aduana">Aduanas (SNA)</option>
            <option value="pdi">PDI</option>
            <option value="sag">SAG</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="w-px h-8 bg-[#c5c6cf]" />

        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 20a2 2 0 002-2H6a2 2 0 002 2zm6-6V9c0-3.07-1.64-5.64-4.5-6.32V2a1.5 1.5 0 10-3 0v.68C3.63 3.36 2 5.92 2 9v5l-2 2v1h16v-1l-2-2z" fill="#44474E" />
          </svg>
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>
        <div className="w-px h-8 bg-[#c5c6cf]" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-sm text-[#1b1b1e]">{currentProfile.name}</p>
            <p className="text-[#44474e] text-xs font-bold uppercase tracking-[0.5px]">{currentProfile.roleLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cf] bg-gray-100 flex items-center justify-center">
            <img src={currentProfile.avatar} alt="Officer" className="w-full h-full object-cover" />
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
  onLogin: (type: UserType, rut: string, role?: "aduana" | "pdi" | "sag" | "admin", country?: string) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  onClaveUnica: () => void;
}) {
  const [rut, setRut] = useState("");
  const [pwd, setPwd] = useState("");
  const [procedencia, setProcedencia] = useState("Chile");
  const [docType, setDocType] = useState("Pasaporte");
  const [docNum, setDocNum] = useState("");

  const [instMode, setInstMode] = useState(false);
  const [instRut, setInstRut] = useState("");
  const [instPwd, setInstPwd] = useState("");
  const [selectedOfficerRole, setSelectedOfficerRole] = useState<"aduana" | "pdi" | "sag" | "admin">("aduana");
  const [activeModal, setActiveModal] = useState<"tramites" | "pasos" | "ayuda" | null>(null);

  function handleCitizenSubmit() {
    if (procedencia === "Chile") {
      if (!rut.trim() || !pwd.trim()) { toast.error("Ingrese RUT y contraseña"); return; }
      toast.success("Autenticando...");
      setTimeout(() => onLogin("ciudadano", rut, undefined, "Chile"), 900);
    } else {
      if (!docNum.trim() || !pwd.trim()) { toast.error("Ingrese número de documento y contraseña"); return; }
      toast.success(`Autenticando pasajero extranjero (${procedencia})...`);
      setTimeout(() => onLogin("ciudadano", docNum, undefined, procedencia), 900);
    }
  }

  function handleOfficerSubmit() {
    if (!instRut.trim() || !instPwd.trim()) { toast.error("Ingrese sus credenciales institucionales"); return; }
    toast.success("Verificando credenciales institucionales...");
    setTimeout(() => onLogin("funcionario", instRut, selectedOfficerRole), 900);
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
          <p className="text-gray-500 text-sm mb-6">Seleccione su país de origen e inicie sesión.</p>

          {/* Selector de país de procedencia */}
          <div className="mb-6">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">País de Procedencia / Origen</label>
            <select value={procedencia} onChange={e => setProcedencia(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors bg-white font-medium">
              <option value="Chile">Chile (Ingreso / Salida)</option>
              <option value="Argentina">Argentina (Turista extranjero)</option>
              <option value="Perú">Perú (Turista extranjero)</option>
              <option value="Bolivia">Bolivia (Turista extranjero)</option>
              <option value="Otro">Otro País (Turista extranjero)</option>
            </select>
          </div>

          {/* ClaveÚnica button */}
          <button onClick={onClaveUnica} disabled={procedencia !== "Chile"}
            className={`w-full text-white rounded-lg p-4 flex items-center justify-between mb-6 transition-colors
              ${procedencia === "Chile" ? "bg-[#0056b2] hover:bg-[#004494]" : "bg-gray-300 cursor-not-allowed opacity-50"}`}>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.5a2 2 0 110 4 2 2 0 010-4zm0 8c-2.33 0-7 1.17-7 3.5V18h14v-1c0-2.33-4.67-3.5-7-3.5z" fill="white" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white/70 text-xs font-bold uppercase tracking-wider">INGRESAR CON</p>
                <p className="text-white text-lg font-bold">ClaveÚnica {procedencia !== "Chile" && "(Solo Chilenos)"}</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">O MEDIANTE CREDENCIALES</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="space-y-5">
            {procedencia === "Chile" ? (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">RUT Ciudadano</label>
                <input value={rut} onChange={e => setRut(e.target.value)} placeholder="12.345.678-9"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">Tipo de Documento</label>
                  <select value={docType} onChange={e => setDocType(e.target.value)}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors bg-white">
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="DNI">DNI / Cédula</option>
                    <option value="Otro">Otro Documento</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">Número de Documento</label>
                  <input value={docNum} onChange={e => setDocNum(e.target.value)} placeholder="Ej: ARG987654"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-[#031636] transition-colors" />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.5px]">Contraseña</label>
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
            <span className="text-xs text-gray-400">RF-09 / RF-11</span>
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
                <label className="text-xs font-bold text-white/60 uppercase tracking-[0.5px]">Rol / Institución</label>
                <select value={selectedOfficerRole} onChange={e => setSelectedOfficerRole(e.target.value as any)}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors">
                  <option value="aduana" className="bg-[#0f172a] text-white">Aduana (SNA)</option>
                  <option value="pdi" className="bg-[#0f172a] text-white">PDI (Policía de Investigaciones)</option>
                  <option value="sag" className="bg-[#0f172a] text-white">SAG (Servicio Agrícola y Ganadero)</option>
                  <option value="admin" className="bg-[#0f172a] text-white">Administrador del Sistema</option>
                </select>
              </div>
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
function DashboardCiudadano({ userName, onStartTramite, onLogout, userCountry }: {
  userName: string; onStartTramite: (view: View) => void; onLogout: () => void; userCountry?: string;
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

        {userCountry && userCountry !== "Chile" && (
          <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-xl px-6 py-4 flex items-center justify-between mb-2 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌎</span>
              <div>
                <p className="font-bold text-[#7c2d12] text-sm">Perfil de Viajero Extranjero ({userCountry})</p>
                <p className="text-[#9a3412] text-xs">Su pre-declaración facilitará el ingreso temporal de su vehículo y pertenencias a Chile (Admisión Temporal - RF-02).</p>
              </div>
            </div>
            <span className="text-xs bg-[#ffedd5] text-[#9a3412] font-black px-2.5 py-1 rounded">TRÁMITE DE ADMISIÓN</span>
          </div>
        )}

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
// ─── PANEL DE CONTROL ─────────────────────────────────────────────
const ADUANA_DATA = [
  { id: "1", time: "08:15:30", patente: "KJ-PR-42", folio: "SNA-90211833-K", tipoVehiculo: "Camión de Carga Pesada", origen: "Terminal Mendoza (AR)", plazo: "Temporal (90 días)", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "2", time: "09:22:45", patente: "LX-29-33", folio: "SNA-87661290-A", tipoVehiculo: "Furgón de Carga", origen: "San Juan (AR)", plazo: "Temporal (180 días)", qr: "CADUCADO" as const, risk: 3 as const },
  { id: "3", time: "10:10:12", patente: "BP-HS-99", folio: "SNA-11223344-Z", tipoVehiculo: "Motocicleta Tourer", origen: "Rosario (AR)", plazo: "Temporal (90 días)", qr: "PROCESANDO" as const, risk: 2 as const },
  { id: "4", time: "10:45:05", patente: "TY-01-20", folio: "SNA-55443322-B", tipoVehiculo: "Sedán Particular", origen: "Córdoba (AR)", plazo: "Indefinido (Nacional)", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "5", time: "11:05:18", patente: "MN-67-FD", folio: "SNA-99887766-C", tipoVehiculo: "Camioneta 4x4", origen: "Neuquén (AR)", plazo: "Temporal (90 días)", qr: "VÁLIDO" as const, risk: 1 as const },
  { id: "6", time: "11:58:40", patente: "XR-44-PQ", folio: "SNA-77441199-F", tipoVehiculo: "Autobús Turístico", origen: "Buenos Aires (AR)", plazo: "Temporal (30 días)", qr: "CADUCADO" as const, risk: 3 as const },
];

const PDI_PASSENGER_DATA = [
  { id: "101", time: "08:18:22", pasajero: "Roberto Santillán", documento: "PAS: AR-9921448", nacionalidad: "Argentina", autorizacionMenores: "No Aplica", antecedentes: "Sin Antecedentes", estado: "Aprobado", patente: "KJ-PR-42" },
  { id: "102", time: "09:25:01", pasajero: "Florencia de la Vega", documento: "DNI: 41.229.110", nacionalidad: "Argentina", autorizacionMenores: "Válida (Notaría AR-4491)", antecedentes: "Alerta - Orden de Arraigo (RF-04)", estado: "Rechazado", patente: "LX-29-33" },
  { id: "103", time: "10:14:55", pasajero: "Sofía Martínez (Menor)", documento: "PAS: CL-8821902", nacionalidad: "Chilena", autorizacionMenores: "Pendiente (Falta firma de tutor)", antecedentes: "Sin Antecedentes", estado: "En Control", patente: "BP-HS-99" },
  { id: "104", time: "10:48:30", pasajero: "Hans Müller", documento: "PAS: DE-G5582910", nacionalidad: "Alemana", autorizacionMenores: "No Aplica", antecedentes: "Sin Antecedentes", estado: "Aprobado", patente: "TY-01-20" },
  { id: "105", time: "11:08:12", pasajero: "Carlos Villagrán", documento: "RUT: 14.229.581-K", nacionalidad: "Chilena", autorizacionMenores: "Válida (ClaveÚnica)", antecedentes: "En Consulta Central Interpol", estado: "En Control", patente: "MN-67-FD" },
  { id: "106", time: "12:02:15", pasajero: "Ana María Rossi", documento: "DNI: 35.882.119", nacionalidad: "Argentina", autorizacionMenores: "No Aplica", antecedentes: "Sin Antecedentes", estado: "Aprobado", patente: "XR-44-PQ" },
];

const SAG_DECLARATIONS_DATA = [
  { id: "201", time: "08:20:10", declarante: "Héctor Valdés", documento: "RUT: 11.456.982-1", organicosDeclarados: "Semillas de Alfalfa y Manzanas (Retenido)", mascotasDeclaradas: "Ninguna", estado: "Retenido para revisión", patente: "KJ-PR-42" },
  { id: "202", time: "09:30:14", declarante: "Silvia Domínguez", documento: "DNI: 29.881.420", organicosDeclarados: "No declara orgánicos", mascotasDeclaradas: "1 Perro (Golden Retriever - Vacuna antirrábica OK)", estado: "Verificado SAG", patente: "LX-29-33" },
  { id: "203", time: "10:18:05", declarante: "Federico Chiesa", documento: "PAS: IT-9944112", organicosDeclarados: "Madera tallada artesanal y flores silvestres", mascotasDeclaradas: "Ninguna", estado: "Retenido para revisión", patente: "BP-HS-99" },
  { id: "204", time: "10:52:12", declarante: "Gerardo Soto", documento: "RUT: 15.331.420-5", organicosDeclarados: "Alimentos envasados rotulados", mascotasDeclaradas: "Ninguna", estado: "Aprobado Automático", patente: "TY-01-20" },
  { id: "205", time: "11:12:44", declarante: "Romina Escalona", documento: "DNI: 32.145.892", organicosDeclarados: "No declara orgánicos", mascotasDeclaradas: "1 Gato (Mestizo - Certificado Zoosanitario SENASA)", estado: "Verificado SAG", patente: "MN-67-FD" },
  { id: "206", time: "12:05:00", declarante: "Javier Zanetti", documento: "PAS: AR-2299110", organicosDeclarados: "Frutos secos procesados y miel casera (Retenida)", mascotasDeclaradas: "Ninguna", estado: "Retenido para revisión", patente: "XR-44-PQ" },
];

const ADMIN_EVENTS_DATA = [
  { id: "301", time: "07:30:15", usuario: "Soporte SIAF (Admin)", accion: "Depuración base de datos temporal", modulo: "Módulo Infraestructura", ip: "192.168.1.10", estado: "Exitoso" },
  { id: "302", time: "08:42:01", usuario: "J. Valenzuela (Aduana)", accion: "Aprobación de Admisión Temporal (Patente: KJ-PR-42)", modulo: "SNA Módulo de Tránsitos", ip: "192.168.10.45", estado: "Exitoso" },
  { id: "303", time: "09:55:00", usuario: "V. Orellana (SAG)", accion: "Registro de Mascota - Chip Verificado (RF-12)", modulo: "SAG Módulo Animal", ip: "192.168.10.22", estado: "Exitoso" },
  { id: "304", time: "10:15:30", usuario: "D. Rebaza (PDI)", accion: "Firma de Aprobación Migratoria (Tomás Fuentes)", modulo: "PDI Módulo Filiación", ip: "192.168.10.8", estado: "Exitoso" },
  { id: "305", time: "10:38:22", usuario: "Intruso Externo", accion: "Intento Login Fallido - IP Bloqueada automáticamente (RF-09)", modulo: "Portal Autenticación", ip: "190.22.45.19", estado: "Bloqueado" },
];

function PanelControlScreen({ onInspect, onNavigate, onLogout, officerRole, setOfficerRole }: {
  onInspect: (id: string, patente: string) => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  officerRole: "aduana" | "pdi" | "sag" | "admin";
  setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void;
}) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Local interactive states for each agency
  const [aduanaData, setAduanaData] = useState(ADUANA_DATA);
  const [pdiData, setPdiData] = useState(PDI_PASSENGER_DATA);
  const [sagData, setSagData] = useState(SAG_DECLARATIONS_DATA);

  // Agency-specific workflows states
  const [selectedAduanaQrRow, setSelectedAduanaQrRow] = useState<any | null>(null);

  const [pdiCheckingRow, setPdiCheckingRow] = useState<any | null>(null);
  const [interpolProgress, setInterpolProgress] = useState(0);
  const [interpolFinished, setInterpolFinished] = useState(false);

  const [sagXrayRow, setSagXrayRow] = useState<any | null>(null);
  const [xrayProgress, setXrayProgress] = useState(0);
  const [xrayFinished, setXrayFinished] = useState(false);

  // Simulated Interpol Background Check timer
  useEffect(() => {
    if (!pdiCheckingRow) {
      setInterpolProgress(0);
      setInterpolFinished(false);
      return;
    }
    setInterpolProgress(0);
    setInterpolFinished(false);
    let cur = 0;
    const interval = setInterval(() => {
      cur += 20;
      setInterpolProgress(cur);
      if (cur >= 100) {
        clearInterval(interval);
        setInterpolFinished(true);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [pdiCheckingRow]);

  // Simulated SAG X-Ray Luggage Scanner timer
  useEffect(() => {
    if (!sagXrayRow) {
      setXrayProgress(0);
      setXrayFinished(false);
      return;
    }
    setXrayProgress(0);
    setXrayFinished(false);
    let cur = 0;
    const interval = setInterval(() => {
      cur += 25;
      setXrayProgress(cur);
      if (cur >= 100) {
        clearInterval(interval);
        setXrayFinished(true);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [sagXrayRow]);

  // Apply search query filters over state values
  const filteredAduana = aduanaData.filter(r =>
    r.patente.toLowerCase().includes(search.toLowerCase()) ||
    r.folio.toLowerCase().includes(search.toLowerCase()) ||
    r.origen.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPdi = pdiData.filter(r =>
    r.pasajero.toLowerCase().includes(search.toLowerCase()) ||
    r.documento.toLowerCase().includes(search.toLowerCase()) ||
    r.nacionalidad.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSag = sagData.filter(r =>
    r.declarante.toLowerCase().includes(search.toLowerCase()) ||
    r.documento.toLowerCase().includes(search.toLowerCase()) ||
    r.organicosDeclarados.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAdmin = ADMIN_EVENTS_DATA.filter(r =>
    r.usuario.toLowerCase().includes(search.toLowerCase()) ||
    r.accion.toLowerCase().includes(search.toLowerCase()) ||
    r.modulo.toLowerCase().includes(search.toLowerCase()) ||
    r.ip.toLowerCase().includes(search.toLowerCase())
  );

  const getFilteredCount = () => {
    switch (officerRole) {
      case "pdi": return filteredPdi.length;
      case "sag": return filteredSag.length;
      case "admin": return filteredAdmin.length;
      case "aduana":
      default:
        return filteredAduana.length;
    }
  };

  const qrColor = { "VÁLIDO": "green", "CADUCADO": "red", "PROCESANDO": "blue" } as const;

  const getStats = () => {
    switch (officerRole) {
      case "pdi":
        return [
          { label: "Menores en Tránsito", value: "14", sub: "Todos pre-validados", subColor: "#16a34a", iconBg: "#D8E2FF" },
          { label: "Alertas de Riesgo (RF-15)", value: "03", sub: "PRIORIDAD CRÍTICA", subColor: "#ba1a1a", iconBg: "#FFDAD6", critical: true },
          { label: "Background Checks PDI", value: "1,240", sub: "Automáticos OK", subColor: "#7384a9", iconBg: "#D8E3FA" },
          { label: "Revisado Hoy (PDI)", value: "48", progress: 80, iconBg: "#E4E1E5" },
        ];
      case "sag":
        return [
          { label: "Declaraciones SAG (RF-07)", value: "341", sub: "98% Online", subColor: "#16a34a", iconBg: "#D8E2FF" },
          { label: "Mascotas Registradas (RF-12)", value: "51", sub: "Certificado verificado", subColor: "#7384a9", iconBg: "#D8E3FA" },
          { label: "Productos Retenidos (SAG)", value: "12", sub: "Inspecciones de andén", subColor: "#ba1a1a", iconBg: "#FFDAD6", critical: true },
          { label: "Revisado Hoy (SAG)", value: "85", progress: 70, iconBg: "#E4E1E5" },
        ];
      case "admin":
        return [
          { label: "Total Usuarios Activos", value: "12", sub: "Admin / Cuentas", subColor: "#7384a9", iconBg: "#D8E2FF" },
          { label: "Integridad Logs (RF-19)", value: "100%", sub: "Verificación SHA-256", subColor: "#16a34a", iconBg: "#D8E3FA" },
          { label: "Intentos Login Fallidos", value: "01", sub: "IP bloqueada (RF-09)", subColor: "#ba1a1a", iconBg: "#FFDAD6", critical: true },
          { label: "Mantenimiento Sistema", value: "Estable", progress: 100, iconBg: "#E4E1E5" },
        ];
      case "aduana":
      default:
        return [
          { label: "Vehículos en espera", value: "124", sub: "+12% vs ayer", subColor: "#ba1a1a", iconBg: "#D8E2FF" },
          { label: "Tránsitos Aprobados (SNA)", value: "842", sub: "Lote 08:00–10:00", subColor: "#7384a9", iconBg: "#D8E3FA" },
          { label: "Alertas de Plazos (RF-06)", value: "05", sub: "90/180 días temporal", subColor: "#ba1a1a", iconBg: "#FFDAD6", critical: true },
          { label: "Tf. Promedio (mins)", value: "18.5", progress: 65, iconBg: "#E4E1E5" },
        ];
    }
  };

  const getAlerts = () => {
    switch (officerRole) {
      case "pdi":
        return [
          { p: "01 - CRÍTICA", t: "HACE 2 MIN", title: "Menor Tomás Fuentes: Autorización Notarial pendiente (RF-13)", bg: "bg-[#ffdad6]", border: "border-[#ba1a1a]", tc: "text-[#93000a]", action: "VERIFICAR PERMISO", as: "bg-[#ba1a1a] text-white", cb: () => toast.info("Redirigiendo a verificación notarial de menores...") },
          { p: "02 - ALTA", t: "HACE 15 MIN", title: "Background Check: Alerta de orden de arraigo inactiva (RF-04)", bg: "bg-[#fff7ed]", border: "border-orange-500", tc: "text-[#7c2d12]", action: "CONSULTAR ANTECEDENTES", as: "border border-orange-400 text-[#7c2d12] hover:bg-orange-50", cb: () => toast.warning("Solicitud de antecedentes enviada a PDI central") },
          { p: "03 - MEDIA", t: "HACE 42 MIN", title: "Control de Identidad: Discrepancia DNI Extranjero (RF-15)", bg: "bg-[#fef9c3]", border: "border-yellow-400", tc: "text-[#713f12]", action: "VERIFICAR DOCUMENTOS", as: "border border-yellow-400 text-[#713f12] hover:bg-yellow-50", cb: () => toast.info("Verificando datos con consulado") },
        ];
      case "sag":
        return [
          { p: "01 - CRÍTICA", t: "HACE 5 MIN", title: "Mascota ingresada sin certificado de vacuna antirrábica (RF-12)", bg: "bg-[#ffdad6]", border: "border-[#ba1a1a]", tc: "text-[#93000a]", action: "REVISAR CERTIFICADO", as: "bg-[#ba1a1a] text-white", cb: () => toast.error("Por favor verifique el certificado sanitario en la pestaña Mascotas.") },
          { p: "02 - ALTA", t: "HACE 18 MIN", title: "Declaración SAG: Pasajero declara frutos secos sin procesar (RF-07)", bg: "bg-[#fff7ed]", border: "border-orange-500", tc: "text-[#7c2d12]", action: "SOLICITAR INSPECCIÓN VEGETAL", as: "border border-orange-400 text-[#7c2d12] hover:bg-orange-50", cb: () => toast.warning("Inspector fitosanitario asignado al andén.") },
          { p: "03 - MEDIA", t: "HACE 1 HORA", title: "Declaración física requerida: discrepancia en escáner fitosanitario", bg: "bg-[#fef9c3]", border: "border-yellow-400", tc: "text-[#713f12]", action: "MARCAR PARA REVISIÓN", as: "border border-yellow-400 text-[#713f12] hover:bg-yellow-50", cb: () => toast.info("Equipaje marcado para revisión física.") },
        ];
      case "admin":
        return [
          { p: "01 - CRÍTICA", t: "HACE 10 MIN", title: "Intento fallido de login institucional (RUT 11.222.333-4) (RF-09)", bg: "bg-[#ffdad6]", border: "border-[#ba1a1a]", tc: "text-[#93000a]", action: "VER LOGS DE AUDITORÍA", as: "bg-[#ba1a1a] text-white", cb: () => onNavigate("auditoria") },
          { p: "02 - ALTA", t: "HACE 1 HORA", title: "Cambio de permisos de rol: Cuenta Vicente Orellana modificada (RF-20)", bg: "bg-[#fff7ed]", border: "border-orange-500", tc: "text-[#7c2d12]", action: "REVISAR CAMBIOS", as: "border border-orange-400 text-[#7c2d12] hover:bg-orange-50", cb: () => onNavigate("usuarios") },
        ];
      case "aduana":
      default:
        return [
          { p: "01 - CRÍTICA", t: "HACE 2 MIN", title: "Alerta de Plazo: Vehículo patente AR-22-LK expira hoy (90 días - RF-06)", bg: "bg-[#ffdad6]", border: "border-[#ba1a1a]", tc: "text-[#93000a]", action: "NOTIFICAR ADMISIÓN TEMPORAL", as: "bg-[#ba1a1a] text-white", cb: () => toast.error("Notificación enviada a Aduana de procedencia.") },
          { p: "02 - ALTA", t: "HACE 15 MIN", title: "Trazabilidad de Carga: Manifiesto #4422-X requiere pesaje (RF-16)", bg: "bg-[#fff7ed]", border: "border-orange-500", tc: "text-[#7c2d12]", action: "SOLICITAR REVISIÓN DE CARGA", as: "border border-orange-400 text-[#7c2d12] hover:bg-orange-50", cb: () => toast.warning("Revisión física solicitada") },
          { p: "03 - MEDIA", t: "HACE 42 MIN", title: "Placa Diplomática detectada: patente CD-2291 (RF-08)", bg: "bg-[#fef9c3]", border: "border-yellow-400", tc: "text-[#713f12]", action: "VER TRÁMITE DIPLOMÁTICO", as: "border border-yellow-400 text-[#713f12] hover:bg-yellow-50", cb: () => toast.info("Trámite diplomático validado automáticamente.") },
        ];
    }
  };

  const renewAduanaQr = (id: string) => {
    setAduanaData(prev => prev.map(row => {
      if (row.id === id) {
        return { ...row, plazo: "Temporal (180 días)", qr: "VÁLIDO" as const, risk: 1 as const };
      }
      return row;
    }));
  };

  const revokeAduanaQr = (id: string) => {
    setAduanaData(prev => prev.map(row => {
      if (row.id === id) {
        return { ...row, qr: "CADUCADO" as const, risk: 3 as const };
      }
      return row;
    }));
  };

  const updatePdiStatus = (id: string, newStatus: string) => {
    setPdiData(prev => prev.map(row => {
      if (row.id === id) {
        return { ...row, estado: newStatus };
      }
      return row;
    }));
  };

  const updateSagStatus = (id: string, newStatus: string) => {
    setSagData(prev => prev.map(row => {
      if (row.id === id) {
        return { ...row, estado: newStatus };
      }
      return row;
    }));
  };

  const renderTableContent = () => {
    switch (officerRole) {
      case "pdi":
        return (
          <div className="bg-[#0b1329] text-slate-100 p-6 min-h-[500px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-cyan-400">PDI Terminal de Control Biométrico y Migratorio</h3>
                <p className="text-xs text-slate-400">Verificación de alertas nacionales e internacionales, filiaciones y match biométrico (RF-13/RF-04)</p>
              </div>
              <button onClick={() => toast.success("Base de datos PDI exportada en archivo encriptado")} 
                className="bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-500/50 text-cyan-200 text-xs px-3 py-1.5 rounded font-bold cursor-pointer transition-colors">
                Exportar Logs PDI
              </button>
            </div>

            <div className="grid gap-4 mt-2">
              {filteredPdi.length === 0 ? (
                <p className="text-slate-500 text-center py-8 text-sm">No se encontraron pasajeros en control.</p>
              ) : (
                filteredPdi.map(row => {
                  const isRejected = row.estado === "Rechazado";
                  const isControl = row.estado === "En Control";
                  const isApproved = row.estado === "Aprobado";
                  
                  return (
                    <div key={row.id} className={`border rounded-lg p-4 transition-all duration-200 bg-[#0f1b35] 
                      ${isRejected ? "border-red-800/80 bg-red-955/10" : isControl ? "border-cyan-800/60" : "border-emerald-800/80 bg-emerald-955/10"}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded bg-[#1e2e4f] flex flex-col items-center justify-center text-xl shrink-0 border border-slate-700">
                            {row.pasajero.includes("Menor") ? "👦" : "👤"}
                            <span className="text-[8px] text-slate-400 font-mono mt-0.5">PDI</span>
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h4 className="font-bold text-slate-200 text-base">{row.pasajero}</h4>
                              <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-sm border border-slate-700">{row.nacionalidad}</span>
                              <span className="text-[10px] bg-cyan-900/40 text-cyan-300 border border-cyan-800/40 font-bold px-2 py-0.5 rounded-sm">INGRESO</span>
                            </div>
                            
                            <div className="mt-1 text-xs font-mono text-slate-400 space-y-1">
                              <div>DOC: <span className="text-slate-300">{row.documento}</span> | HORA: <span className="text-slate-300">{row.time}</span></div>
                              <div className="text-[10px] text-slate-550">MRZ: P&lt;CHL{row.pasajero.split(' ').map(n=>n[0]).join('')}&lt;&lt;&lt;{row.id}98271&lt;&lt;&lt;&lt;&lt;</div>
                            </div>

                            {/* Biometrics */}
                            <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-300 font-semibold bg-slate-900/60 px-3 py-1.5 rounded border border-slate-800 w-fit">
                              <span className="text-emerald-400 flex items-center gap-1">👤 Match Facial: 98.4%</span>
                              <span className="text-slate-500">|</span>
                              <span className="text-cyan-400 flex items-center gap-1">✋ Huella: Validada</span>
                              <span className="text-slate-500">|</span>
                              <span className="text-slate-400 font-sans">Autorización Menores: {row.autorizacionMenores}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 shrink-0">
                          <div className="text-right">
                            <span className={`text-xs font-black uppercase px-2 py-1 rounded inline-block font-mono
                              ${isRejected ? "bg-red-950 text-red-400 border border-red-800" : isControl ? "bg-cyan-950 text-cyan-400 border border-cyan-800" : "bg-emerald-950 text-emerald-400 border border-emerald-800"}`}>
                              {isRejected ? "🚨 RECHAZADO / DETENCIÓN" : isControl ? "🔍 EN CONTROL" : "✓ MIGRACIÓN APROBADA"}
                            </span>
                          </div>

                          <div className="flex gap-2 mt-1">
                            {isControl && (
                              <button onClick={() => setPdiCheckingRow(row)}
                                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3 py-2 rounded transition-colors cursor-pointer border-none font-mono">
                                Cotejar Interpol
                              </button>
                            )}
                            <button onClick={() => onInspect(row.id, row.patente)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-3 py-2 rounded transition-colors cursor-pointer">
                              Ejecutar Control
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      case "sag":
        // Group passengers into Green Channel vs Red Channel
        const greenChannel = filteredSag.filter(r => r.organicosDeclarados.includes("No declara") && r.mascotasDeclaradas.includes("Ninguna"));
        const redChannel = filteredSag.filter(r => !r.organicosDeclarados.includes("No declara") || !r.mascotasDeclaradas.includes("Ninguna"));

        return (
          <div className="bg-[#f0f4f1] text-[#1b3a24] p-6 min-h-[500px]">
            <div className="flex items-center justify-between border-b border-[#cbd5c0] pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#1b5e20]">SAG Terminal de Inspección Fitosanitaria</h3>
                <p className="text-xs text-[#4e6a54]">Control e ingreso de productos silvoagropecuarios, semillas y mascotas (RF-07/RF-12)</p>
              </div>
              <button onClick={() => toast.success("Declaraciones fitosanitarias exportadas para base de datos")} 
                className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-xs px-3 py-1.5 rounded font-bold border-none cursor-pointer transition-colors">
                Exportar SAG
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Green Channel Column */}
              <div className="bg-white rounded-xl p-4 border border-[#e0e7e1] shadow-sm flex flex-col">
                <div className="flex items-center gap-2 border-b border-[#e8efe9] pb-2 mb-3">
                  <span className="text-emerald-600 text-lg">🟢</span>
                  <h4 className="font-bold text-sm uppercase text-[#2e7d32]">Canal Verde (Auto-Aprobación)</h4>
                  <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">{greenChannel.length} Pasajeros</span>
                </div>
                <div className="space-y-3 flex-1">
                  {greenChannel.length === 0 ? (
                    <p className="text-gray-400 text-center py-8 text-xs italic">No hay pasajeros en Canal Verde</p>
                  ) : (
                    greenChannel.map(row => {
                      const isApproved = row.estado === "Verificado SAG" || row.estado === "Aprobado Automático";
                      return (
                        <div key={row.id} className={`p-3 rounded-lg border transition-all ${isApproved ? "bg-emerald-50/40 border-emerald-200" : "bg-[#fcfdfc] border-gray-200"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-bold text-sm text-gray-800">{row.declarante}</h5>
                              <p className="text-xs text-gray-500 font-mono">{row.documento} | {row.time}</p>
                              <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block font-semibold">
                                ✓ No declara orgánicos ni mascotas
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className="text-[10px] text-emerald-700 font-bold">{row.estado}</span>
                              {!isApproved ? (
                                <button onClick={() => {
                                  updateSagStatus(row.id, "Aprobado Automático");
                                  toast.success(`✓ Pasajero ${row.declarante} aprobado y liberado por Canal Verde.`);
                                }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded border-none cursor-pointer transition-colors">
                                  Dar Pase Rápido
                                </button>
                              ) : (
                                <span className="text-emerald-600 font-bold text-xs">✓ Liberado</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Red Channel Column */}
              <div className="bg-white rounded-xl p-4 border border-[#f5e1e1] shadow-sm flex flex-col">
                <div className="flex items-center gap-2 border-b border-[#fceaea] pb-2 mb-3">
                  <span className="text-amber-600 text-lg">🔴</span>
                  <h4 className="font-bold text-sm uppercase text-amber-800">Canal Rojo (Revisión Fitosanitaria)</h4>
                  <span className="ml-auto text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">{redChannel.length} En cola</span>
                </div>
                <div className="space-y-3 flex-1">
                  {redChannel.length === 0 ? (
                    <p className="text-gray-400 text-center py-8 text-xs italic">No hay pasajeros en Canal Rojo</p>
                  ) : (
                    redChannel.map(row => {
                      const isInspected = row.estado === "Verificado SAG" || row.estado === "Aprobado Automático";
                      const isRetained = row.estado.includes("Retenido");
                      
                      return (
                        <div key={row.id} className={`p-3 rounded-lg border transition-all ${isInspected ? "bg-emerald-50/40 border-emerald-200" : isRetained ? "bg-amber-50/40 border-amber-200" : "bg-[#fffcfc] border-red-200"}`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h5 className="font-bold text-sm text-gray-800">{row.declarante}</h5>
                              <p className="text-xs text-gray-550 font-mono">{row.documento} | {row.time}</p>
                              
                              <div className="text-[11px] space-y-1 mt-2">
                                <div className="text-gray-700">🌾 <span className="font-bold">Orgánicos:</span> <span className="text-amber-800 font-semibold">{row.organicosDeclarados}</span></div>
                                <div className="text-gray-700">🐾 <span className="font-bold">Mascotas:</span> <span className="text-emerald-800 font-semibold">{row.mascotasDeclaradas}</span></div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className={`text-[10px] font-bold ${isRetained ? "text-amber-700" : "text-emerald-700"}`}>{row.estado}</span>
                              <div className="flex flex-col gap-1 w-full">
                                {!isInspected && (
                                  <button onClick={() => setSagXrayRow(row)} 
                                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] px-2 py-1.5 rounded border-none cursor-pointer text-center font-mono">
                                    Rayos X Scanner
                                  </button>
                                )}
                                <button onClick={() => onInspect(row.id, row.patente)} 
                                  className="bg-gray-800 hover:bg-gray-700 text-white text-[10px] px-2 py-1.5 rounded border-none cursor-pointer text-center">
                                  Inspeccionar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case "admin":
        return (
          <>
            <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] px-4 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xl text-black">Consola de Administración y Auditoría</h3>
                <p className="text-sm text-[#44474e]">Monitoreo de seguridad, accesos de red y cumplimiento normativo (RF-19)</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onNavigate("auditoria")} className="bg-black text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800">Ver Logs de Auditoría →</button>
              </div>
            </div>
            <div className="p-4 bg-[#eae7eb]/20 border-b border-[#c5c6cf] flex items-center justify-around gap-4 text-center">
              <div className="flex-1 bg-white p-3 rounded-lg border border-[#c5c6cf] shadow-sm">
                <h4 className="font-bold text-[#1b1b1e] text-xs uppercase tracking-wider text-[#7384a9]">Usuarios en Sistema</h4>
                <p className="text-2xl font-black text-black mt-1">11 Activos</p>
                <button onClick={() => onNavigate("usuarios")} className="mt-2 text-xs font-semibold text-[#364669] hover:underline block mx-auto">Gestionar Cuentas →</button>
              </div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-[#c5c6cf] shadow-sm">
                <h4 className="font-bold text-[#1b1b1e] text-xs uppercase tracking-wider text-[#7384a9]">Firma Digital (RF-19)</h4>
                <p className="text-sm font-bold text-[#166534] mt-2">✓ ALMACENADO CON SHA-256</p>
                <button onClick={() => onNavigate("auditoria")} className="mt-2 text-xs font-semibold text-[#364669] hover:underline block mx-auto">Validar Logs →</button>
              </div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-[#c5c6cf] shadow-sm">
                <h4 className="font-bold text-[#1b1b1e] text-xs uppercase tracking-wider text-[#7384a9]">Seguridad de Red (RF-09)</h4>
                <p className="text-sm font-semibold text-[#ba1a1a] mt-2">MFA Habilitado en 100%</p>
                <button onClick={() => toast.info("Configuraciones de MFA y Firewall activadas en el gateway de aduanas.")} className="mt-2 text-xs font-semibold text-[#364669] hover:underline block mx-auto">Ver Firewall →</button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#eae7eb]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">HORA</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">USUARIO</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">ACCIÓN / EVENTO DE SEGURIDAD</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">MÓDULO</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-36">IP ORIGEN</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-28">ESTADO LOG</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmin.map(row => {
                  const estColor = row.estado === "Exitoso" ? "green" : "red";
                  return (
                    <tr key={row.id}
                      className={`border-t border-[#c5c6cf] hover:bg-gray-50 transition-colors ${row.estado === "Bloqueado" ? "bg-[rgba(255,218,214,0.05)]" : ""}`}>
                      <td className="px-4 py-5 text-sm text-[#1b1b1e] font-mono">{row.time}</td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-sm text-black">{row.usuario}</p>
                      </td>
                      <td className="px-4 py-5 text-sm font-semibold text-[#1b1b1e]">{row.accion}</td>
                      <td className="px-4 py-5 text-sm text-[#44474e]">{row.modulo}</td>
                      <td className="px-4 py-5 text-sm font-mono text-[#44474e]">{row.ip}</td>
                      <td className="px-4 py-5 text-right"><Badge color={estColor} label={row.estado} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      case "aduana":
      default:
        return (
          <>
            <div className="bg-[#f5f3f7] border-b border-[#c5c6cf] px-4 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xl text-black">Control de Tránsitos (SNA)</h3>
                <p className="text-sm text-[#44474e]">Registro de vehículos, manifiesto de carga (RF-16) y plazos legales (RF-06)</p>
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
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">VEHÍCULO / ORIGEN</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">PLAZO ADMISIÓN TEMPORAL (RF-06)</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px]">PRECINTO DE CARGA (RF-16)</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-36">ESTADO QR</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">RIESGO</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-[#44474e] uppercase tracking-[0.7px] w-24">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {filteredAduana.map(row => (
                  <tr key={row.id}
                    className={`border-t border-[#c5c6cf] hover:bg-gray-50 cursor-pointer transition-colors ${row.qr === "CADUCADO" ? "bg-[rgba(255,218,214,0.05)]" : ""}`}
                    onClick={() => onInspect(row.id, row.patente)}>
                    <td className="px-4 py-5 text-sm text-[#1b1b1e] font-mono">{row.time}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-base text-black">{row.patente}</p>
                      <p className="text-[#44474e] text-xs">{row.folio}</p>
                    </td>
                    <td className="px-4 py-5 text-sm text-[#1b1b1e]">
                      <p className="font-medium text-black">{row.tipoVehiculo}</p>
                      <p className="text-xs text-[#44474e]">{row.origen}</p>
                    </td>
                    <td className="px-4 py-5 text-sm">
                      <div className="flex flex-col gap-1 w-36">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit ${row.plazo.includes("Temporal") ? "bg-[#e0e2ec] text-[#44474e]" : "bg-[#dcfce7] text-[#166534]"}`}>
                          {row.plazo}
                        </span>
                        {row.plazo.includes("Temporal") && (
                          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mt-1">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: row.id === "1" ? "45%" : row.id === "2" ? "80%" : "60%" }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-xs">
                      <span className={`font-bold flex items-center gap-1.5 ${row.tipoVehiculo.includes("Camión") || row.tipoVehiculo.includes("Furgón de Carga") ? "text-blue-700" : "text-gray-400"}`}>
                        {row.tipoVehiculo.includes("Camión") || row.tipoVehiculo.includes("Furgón de Carga") ? (
                          <>
                            <span className="text-[10px] bg-blue-100 px-1.5 py-0.5 rounded-sm">🔒 CERRADO</span>
                            <span>Precinto #{3340 + Number(row.id)}</span>
                          </>
                        ) : "No Aplica"}
                      </span>
                    </td>
                    <td className="px-4 py-5 font-mono" onClick={(e) => { e.stopPropagation(); setSelectedAduanaQrRow(row); }}>
                      <div className="flex items-center gap-1 group">
                        <Badge color={qrColor[row.qr]} label={row.qr} />
                        <span className="text-[10px] text-gray-500 group-hover:text-blue-600 underline font-sans ml-1">Auditar</span>
                      </div>
                    </td>
                    <td className="px-4 py-5"><RiskBars level={row.risk} /></td>
                    <td className="px-4 py-5 text-right">
                      <button onClick={e => { e.stopPropagation(); onInspect(row.id, row.patente); }}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium text-[#44474e] hover:text-black">
                        Revisar →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="panel" onNavigate={onNavigate} onLogout={onLogout} officerRole={officerRole} setOfficerRole={setOfficerRole} />

      <main className="flex-1 px-10 py-6 flex flex-col gap-6 bg-[#fbf8fc]">
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por patente, RUT, nombre o folio..."
              className="w-full bg-white border border-[#c5c6cf] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#44474e] outline-none focus:border-[#031636] transition-colors" />
            <svg className="absolute left-3.5 top-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5.5 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM11 11l-2-2" stroke="#44474E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {search && <p className="text-sm text-[#44474e]">{getFilteredCount()} resultado{getFilteredCount() !== 1 ? "s" : ""} para "{search}"</p>}
        </div>

        <div className="grid grid-cols-4 gap-5">
          {getStats().map((s, i) => (
            <div key={i} className={`bg-white rounded-xl p-4 border shadow-sm flex flex-col justify-between
              \${s.critical ? "border-l-4 border-l-[#ba1a1a] border-[#c5c6cf]" : "border-[#c5c6cf]"}`}>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-[#44474e] leading-tight">{s.label}</p>
                <div className="rounded-lg w-8 h-8 shrink-0" style={{ background: s.iconBg }} />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-semibold tracking-tight" style={{ color: s.critical ? "#ba1a1a" : "black" }}>{s.value}</p>
                {(s as { progress?: number }).progress !== undefined
                  ? <div className="bg-[#e4e1e5] h-1.5 rounded-full mt-2 overflow-hidden"><div className="bg-[#364669] h-full rounded-full" style={{ width: `\${(s as { progress: number }).progress}%` }} /></div>
                  : <p className="text-sm font-bold mt-1" style={{ color: (s as { subColor: string }).subColor }}>{(s as { sub: string }).sub}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl border border-[#c5c6cf] shadow-sm overflow-hidden">
            {renderTableContent()}
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-[#c5c6cf] overflow-hidden">
              <div className="bg-[#410006] px-4 py-4 flex items-center gap-2">
                <span className="text-white text-sm">🔔</span>
                <h4 className="text-white font-bold text-xs uppercase tracking-[1.4px]">Alertas del Sistema</h4>
              </div>
              <div className="p-3 space-y-3">
                {getAlerts().map(alert => (
                  <div key={alert.title} className={`\${alert.bg} border-l-4 \${alert.border} rounded-lg pl-4 pr-3 py-3`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`\${alert.tc} text-xs font-black uppercase`}>PRIORIDAD: {alert.p}</span>
                      <span className={`\${alert.tc} text-xs`}>{alert.t}</span>
                    </div>
                    <p className={`font-bold \${alert.tc} text-xs mb-3`}>{alert.title}</p>
                    <button onClick={alert.cb} className={`w-full text-xs font-bold uppercase py-1.5 rounded \${alert.as}`}>{alert.action}</button>
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

      {/* ============================================================== */}
      {/* CUSTOM OVERLAY MODALS FOR AGENCY WORKFLOWS                     */}
      {/* ============================================================== */}

      {/* ADUANA QR AUDIT MODAL */}
      {selectedAduanaQrRow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            <div className="bg-[#031636] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <h3 className="font-bold text-lg">Auditoría de Firma QR (SNA)</h3>
              </div>
              <button onClick={() => setSelectedAduanaQrRow(null)} className="text-white hover:text-gray-300 bg-transparent border-none text-xl font-bold cursor-pointer">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-center py-2">
                <div className="p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl relative group">
                  <div className="w-40 h-40 bg-white grid grid-cols-5 gap-1 p-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0 || i < 6 || i % 5 === 0) ? "bg-[#031636]" : "bg-transparent"}`} />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors flex items-center justify-center">
                    <span className="text-[10px] bg-white/95 text-black font-bold px-2 py-0.5 rounded shadow">Firma Validada</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#1b1b1e] bg-gray-50 p-4 rounded-xl border border-gray-100 font-mono">
                <div className="flex justify-between border-b border-gray-200 pb-1.5"><span className="text-gray-500 font-sans">Patente:</span><span className="font-bold">{selectedAduanaQrRow.patente}</span></div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5"><span className="text-gray-500 font-sans">Folio Único:</span><span className="font-semibold text-xs">{selectedAduanaQrRow.folio}</span></div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5"><span className="text-gray-500 font-sans">Plazo Legal (RF-06):</span><span>{selectedAduanaQrRow.plazo}</span></div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-sans">Estado QR:</span>
                  <Badge color={qrColor[selectedAduanaQrRow.qr]} label={selectedAduanaQrRow.qr} />
                </div>
                <div className="pt-1.5">
                  <span className="text-[10px] text-gray-500 font-sans block mb-1">HASH VERIFICACIÓN (SHA-256):</span>
                  <span className="text-[9px] text-gray-600 block break-all font-mono">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => {
                  renewAduanaQr(selectedAduanaQrRow.id);
                  toast.success(`✓ Admisión temporal de vehículo ${selectedAduanaQrRow.patente} prorrogada con éxito.`);
                  setSelectedAduanaQrRow(null);
                }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm">
                  Prorrogar Plazo (+90d)
                </button>
                <button onClick={() => {
                  revokeAduanaQr(selectedAduanaQrRow.id);
                  toast.error(`🚨 Código QR de vehículo ${selectedAduanaQrRow.patente} invalidado y revocado en aduanas.`);
                  setSelectedAduanaQrRow(null);
                }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm">
                  Revocar QR / Alerta
                </button>
              </div>
              
              <button onClick={() => setSelectedAduanaQrRow(null)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg border-none text-xs cursor-pointer transition-colors mt-2">
                Cerrar Auditoría
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDI INTERPOL CHECK MODAL */}
      {pdiCheckingRow && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1220] rounded-2xl max-w-md w-full shadow-2xl border border-slate-800 overflow-hidden transform transition-all font-sans">
            <div className="bg-[#0a0f1d] px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚨</span>
                <h3 className="font-bold text-lg text-cyan-400 font-mono uppercase tracking-wider">Interpol Query Terminal</h3>
              </div>
              <button onClick={() => setPdiCheckingRow(null)} className="text-slate-400 hover:text-white bg-transparent border-none text-xl font-bold cursor-pointer">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              {!interpolFinished ? (
                <div className="space-y-4 text-center py-6">
                  <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-cyan-500 h-full rounded-full transition-all duration-200" style={{ width: `${interpolProgress}%` }} />
                  </div>
                  
                  <div className="bg-[#040811] text-[#00ffcc] p-4 rounded-lg font-mono text-left text-xs h-32 overflow-y-auto space-y-1">
                    <p className="opacity-60">{`[SYSTEM] Connecting to central node Lyon...`}</p>
                    {interpolProgress >= 20 && <p>{`> Match biometric face print... OK`}</p>}
                    {interpolProgress >= 40 && <p className="text-yellow-400">{`> Verifying document: ${pdiCheckingRow.documento}`}</p>}
                    {interpolProgress >= 60 && <p>{`> Calling Interpol database indexes...`}</p>}
                    {interpolProgress >= 80 && <p className={pdiCheckingRow.id === "102" ? "text-red-400 font-bold" : "text-cyan-400"}>
                      {pdiCheckingRow.id === "102" ? "> ALERT: Matches red notice database!" : "> Clean: No records found."}
                    </p>}
                    {interpolProgress >= 100 && <p className="text-[#00ffcc] animate-pulse">{`> Check completed successfully.`}</p>}
                  </div>
                  <p className="text-slate-400 text-xs font-mono">Consola PDI Activa - Procesando {interpolProgress}%</p>
                </div>
              ) : (
                <div className="space-y-4 font-sans text-slate-200">
                  <div className="bg-[#10192e] rounded-xl p-4 border border-slate-800 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#1b2b4a] border border-cyan-500/30 flex items-center justify-center text-3xl">
                      {pdiCheckingRow.pasajero.includes("Menor") ? "👦" : "👤"}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 text-base">{pdiCheckingRow.pasajero}</h4>
                      <p className="text-xs text-slate-400 font-mono">{pdiCheckingRow.documento}</p>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">Nacionalidad: <span className="text-slate-200">{pdiCheckingRow.nacionalidad}</span></p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-sm space-y-2 font-mono
                    ${pdiCheckingRow.id === "102" 
                      ? "bg-red-950/20 border-red-800 text-red-300" 
                      : pdiCheckingRow.id === "105"
                      ? "bg-amber-950/20 border-amber-800 text-amber-300"
                      : "bg-emerald-950/20 border-emerald-800 text-emerald-300"}`}>
                    
                    <h5 className="font-bold text-xs uppercase tracking-wider font-sans mb-1 text-slate-200">Resultado de Base de Datos Internacional:</h5>
                    
                    {pdiCheckingRow.id === "102" ? (
                      <>
                        <p className="font-bold text-red-400 flex items-center gap-1.5">🚨 ALERTA ROJA INTERPOL DETECTADA</p>
                        <p className="text-xs font-sans text-slate-300">Orden de captura internacional emitida por Tribunal Penal de Buenos Aires (Argentina) por Delito Financiero y Fraude Mayor.</p>
                      </>
                    ) : pdiCheckingRow.id === "105" ? (
                      <>
                        <p className="font-bold text-amber-400 flex items-center gap-1.5">⚠️ ANTECEDENTES PENDIENTES</p>
                        <p className="text-xs font-sans text-slate-300">La consulta central arrojó una coincidencia parcial de alcance nacional. Requiere control de firma de tutor.</p>
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-emerald-400 flex items-center gap-1.5">✓ SIN CARGOS / LIMPIO</p>
                        <p className="text-xs font-sans text-slate-300">El pasajero no registra antecedentes delictuales, órdenes de arraigo activas ni notificaciones de Interpol vigentes.</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {pdiCheckingRow.id === "102" ? (
                      <button onClick={() => {
                        updatePdiStatus(pdiCheckingRow.id, "Rechazado");
                        toast.error(`🚨 PROTOCOLO DE DETENCIÓN PDI ACTIVADO. Oficiales en andén notificados para escoltar al pasajero.`);
                        setPdiCheckingRow(null);
                      }} className="col-span-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-lg uppercase font-mono animate-pulse">
                        Activar Protocolo Detención 🚨
                      </button>
                    ) : (
                      <>
                        <button onClick={() => {
                          updatePdiStatus(pdiCheckingRow.id, "Aprobado");
                          toast.success(`✓ Pasaporte sellado. Ingreso de ${pdiCheckingRow.pasajero} aprobado por PDI.`);
                          setPdiCheckingRow(null);
                        }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm">
                          Sellar Pasaporte
                        </button>
                        <button onClick={() => {
                          updatePdiStatus(pdiCheckingRow.id, "Rechazado");
                          toast.warning(`⚠ Ingreso denegado para el pasajero ${pdiCheckingRow.pasajero} por PDI.`);
                          setPdiCheckingRow(null);
                        }} className="bg-red-600/30 hover:bg-red-600/40 text-red-300 border border-red-700 font-bold py-2.5 rounded-lg text-xs cursor-pointer transition-colors">
                          Denegar Ingreso
                        </button>
                      </>
                    )}
                  </div>

                  <button onClick={() => setPdiCheckingRow(null)} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-lg border border-slate-700 text-xs cursor-pointer transition-colors mt-2">
                    Cerrar Terminal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SAG X-RAY MODAL */}
      {sagXrayRow && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1b2b1e] rounded-2xl max-w-lg w-full shadow-2xl border border-emerald-800/80 overflow-hidden transform transition-all font-sans text-slate-200">
            <div className="bg-[#111e15] px-6 py-4 flex items-center justify-between border-b border-emerald-950">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="font-bold text-lg text-emerald-400 font-mono uppercase tracking-wide">Escáner X-Ray Fitosanitario SAG</h3>
              </div>
              <button onClick={() => setSagXrayRow(null)} className="text-slate-400 hover:text-white bg-transparent border-none text-xl font-bold cursor-pointer">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              {!xrayFinished ? (
                <div className="space-y-4 text-center py-6">
                  <div className="relative w-72 h-40 bg-[#0d160f] border-2 border-emerald-600/30 rounded-2xl mx-auto flex items-center justify-center overflow-hidden">
                    <div className="w-60 h-32 border-4 border-amber-600/20 rounded bg-amber-600/5 relative flex items-center justify-around">
                      <div className="w-12 h-20 bg-emerald-500/10 rounded-sm" />
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full" />
                      <div className="w-8 h-12 bg-red-500/10 rounded-lg" />
                    </div>
                    <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-bounce" style={{ animationDuration: '2s' }} />
                  </div>
                  <div className="w-full bg-[#122216] h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-emerald-50 h-full rounded-full transition-all duration-250" style={{ width: `${xrayProgress}%` }} />
                  </div>
                  
                  <div className="bg-[#0b140d] text-emerald-400 p-3 rounded border border-emerald-950 font-mono text-left text-xs h-24 overflow-y-auto space-y-1">
                    <p className="opacity-60">{`[SYSTEM] Aligning luggage sensor arrays...`}</p>
                    {xrayProgress >= 25 && <p>{`> Emitting fitosanitary high-density rays...`}</p>}
                    {xrayProgress >= 50 && <p className="text-amber-400">{`> Warning: Bio-density anomaly in luggage compartment.`}</p>}
                    {xrayProgress >= 75 && <p>{`> Cross-referencing declared organics list...`}</p>}
                    {xrayProgress >= 100 && <p className="text-emerald-300">{`> Scan complete. Imaging finalized.`}</p>}
                  </div>
                  <p className="text-slate-400 text-xs font-mono">Calibración de Densidades Orgánicas - {xrayProgress}%</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full h-44 bg-[#0d160f] border-2 border-emerald-500 rounded-xl flex flex-col justify-between p-4 overflow-hidden shadow-inner">
                    <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider block border-b border-emerald-950 pb-1">Análisis Digital de Equipaje: {sagXrayRow.declarante}</span>
                    
                    <div className="flex justify-around items-center py-4">
                      {sagXrayRow.id === "201" ? (
                        <>
                          <div className="flex flex-col items-center gap-1 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                            <span className="text-4xl">🍏</span>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">Fruta Fresca</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                            <span className="text-4xl">🌾</span>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">Semillas</span>
                          </div>
                        </>
                      ) : sagXrayRow.id === "203" ? (
                        <>
                          <div className="flex flex-col items-center gap-1 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                            <span className="text-4xl">🪵</span>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">Madera Rustica</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                            <span className="text-4xl">🌺</span>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">Flora Silvestre</span>
                          </div>
                        </>
                      ) : sagXrayRow.id === "205" ? (
                        <div className="flex flex-col items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg">
                          <span className="text-4xl">🐱</span>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">Mascota (Gato)</span>
                        </div>
                      ) : (
                        <div className="text-center py-4 w-full">
                          <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide block">✓ Equipaje Limpio - Sin Anormalidades Biológicas</span>
                          <span className="text-[10px] text-slate-400 block mt-1">Sólo ropa y objetos personales estándar</span>
                        </div>
                      )}
                    </div>
                    
                    <span className="text-[9px] text-[#00ff66] font-mono block text-right mt-1">SAG RF-07 SCANNER ENGINE v1.2</span>
                  </div>

                  <div className="bg-[#112015] rounded-xl p-4 border border-emerald-950 space-y-2 text-xs font-mono">
                    <h5 className="font-bold text-emerald-400 uppercase tracking-wide font-sans text-xs">Comparación de Declaración Jurada:</h5>
                    <div><span className="text-slate-400">Declarado Orgánicos:</span> <span className="font-bold text-slate-200">{sagXrayRow.organicosDeclarados}</span></div>
                    <div><span className="text-slate-400">Declarado Mascotas:</span> <span className="font-bold text-slate-200">{sagXrayRow.mascotasDeclaradas}</span></div>
                    
                    <div className="border-t border-emerald-950 pt-2 mt-2">
                      <span className="font-sans font-bold text-slate-300 block mb-1">Veredicto Fitosanitario:</span>
                      {sagXrayRow.id === "201" || sagXrayRow.id === "203" ? (
                        <p className="text-amber-400 font-sans">⚠️ RIESGO DETECTADO. El escáner biológico detectó material vegetal que representa riesgo fitosanitario no autorizado.</p>
                      ) : (
                        <p className="text-emerald-400 font-sans">✓ APTO PARA INGRESO. El contenido coincide con lo permitido y el registro del andén es adecuado.</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button onClick={() => {
                      updateSagStatus(sagXrayRow.id, "Verificado SAG");
                      toast.success(`✓ Declaración de ${sagXrayRow.declarante} aprobada y autorizada por SAG.`);
                      setSagXrayRow(null);
                    }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm font-semibold">
                      Aprobar e Ingresar
                    </button>
                    {(sagXrayRow.id === "201" || sagXrayRow.id === "203") ? (
                      <button onClick={() => {
                        updateSagStatus(sagXrayRow.id, "Retenido para revisión");
                        toast.error(`🚨 Carga retenida por SAG para sanitización/destrucción. Acta de infracción emitida.`);
                        setSagXrayRow(null);
                      }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm font-semibold">
                        Incautar y Retener 🍎
                      </button>
                    ) : (
                      <button onClick={() => {
                        updateSagStatus(sagXrayRow.id, "Retenido para revisión");
                        toast.warning(`⚠ Declaración SAG retenida temporalmente para inspección física adicional.`);
                        setSagXrayRow(null);
                      }} className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg border-none text-xs cursor-pointer transition-colors shadow-sm font-semibold">
                        Retener Carga
                      </button>
                    )}
                  </div>

                  <button onClick={() => setSagXrayRow(null)} className="w-full bg-[#16241a] hover:bg-[#203425] text-slate-300 font-bold py-2 rounded-lg border border-emerald-900/60 text-xs cursor-pointer transition-colors mt-2">
                    Cerrar Escáner
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INSPECCIÓN ───────────────────────────────────────────────────
function InspeccionScreen({ patente, onBack, onNavigate, onLogout, officerRole, setOfficerRole }: {
  patente: string; onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void;
  officerRole: "aduana" | "pdi" | "sag" | "admin";
  setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void;
}) {
  const getAllowedTabs = () => {
    switch (officerRole) {
      case "aduana":
        return [{ key: "vehiculo" as const, label: "Datos del Vehículo" }];
      case "pdi":
        return [
          { key: "acompanantes" as const, label: "Acompañantes/Menores" },
          { key: "pdi" as const, label: "Control PDI" }
        ];
      case "sag":
        return [{ key: "sag" as const, label: "Declaración SAG" }];
      case "admin":
      default:
        return [
          { key: "vehiculo" as const, label: "Datos del Vehículo" },
          { key: "acompanantes" as const, label: "Acompañantes/Menores" },
          { key: "sag" as const, label: "Declaración SAG" },
          { key: "pdi" as const, label: "Control PDI" }
        ];
    }
  };

  const tabs = getAllowedTabs();
  const initialTab = tabs[0]?.key || "vehiculo";
  const [activeTab, setActiveTab] = useState<"vehiculo" | "acompanantes" | "sag" | "pdi">(initialTab);
  const [result, setResult] = useState<"pending" | "aprobado" | "retenido" | "derivado">("pending");

  useEffect(() => {
    const currentTabs = getAllowedTabs();
    setActiveTab(currentTabs[0]?.key || "vehiculo");
  }, [officerRole]);

  // State elements for interactive checking
  const [cargoChecked, setCargoChecked] = useState(false);
  const [chasisChecked, setChasisChecked] = useState(false);
  
  const [notaryQueryRun, setNotaryQueryRun] = useState(false);
  const [minorChecked, setMinorChecked] = useState(false);
  const [pdiMigchecked, setPdiMigchecked] = useState(false);

  const [sagBagChecked, setSagBagChecked] = useState(false);
  const [sagNoProdChecked, setSagNoProdChecked] = useState(false);
  const [sagPetChecked, setSagPetChecked] = useState(false);

  const [pdiBackgroundRun, setPdiBackgroundRun] = useState(false);
  const [pdiBackgroundChecked, setPdiBackgroundChecked] = useState(false);

  function handleAction(action: "aprobado" | "retenido" | "derivado") {
    setResult(action);
    const msgs = {
      aprobado: `✓ Tránsito aprobado. Firma digital de ${officerRole.toUpperCase()} registrada.`,
      retenido: `⚠ Vehículo retenido por orden de ${officerRole.toUpperCase()}.`,
      derivado: `→ Caso derivado a segunda línea por ${officerRole.toUpperCase()}.`
    };
    toast[action === "aprobado" ? "success" : action === "retenido" ? "warning" : "info"](msgs[action]);
  }

  const isReadOnly = (tabKey: string) => {
    if (officerRole === "admin") return false;
    if (officerRole === "aduana") return tabKey !== "vehiculo";
    if (officerRole === "pdi") return tabKey !== "acompanantes" && tabKey !== "pdi";
    if (officerRole === "sag") return tabKey !== "sag";
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="inspeccion" onNavigate={onNavigate} onLogout={onLogout} officerRole={officerRole} setOfficerRole={setOfficerRole} />

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
                    className={`px-6 py-4 text-sm transition-colors relative flex items-center gap-1.5 ${activeTab === t.key ? "font-bold text-black border-b-2 border-black" : "text-[#44474e] hover:text-black"}`}>
                    {t.label}
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${isReadOnly(t.key) ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-700"}`}>
                      {isReadOnly(t.key) ? "L" : "E"}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-8">
                {isReadOnly(activeTab) ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 mb-6 flex items-center justify-between text-xs text-gray-600">
                    <span>🔒 VISTA DE LECTURA INTEGRADA: Módulo verificado por el organismo responsable (RF-04).</span>
                    <span className="font-bold uppercase bg-gray-200 text-gray-700 px-2 py-0.5 rounded">VERIFICADO</span>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 mb-6 flex items-center justify-between text-xs text-blue-700">
                    <span>📝 ACCIÓN DE SU COMPETENCIA: Su rol tiene privilegios de firma y validación sobre este módulo.</span>
                    <span className="font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded">EDICIÓN</span>
                  </div>
                )}

                {activeTab === "vehiculo" && (
                  <div>
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
                      <div className="flex-1 relative flex flex-col gap-4">
                        <div className="rounded-xl overflow-hidden h-56">
                          <img src={imgVehiclePhoto} alt="Vehículo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-2">
                          {["Vista Frontal","Motor (Chasis)"].map(l => (
                            <span key={l} className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">{l}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {!isReadOnly("vehiculo") && (
                      <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                        <h4 className="font-bold text-sm text-black">Inspección de Aduanas (SNA)</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={chasisChecked} onChange={e => setChasisChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Confirmar coincidencia física de patente y chasis (VIN) (RF-02)</span>
                          </label>
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={cargoChecked} onChange={e => setCargoChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Registrar control documental de carga y sellos de equipaje (Trazabilidad - RF-16)</span>
                          </label>
                        </div>
                        <div className="bg-[#fff7ed] border border-[#ffedd5] p-3.5 rounded-lg text-xs text-[#9a3412] mt-3">
                          <strong>Alerta de Plazos Legales (RF-06):</strong> Vehículo registrado en admisión temporal. Plazo de vigencia configurado para 90 días desde el ingreso.
                        </div>
                        <button onClick={() => {
                          if (chasisChecked && cargoChecked) toast.success("Inspección de vehículo firmada localmente.");
                          else toast.error("Por favor complete todas las verificaciones.");
                        }} className="bg-black text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-gray-800">
                          Firmar Validación Vehicular (SNA)
                        </button>
                      </div>
                    )}
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
                        { name: "Tomás Fuentes S.", rut: "24.110.887-1", role: "Menor", status: notaryQueryRun ? "✓ VALIDACIÓN NOTARIAL OK" : "⚠ REQUIERE VALIDACIÓN NOTARIAL", statusColor: notaryQueryRun ? "text-[#16a34a]" : "text-amber-600", minor: true },
                      ].map(p => (
                        <div key={p.rut} className={`border border-[#c5c6cf] rounded-lg p-4 flex gap-4 w-72 ${p.minor ? "bg-[rgba(8,27,59,0.03)] border-l-4" : ""}`}>
                          <div className="bg-[#f0edf1] rounded w-14 h-14 shrink-0 flex items-center justify-center text-2xl">{p.minor ? "👦" : "👤"}</div>
                          <div>
                            <p className="font-bold text-[#1b1b1e] text-sm">{p.name}</p>
                            <p className="text-[#44474e] text-xs">{p.rut}</p>
                            <Badge color={p.minor ? "red" : "gray"} label={p.role} />
                            <p className={`text-xs font-bold mt-1.5 ${p.statusColor}`}>{p.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!isReadOnly("acompanantes") && (
                      <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                        <h4 className="font-bold text-sm text-black">Control de Menores y Filiación (PDI)</h4>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <button onClick={() => {
                              setNotaryQueryRun(true);
                              toast.success("Consulta exitosa a Notarías: Permiso Notarial #992834-V Validado en línea (RF-13).");
                            }} className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded hover:bg-blue-700">
                              Consultar Permisos Notariales en Línea (RF-13)
                            </button>
                          </div>
                          {notaryQueryRun && (
                            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-4 rounded-lg text-xs text-[#166534] space-y-1 animate-fade-in">
                              <p><strong>Permiso Encontrado:</strong> Escritura Pública #22894-2026</p>
                              <p><strong>Otorgante:</strong> Elena Silva Roa (Madre)</p>
                              <p><strong>Menor:</strong> Tomás Fuentes Silva</p>
                              <p><strong>Estado:</strong> FIRMADO Y AUTORIZADO</p>
                            </div>
                          )}
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer pt-2">
                            <input type="checkbox" checked={minorChecked} onChange={e => setMinorChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Validar filiación de Tomás Fuentes Silva y autorizaciones físicas (RF-01)</span>
                          </label>
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={pdiMigchecked} onChange={e => setPdiMigchecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Registrar control migratorio de pasajeros en sistema central PDI</span>
                          </label>
                        </div>
                        <button onClick={() => {
                          if (minorChecked && pdiMigchecked && notaryQueryRun) toast.success("Filiación y control migratorio firmado por PDI.");
                          else toast.error("Debe consultar en línea y marcar todas las verificaciones.");
                        }} className="bg-black text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-gray-800">
                          Firmar Aprobación Migratoria (PDI)
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "sag" && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🌿</span>
                      <h3 className="font-semibold text-[#1b1b1e] text-xl">Declaración SAG</h3>
                    </div>
                    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 mb-4">
                      <p className="font-medium text-[#166534] text-sm">Declaración Digital #SG-9092 enviada satisfactoriamente (RF-07).</p>
                      <p className="text-[#15803d] text-xs uppercase mt-1">SIN PRODUCTOS DE ORIGEN VEGETAL/ANIMAL.</p>
                    </div>
                    
                    {/* Sección Mascotas (RF-12) */}
                    <div className="border border-[#c5c6cf] rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-sm text-black flex items-center gap-2 mb-2">
                        <span>🐾</span> Registro de Mascotas (RF-12)
                      </h4>
                      <p className="text-xs text-[#44474e] mb-3">Mascota declarada: Perro "Pug", chip Nro: 900123456789.</p>
                      <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs text-blue-700">
                        <strong>Certificado Sanitario SAG:</strong> Validado con el Servicio de origen (SENASA). Vacunas al día.
                      </div>
                    </div>

                    {!isReadOnly("sag") ? (
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-sm text-black">Verificaciones Fitosanitarias y Mascotas (SAG)</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={sagBagChecked} onChange={e => setSagBagChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Inspección física de equipaje y maletero completada</span>
                          </label>
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={sagNoProdChecked} onChange={e => setSagNoProdChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Verificar ausencia de frutas, semillas o productos fitosanitarios restringidos (RF-07)</span>
                          </label>
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={sagPetChecked} onChange={e => setSagPetChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Verificar microchip y vacunas de mascota declarada (RF-12)</span>
                          </label>
                        </div>
                        <button onClick={() => {
                          if (sagBagChecked && sagNoProdChecked && sagPetChecked) toast.success("Control fitosanitario e inspección de mascotas firmada por SAG.");
                          else toast.error("Por favor complete todas las verificaciones SAG.");
                        }} className="bg-black text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-gray-800">
                          Firmar Aprobación SAG
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => toast.info("Generando PDF de declaración SAG...")}
                        className="w-full border border-[#c5c6cf] rounded py-2 text-[#44474e] text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                        📄 Ver PDF Declaración
                      </button>
                    )}
                  </div>
                )}
                {activeTab === "pdi" && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🔵</span>
                      <h3 className="font-semibold text-[#1b1b1e] text-xl">Control PDI</h3>
                    </div>
                    <div className="space-y-3 mb-6">
                      {[{ label: "Arraigos / Alertas", value: "SIN ALERTAS", ok: true }, { label: "Control Migratorio", value: "HABILITADO", ok: true }].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#c5c6cf]">
                          <span className="text-[#44474e] text-sm">{row.label}</span>
                          <span className="font-bold text-sm text-[#16a34a]">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {!isReadOnly("pdi") && (
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-sm text-black">Verificación de Antecedentes (PDI)</h4>
                        <button onClick={() => {
                          setPdiBackgroundRun(true);
                          toast.success("Consulta de antecedentes policiales e Interpol ejecutada con éxito (RF-04).");
                        }} className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded hover:bg-blue-700">
                          Consultar Base de Datos Policial (RF-04)
                        </button>
                        {pdiBackgroundRun && (
                          <div className="bg-[#f0edf1] p-3.5 rounded-lg space-y-2 text-xs text-[#1b1b1e]">
                            <p className="flex items-center justify-between"><span>RUT 15.662.339-K (Conductor):</span> <span className="font-bold text-[#16a34a]">HABILITADO / SIN ORDEN</span></p>
                            <p className="flex items-center justify-between"><span>RUT 16.221.002-4 (Elena Silva):</span> <span className="font-bold text-[#16a34a]">HABILITADO / SIN ORDEN</span></p>
                            <p className="flex items-center justify-between"><span>Interpol Red Alert check:</span> <span className="font-bold text-[#16a34a]">CLEAN</span></p>
                          </div>
                        )}
                        <div className="pt-2">
                          <label className="flex items-center gap-3 text-sm text-[#1b1b1e] cursor-pointer">
                            <input type="checkbox" checked={pdiBackgroundChecked} onChange={e => setPdiBackgroundChecked(e.target.checked)} className="w-4 h-4 accent-black" />
                            <span>Confirmar verificación de antecedentes e Interpol (RF-04)</span>
                          </label>
                        </div>
                        <button onClick={() => {
                          if (pdiBackgroundChecked && pdiBackgroundRun) toast.success("Verificación de antecedentes firmada por PDI.");
                          else toast.error("Debe ejecutar la consulta de antecedentes y marcar la verificación.");
                        }} className="bg-black text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-gray-800">
                          Firmar Antecedentes PDI
                        </button>
                      </div>
                    )}
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

function AuditoriaScreen({ onNavigate, onLogout, officerRole, setOfficerRole }: { onNavigate: (view: View) => void; onLogout: () => void; officerRole: "aduana" | "pdi" | "sag" | "admin"; setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const resultColor = { "APROBADO": "green", "BLOQUEADO": "red", "ALERTA": "orange" } as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="auditoria" onNavigate={onNavigate} onLogout={onLogout} officerRole={officerRole} setOfficerRole={setOfficerRole} />

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

function UsuariosScreen({ onNavigate, onLogout, officerRole, setOfficerRole }: { onNavigate: (view: View) => void; onLogout: () => void; officerRole: "aduana" | "pdi" | "sag" | "admin"; setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void }) {
  const [users, setUsers] = useState<SiafUser[]>([
    { id: "1", name: "Ariel Catalán", rut: "12.345.678-9", email: "ariel.catalan@siaf.cl", role: "Ciudadano", status: "Activo" },
    { id: "2", name: "Vicente Orellana", rut: "18.765.432-1", email: "v.orellana@aduana.cl", role: "Funcionario", status: "Activo" },
    { id: "3", name: "Diego Rebaza", rut: "15.987.654-3", email: "d.rebaza@pdi.cl", role: "Funcionario", status: "Activo" },
    { id: "4", name: "Joshua Reyes", rut: "16.321.654-K", email: "j.reyes@sag.cl", role: "Funcionario", status: "Inactivo" },
    { id: "5", name: "Soporte Técnico SIAF", rut: "9.999.999-9", email: "soporte@siaf.cl", role: "Administrador", status: "Activo" },
  ]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<SiafUser | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editRut, setEditRut] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRut, setNewRut] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Funcionario");
  const [newStatus, setNewStatus] = useState("Activo");

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

  function handleCreate() {
    if (!newName.trim() || !newRut.trim() || !newEmail.trim()) {
      toast.error("Por favor complete todos los campos obligatorios.");
      return;
    }
    const newUser: SiafUser = {
      id: String(users.length + 1),
      name: newName,
      rut: newRut,
      email: newEmail,
      role: newRole,
      status: newStatus
    };
    setUsers(prev => [...prev, newUser]);
    setIsCreateOpen(false);
    setNewName("");
    setNewRut("");
    setNewEmail("");
    setNewRole("Funcionario");
    setNewStatus("Activo");
    toast.success(`Usuario funcionario ${newName} creado con éxito (RF-20).`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc]" style={{ fontFamily: "Inter,sans-serif" }}>
      <Toaster richColors />
      <OfficerHeader active="usuarios" onNavigate={onNavigate} onLogout={onLogout} officerRole={officerRole} setOfficerRole={setOfficerRole} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-black tracking-tight">Gestión de Usuarios</h1>
            <p className="text-[#545f72] text-base mt-1">Administración de credenciales, roles y accesos institucionales.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsCreateOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-gray-800 transition-colors cursor-pointer border-none">
              ➕ Crear Funcionario
            </button>
            <button onClick={() => setIsExportOpen(true)}
              className="bg-white text-black border border-[#c5c6cf] px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#c5c6cf] shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <h3 className="font-bold text-lg text-black">Editar Usuario</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nombre Completo *</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">RUT *</label>
                <input type="text" value={editRut} onChange={e => setEditRut(e.target.value)}
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
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

      {/* Create User Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#c5c6cf] shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <h3 className="font-bold text-lg text-black">Crear Cuenta de Funcionario</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-500 hover:text-black font-bold text-lg border-none bg-transparent cursor-pointer">✕</button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nombre Completo *</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
                  placeholder="Ej: Juan Valenzuela"
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">RUT Funcionario *</label>
                <input type="text" value={newRut} onChange={e => setNewRut(e.target.value)}
                  placeholder="Ej: 15.987.654-3"
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Correo Institucional *</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  placeholder="Ej: j.valenzuela@aduana.cl"
                  className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Perfil de Acceso</label>
                  <select value={newRole} onChange={e => setNewRole(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
                    <option value="Funcionario">Funcionario</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Estado de la Cuenta</label>
                  <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm text-[#1b1b1e] outline-none focus:border-black">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4 border-gray-100 mt-2">
              <button onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 border border-[#c5c6cf] rounded-lg text-sm text-[#44474e] hover:bg-gray-50">Cancelar</button>
              <button onClick={handleCreate}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800">Crear Usuario</button>
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
function ReportesScreen({ onNavigate, onLogout, officerRole, setOfficerRole }: { onNavigate: (view: View) => void; onLogout: () => void; officerRole: "aduana" | "pdi" | "sag" | "admin"; setOfficerRole: (role: "aduana" | "pdi" | "sag" | "admin") => void }) {
  const getAllowedReportTypes = () => {
    switch (officerRole) {
      case "aduana":
        return [
          { value: "transitos", label: "Tránsitos por Tipo de Vehículo (SNA)" },
          { value: "inspecciones", label: "Inspecciones de Carga y Andén (SNA)" },
        ];
      case "pdi":
        return [
          { value: "alertas", label: "Alertas de Riesgo y Control Migratorio (PDI)" },
        ];
      case "sag":
        return [
          { value: "sag", label: "Declaraciones Sanitarias Silvoagropecuarias (SAG)" },
        ];
      case "admin":
      default:
        return [
          { value: "transitos", label: "Tránsitos por Tipo de Vehículo (SNA)" },
          { value: "inspecciones", label: "Inspecciones de Carga y Andén (SNA)" },
          { value: "alertas", label: "Alertas de Riesgo y Control Migratorio (PDI)" },
          { value: "sag", label: "Declaraciones Sanitarias Silvoagropecuarias (SAG)" },
        ];
    }
  };

  const allowedTypes = getAllowedReportTypes();
  const [reportType, setReportType] = useState(allowedTypes[0]?.value || "transitos");
  const [dateDesde, setDateDesde] = useState("2026-06-01");
  const [dateHasta, setDateHasta] = useState("2026-06-22");
  const [paso, setPaso] = useState("todos");
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const types = getAllowedReportTypes();
    setReportType(types[0]?.value || "transitos");
    setGeneratedData(null);
  }, [officerRole]);

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
          { label: "Amarillo (Discrepancia DNI extranjero)", count: 40, pct: "48%" },
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
      <OfficerHeader active="reportes" onNavigate={onNavigate} onLogout={onLogout} officerRole={officerRole} setOfficerRole={setOfficerRole} />

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
              {getAllowedReportTypes().map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
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

  const [officerRole, setOfficerRole] = useState<"aduana" | "pdi" | "sag" | "admin">("aduana");
  const [userCountry, setUserCountry] = useState("Chile");

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

  function handleLogin(type: UserType, rut: string, role?: "aduana" | "pdi" | "sag" | "admin", country?: string) {
    setUserType(type);
    setUserName(rut === "12.345.678-9" ? "Juan Pérez" : rut);
    if (country) {
      setUserCountry(country);
      setVehicle(prev => ({ ...prev, pais: country }));
    }
    if (type === "funcionario") {
      if (role) setOfficerRole(role);
      setView("panel");
    } else {
      setView("dashboard");
    }
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
        <ClaveUnicaScreen onComplete={() => handleLogin("ciudadano", "12.345.678-9", undefined, "Chile")} />
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
          userCountry={userCountry}
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
          officerRole={officerRole}
          setOfficerRole={setOfficerRole}
        />
      )}
      {view === "inspeccion" && (
        <InspeccionScreen
          patente={inspectPatente}
          onBack={() => setView("panel")}
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
          officerRole={officerRole}
          setOfficerRole={setOfficerRole}
        />
      )}
      {view === "auditoria" && (
        <AuditoriaScreen
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
          officerRole={officerRole}
          setOfficerRole={setOfficerRole}
        />
      )}
      {view === "usuarios" && (
        <UsuariosScreen
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
          officerRole={officerRole}
          setOfficerRole={setOfficerRole}
        />
      )}
      {view === "reportes" && (
        <ReportesScreen
          onNavigate={(targetView) => setView(targetView)}
          onLogout={() => setView("login")}
          officerRole={officerRole}
          setOfficerRole={setOfficerRole}
        />
      )}
    </div>
  );
}
