import svgPaths from "./svg-eytlx126i0";
import imgImage from "./5848b8826c1793e8eaf819d4a4dd3dfd56140e91.png";

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">
        <p className="leading-[32px]">SIAF</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Trámites</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Declaraciones</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Manifiestos</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Estadísticas</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Nav">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <Nav />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #44474E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[14px] pt-[8px] px-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #44474E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[14px] pt-[8px] px-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#75777f] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Cerrar Sesión</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Button:margin">
      <Button2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
      <ButtonMargin />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[80px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[40px] relative size-full">
          <Container1 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopNavBar() {
  return (
    <div className="bg-[#fbf8fc] content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Header - TopNavBar">
      <div aria-hidden className="absolute border-[#c5c6cf] border-b border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[12.025px] relative shrink-0 w-[16.3px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3 12.025">
        <g id="Container">
          <path d={svgPaths.p2f7dfa00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#7384a9] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Conductor</p>
      </div>
    </div>
  );
}

function Conductor() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Conductor">
      <Background />
      <Container7 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-black content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="leading-[20px]">Vehículo</p>
      </div>
    </div>
  );
}

function VehiculoActive() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Vehículo (Active)">
      <Background1 />
      <Container8 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f5f3f7] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">3</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Grupo</p>
      </div>
    </div>
  );
}

function Grupo() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Grupo">
      <Background2 />
      <Container9 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f5f3f7] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">4</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Confirmación</p>
      </div>
    </div>
  );
}

function Confirmacion() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Confirmación">
      <Background3 />
      <Container10 />
    </div>
  );
}

function ProgressStepper() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[896px] relative shrink-0 w-[896px]" data-name="Progress Stepper">
      <div className="absolute bg-[#c5c6cf] h-[2px] left-[12%] right-[12%] top-[20px]" data-name="Horizontal Divider" />
      <div className="absolute bg-black h-[2px] left-[12%] right-[63%] top-[20px]" data-name="Horizontal Divider" />
      <Conductor />
      <VehiculoActive />
      <Grupo />
      <Confirmacion />
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black tracking-[-0.32px] w-full">
          <p className="leading-[40px]">Información del Vehículo</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[16px] w-full">
          <p className="leading-[24px] mb-0">Ingrese los detalles técnicos del vehículo que cruzará la frontera para su validación en el</p>
          <p className="leading-[24px]">sistema aduanero.</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">Patente (Placa)</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Ej: AB-CD-12</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[15px] relative size-full">
          <Container15 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">País de Origen</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="image">
          <path d="M7.2 9.6L12 14.4L16.8 9.6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[16px] w-full">
          <p className="leading-[24px]">Chile</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[17px] py-[13px] relative size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pl-[322px] pr-[9px] py-[13px] relative rounded-[inherit] size-full">
            <Image />
          </div>
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Label1 />
      <Options />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container16 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">Marca</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Toyota, Ford...</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[15px] relative size-full">
          <Container20 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Label2 />
      <Input1 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">Modelo</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Corolla, Ranger...</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[15px] relative size-full">
          <Container22 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Label3 />
      <Input2 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">Año</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[17px] overflow-clip right-[32px] top-[15px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">2024</p>
      </div>
    </div>
  );
}

function Container26() {
  return <div className="flex-[1_0_0] h-[24px] min-w-px mr-[-0.01px] relative" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 relative shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex items-center left-[17px] right-[17px] top-[13px]" data-name="Container">
      <Container26 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container24 />
        <Container25 />
      </div>
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Label4 />
      <Input3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container21 />
      <Container23 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1e] text-[14px] w-full">
        <p className="leading-[20px]">VIN (Número de Chasis)</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] uppercase w-full">
          <p className="leading-[normal]">17 CARACTERES ALFANUMÉRICOS</p>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[15px] relative size-full">
          <Container28 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c5c6cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Italic',sans-serif] font-normal italic justify-center leading-[0] relative shrink-0 text-[#44474e] text-[12px] w-full">
        <p className="leading-[18px]">Ubicado usualmente en el borde del parabrisas o marco de la puerta.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Input4 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #44474E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[24px] py-[12px] relative size-full">
        <Container30 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[20px]">Volver</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-black relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[40px] py-[12px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
          <p className="leading-[20px]">Continuar Registro</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#c5c6cf] border-solid border-t inset-0 pointer-events-none" />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Form() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pt-[24px] relative size-full">
        <Container13 />
        <Container18 />
        <Container27 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(3,22,54,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[33px] relative size-full">
        <Heading />
        <Container12 />
        <Form />
      </div>
    </div>
  );
}

