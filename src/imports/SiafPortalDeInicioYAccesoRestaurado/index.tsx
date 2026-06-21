import svgPaths from "./svg-rhn40m1ofy";
import imgHeroSection from "./43e866de2b36e1b9b27520aaf6c724923f0a25bd.png";

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 pb-[5px] relative shrink-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">SERVICIO NACIONAL DE ADUANAS - CHILE</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0" data-name="Margin">
      <HorizontalBorder />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[896px] pl-[93.77px] pr-[93.78px] relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-center text-white whitespace-nowrap">
        <p className="leading-[48px] mb-0">Sistema Integral de Aduanas y</p>
        <p className="leading-[48px]">Fronteras</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[896px] pb-[24px] relative shrink-0" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-center px-[309.39px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
        <p className="leading-[29.25px] mb-0">La plataforma digital unificada para la gestión rápida y segura de tránsitos</p>
        <p className="leading-[29.25px]">vehiculares y control de fronteras.</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 min-h-[550px] pb-[215.25px] pt-[119.25px] px-[16px] right-0 top-0" data-name="HeroSection">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[142.73%] left-0 max-w-none top-[-21.36%] w-full" src={imgHeroSection} />
        </div>
        <div className="absolute bg-[rgba(3,22,54,0.85)] inset-0" />
      </div>
      <Margin />
      <Heading1Margin />
      <Margin1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.pcfeeb80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">
        <p className="leading-[32px]">SIAF</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] pb-[0.625px] relative shrink-0 w-[384px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
        <p className="leading-[22.75px] mb-0">Sistema oficial del Gobierno de Chile para la facilitación</p>
        <p className="leading-[22.75px]">del comercio y el tránsito fronterizo.</p>
      </div>
    </div>
  );
}

function FooterLogoDescription() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[22.875px] items-start justify-self-stretch pb-[29.5px] relative row-1 self-start shrink-0" data-name="Footer Logo & Description">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">INSTITUCIONAL</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Aduanas de Chile</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Ministerio de Hacienda</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Transparencia</p>
      </div>
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

function LinksColumn() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Links Column 1">
      <Heading3 />
      <List />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">SOPORTE</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Mesa de Ayuda: 600 570 7040</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Preguntas Frecuentes</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="leading-[20px]">Términos de Uso</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function LinksColumn1() {
  return (
    <div className="col-4 content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Links Column 2">
      <Heading4 />
      <List1 />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1152px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_131px] max-w-[inherit] px-[24px] relative size-full">
        <FooterLogoDescription />
        <LinksColumn />
        <LinksColumn1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.3)] text-center tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">© 2024 SERVICIO NACIONAL DE ADUANAS — GOBIERNO DE CHILE</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="max-w-[1152px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start max-w-[inherit] pt-[33px] px-[24px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#031636] content-stretch flex flex-col gap-[64px] items-start left-0 p-[64px] right-0 top-[1111.5px]" data-name="Footer">
      <Container />
      <HorizontalBorder1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#031636] text-[24px] w-full">
        <p className="leading-[32px]">Acceso al Sistema</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 2:margin">
      <Heading1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[20px]">Elija su método de autenticación preferido.</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container4 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2aec100} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <Svg1 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[12.5px]">INGRESAR CON</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[28px]">ClaveÚnica</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100.02px]" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin3 />
      <Container6 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p25f63580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ClaveUnicaButton() {
  return (
    <div className="bg-[#0056b2] relative rounded-[8px] shrink-0 w-full" data-name="Clave Unica Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container5 />
          <Svg2 />
        </div>
      </div>
    </div>
  );
}

function ClaveUnicaButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Clave Unica Button:margin">
      <ClaveUnicaButton />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">O MEDIANTE</p>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Separator">
      <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      </div>
      <Container9 />
      <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function SeparatorMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Separator:margin">
      <Separator />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">RUT</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal]">12.345.678-9</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[13px] relative size-full">
          <Container11 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">CONTRASEÑA</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal]">********</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[13px] relative size-full">
          <Container13 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#031636] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">¿Olvidó su contraseña?</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#031636] content-stretch flex flex-col items-center justify-center px-[32px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Iniciar Sesión</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Link />
      <Button />
    </div>
  );
}