function LeftSideFormSectionBentoStyleCard() {
  return (
    <div className="col-[1/span_8] content-stretch flex flex-col items-start justify-self-stretch pb-[71px] relative row-1 self-start shrink-0" data-name="Left Side: Form Section (Bento Style Card)">
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full">
        <p className="leading-[28px]">Requisitos de Ingreso</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
          <path d={svgPaths.pc679c40} fill="var(--fill-0, #7384A9)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[35.25px] relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Padron o Título de Dominio del vehículo</p>
        <p className="leading-[20px]">actualizado.</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-start relative shrink-0 w-full" data-name="Item">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
          <path d={svgPaths.p15aec574} fill="var(--fill-0, #7384A9)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[47.41px] relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Seguro Obligatorio Internacional (RCI)</p>
        <p className="leading-[20px]">vigente.</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-start relative shrink-0 w-full" data-name="Item">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
          <path d={svgPaths.p9135100} fill="var(--fill-0, #7384A9)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.64px] relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Permiso de circulación y revisión técnica al</p>
        <p className="leading-[20px]">día.</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-start relative shrink-0 w-full" data-name="Item">
      <Container36 />
      <Container37 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[24px] relative size-full">
        <Heading1 />
        <List />
      </div>
    </div>
  );
}

function VisualReferenceCard() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Visual Reference Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <div className="h-[192px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[198.96%] left-0 max-w-none top-[-49.48%] w-full" src={imgImage} />
          </div>
        </div>
        <Container31 />
      </div>
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_12px_0px_rgba(3,22,54,0.05)]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #7384A9)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#7384a9] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">¿Necesita Asistencia?</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container39 />
        <Heading2 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7384a9] text-[14px] w-full">
          <p className="leading-[20px] mb-0">Si tiene problemas con el VIN o la patente,</p>
          <p className="leading-[20px]">contacte a la mesa de ayuda técnica de Aduanas.</p>
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p3d9b5d80} fill="var(--fill-0, #7384A9)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container41 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#7384a9] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">600 370 2000</p>
        </div>
      </div>
    </div>
  );
}

function EmergencyContactHelp() {
  return (
    <div className="bg-[#081b3b] relative rounded-[12px] shrink-0 w-full" data-name="Emergency Contact / Help">
      <div aria-hidden className="absolute border border-[rgba(197,198,207,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[15.5px] items-start p-[25px] relative size-full">
        <Container38 />
        <Container40 />
        <Link4 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#44474e] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">SISTEMA SINCRONIZADO</p>
      </div>
    </div>
  );
}

function SyncIndicator() {
  return (
    <div className="bg-[#f5f3f7] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Sync Indicator">
      <div className="bg-[#22c55e] relative rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <Container42 />
    </div>
  );
}

function RightSideInfoContextInformativeSidebar() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Right Side: Info & Context (Informative Sidebar)">
      <VisualReferenceCard />
      <EmergencyContactHelp />
      <SyncIndicator />
    </div>
  );
}

function Container11() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_678px] relative shrink-0 w-full" data-name="Container">
      <LeftSideFormSectionBentoStyleCard />
      <RightSideInfoContextInformativeSidebar />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center max-w-[inherit] pb-[80px] pt-[32px] px-[40px] relative size-full">
          <ProgressStepper />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#7384a9] text-[20px]">
        <p className="leading-[28px]">SIAF</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[14px] text-[rgba(115,132,169,0.8)]">
        <p className="leading-[20px]">© 2024 Servicio Nacional de Aduanas - Gobierno de Chile</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(115,132,169,0.8)] whitespace-nowrap">
        <p className="leading-[20px]">Privacidad</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(115,132,169,0.8)] whitespace-nowrap">
        <p className="leading-[20px]">Términos de Uso</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(115,132,169,0.8)] whitespace-nowrap">
        <p className="leading-[20px]">Contacto</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(115,132,169,0.8)] whitespace-nowrap">
        <p className="leading-[20px]">Transparencia</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[24px] h-[20px] items-start relative shrink-0" data-name="Container">
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
    </div>
  );
}

function Container43() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[40px] py-[32px] relative size-full">
          <Paragraph />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#081b3b] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer">
      <Container43 />
    </div>
  );
}

export default function SiafRegistroDeVehiculo() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 248, 252) 0%, rgb(251, 248, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="SIAF - Registro de Vehículo">
      <HeaderTopNavBar />
      <Main />
      <Footer />
    </div>
  );
}