function CredentialsForm() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Credentials Form">
      <Container10 />
      <Container12 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p>
          <span className="leading-[16px]">{`¿No tiene cuenta? `}</span>
          <span className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#031636]">Registrarse</span>
        </p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p2d61c4c0} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FooterOfCard() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[40px] relative shrink-0 w-full" data-name="Footer of card">
      <Container15 />
      <Svg3 />
    </div>
  );
}

function LeftCardSystemAccess() {
  return (
    <div className="bg-white col-[1/span_7] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="LeftCard - SystemAccess">
      <div className="content-stretch flex flex-col items-start justify-between p-[40px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_0.5px_0] rounded-[12px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="LeftCard - SystemAccess:shadow" />
        <Heading2Margin />
        <Margin2 />
        <ClaveUnicaButtonMargin />
        <SeparatorMargin />
        <CredentialsForm />
        <FooterOfCard />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Acceso Institucional</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-1.25px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
        <p className="leading-[22.75px] mb-0">Si usted es funcionario del Servicio Nacional de Aduanas</p>
        <p className="leading-[22.75px] mb-0">o entidades vinculadas, utilice sus credenciales</p>
        <p className="leading-[22.75px]">institucionales.</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[100.25px] relative shrink-0 w-full" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p213546e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col items-start p-[10px] relative rounded-[8px] shrink-0" data-name="Overlay">
      <Svg4 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Margin">
      <Overlay1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">Soy Funcionario</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[16px]">Acceso a panel de control y auditoría</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.66px]" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Margin5 />
        <Container18 />
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG" opacity="0.4">
          <path d={svgPaths.pf6e8070} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[25px] relative size-full">
          <Container17 />
          <Svg5 />
        </div>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG" opacity="0.5">
          <path d={svgPaths.p15c9f900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg6 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] whitespace-nowrap">
        <p className="leading-[16px]">Encriptación de extremo a extremo AES-256</p>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG" opacity="0.5">
          <path d={svgPaths.p25812600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg7 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] whitespace-nowrap">
        <p className="leading-[16px]">Cumple con Ley 19.628 de Protección de Datos</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[15.5px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function InstitutionalAccessCard() {
  return (
    <div className="bg-[#0f172a] relative rounded-[12px] shrink-0 w-full" data-name="Institutional Access Card">
      <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.5px_0] rounded-[12px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Institutional Access Card:shadow" />
        <Heading3Margin />
        <Margin4 />
        <ButtonMargin />
        <Container21 />
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="col-[8/span_5] content-stretch flex flex-col items-start justify-self-stretch pb-[215.25px] relative row-1 self-start shrink-0" data-name="RightSidebar">
      <InstitutionalAccessCard />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_609.50px] left-[64px] pb-[80px] px-[16px] right-[64px] top-[422px]" data-name="MainContent">
      <LeftCardSystemAccess />
      <RightSidebar />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.pcfeeb80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function PlaceholderForSiafLogo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Placeholder for SIAF Logo">
      <Svg8 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[28px]">SIAF</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Trámites</p>
      </div>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[32px] relative shrink-0" data-name="Link:margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Pasos Fronterizos</p>
      </div>
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[32px] relative shrink-0" data-name="Link:margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Ayuda</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#031636] content-stretch flex flex-col items-center justify-center px-[25px] py-[7px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Ingresar</p>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[32px] relative shrink-0" data-name="Button:margin">
      <Button2 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Nav">
      <Link1 />
      <LinkMargin />
      <LinkMargin1 />
      <ButtonMargin1 />
    </div>
  );
}

function MainHeader() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 px-[24px] py-[16px] top-0 w-[1280px]" data-name="MainHeader">
      <PlaceholderForSiafLogo />
      <Nav />
    </div>
  );
}

export default function SiafPortalDeInicioYAccesoRestaurado() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 248, 252) 0%, rgb(251, 248, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="SIAF - Portal de Inicio y Acceso (Restaurado)">
      <HeroSection />
      <Footer />
      <MainContent />
      <MainHeader />
    </div>
  );
}