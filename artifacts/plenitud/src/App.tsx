import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  Footprints,
  Instagram,
  MapPin,
  MessageCircle,
  Menu,
  MoveUpRight,
  Phone,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState('');
  const [formFeedback, setFormFeedback] = useState('');
  const whatsappMessage = preparedMessage || 'Hola, me gustaría consultar información o pedir cita';
  const whatsappUrl = `https://wa.me/34656683183?text=${encodeURIComponent(whatsappMessage)}`;

  const closeMenu = () => setMenuOpen(false);

  async function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const reason = String(formData.get('reason') ?? '').trim();
    const message = `Hola, soy ${name} (${email}). Me gustaría consultar sobre: ${reason}`;
    setPreparedMessage(message);
    try {
      await navigator.clipboard.writeText(message);
      setFormFeedback('Consulta preparada y copiada. También puedes abrir WhatsApp para enviarla directamente.');
    } catch {
      setFormFeedback('Tu consulta está lista abajo. Puedes copiarla o abrir WhatsApp para enviarla directamente.');
    }
  }

  return (
    <main className="overflow-hidden text-[#113f46]">
      <header className="relative z-20 border-b border-[#113f46]/10 bg-[#f4f1e7]">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <a href="#inicio" aria-label="Plenitud, ir al inicio" className="flex items-center" onClick={closeMenu}>
            <img src="/plenitud-favicon.png" alt="" aria-hidden="true" className="h-9 w-9 rounded-l-sm object-cover sm:h-[42px] sm:w-[42px]" />
            <img data-testid="img-brand-header" src="/plenitud-wordmark.png" alt="Plenitud — Fisioterapia y Readaptación" className="h-9 w-[178px] rounded-r-sm object-cover sm:h-[42px] sm:w-[208px]" />
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-5 lg:flex">
            <a className="text-link text-[.83rem] font-medium" href="#perfil">Quién soy</a>
            <a className="text-link text-[.83rem] font-medium" href="#trayectoria">Trayectoria</a>
            <a className="text-link text-[.83rem] font-medium" href="#servicios">Servicios</a>
            <a className="text-link text-[.83rem] font-medium" href="#enfoque">Nuestro enfoque</a>
            <a className="text-link text-[.83rem] font-medium" href="#acompanamiento">Acompañamiento</a>
            <a className="text-link text-[.83rem] font-medium" href="#preguntas">Preguntas</a>
          </nav>

          <a href="#valoracion" className="hidden items-center gap-2 rounded-full bg-[#d8ab43] px-5 py-3 text-[.77rem] font-semibold text-[#113f46] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e3ba58] lg:inline-flex">
            Hablemos de tu caso <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#113f46]/20 lg:hidden" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Navegación móvil" className="menu-panel absolute inset-x-0 top-full border-b border-[#113f46]/10 bg-[#f4f1e7] px-6 pb-6 pt-3 shadow-lg lg:hidden">
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#perfil">Quién soy</a>
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#trayectoria">Trayectoria deportiva</a>
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#servicios">Servicios</a>
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#enfoque">Nuestro enfoque</a>
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#acompanamiento">Acompañamiento</a>
            <a onClick={closeMenu} className="block border-b border-[#113f46]/10 py-4 text-sm" href="#preguntas">Preguntas frecuentes</a>
            <a onClick={closeMenu} className="mt-5 flex items-center justify-between rounded-full bg-[#d8ab43] px-5 py-4 text-sm font-semibold text-[#113f46]" href="#valoracion">Dar el primer paso <ArrowUpRight size={17} /></a>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative bg-[#f4f1e7] pb-14 pt-9 md:pb-20 md:pt-12">
        <div className="page-wrap grid items-center gap-9 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <div className="relative z-10 py-5 md:py-10">
            <p className="eyebrow reveal mb-6 flex items-center gap-2 text-[#50715e]"><span className="h-px w-7 bg-[#d8ab43]" /> Fisioterapia · Movimiento · Confianza</p>
            <h1 className="font-display reveal reveal-delay max-w-[650px] text-[clamp(3.35rem,7.1vw,6.25rem)] font-semibold leading-[.99] tracking-[-.075em]">
              Volver a moverte. <span className="font-editorial font-medium italic text-[#8d6c21]">A tu manera.</span>
            </h1>
            <p className="reveal reveal-late mt-7 max-w-[440px] text-[1.03rem] leading-[1.8] text-[#526258] md:text-[1.12rem]">
              Te acompañamos a recuperar confianza en tu cuerpo y regresar, paso a paso, a las cosas que te hacen sentir bien.
            </p>
            <div className="reveal reveal-late mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#valoracion" className="group inline-flex items-center gap-3 rounded-full bg-[#d8ab43] px-6 py-4 text-sm font-semibold text-[#113f46] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e3ba58]">
                Cuéntanos qué necesitas <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#perfil" className="text-link text-sm font-semibold">Conoce quién te acompaña</a>
            </div>
            <div className="mt-12 flex items-center gap-3 text-[#637268]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#113f46]/20"><MoveUpRight size={16} /></span>
              <span className="text-xs leading-relaxed">Un proceso pensado para ti,<br />no solo para tu lesión.</span>
            </div>
          </div>
          <div className="relative lg:pl-3">
            <div className="absolute -right-4 -top-6 h-32 w-32 rounded-full bg-[#d7dfce] md:-right-8 md:-top-8 md:h-48 md:w-48" aria-hidden="true" />
            <div className="relative h-[370px] overflow-hidden rounded-t-[48%] rounded-b-[1.75rem] md:h-[550px]">
              <img src="/plenitud-hero.jpg" alt="Una persona realiza un ejercicio de movilidad con luz natural en un espacio sereno" className="h-full w-full object-cover object-[52%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183b30]/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#fffaf0] md:bottom-8 md:left-8 md:right-8">
                <p className="max-w-[190px] font-editorial text-[1.75rem] leading-[1.05] md:text-[2rem]">El movimiento también es volver a confiar.</p>
                <span className="hidden rounded-full border border-white/45 px-3 py-2 text-[.65rem] tracking-[.1em] sm:block">VOLVER A TI</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rotate-[-7deg] rounded-full bg-[#d8ab43] px-5 py-3 text-[.7rem] font-bold uppercase tracking-[.12em] text-[#113f46] shadow-md md:block">Con calma. Con intención.</div>
          </div>
        </div>
      </section>

      <section aria-label="Nuestra manera de acompañar" className="bg-[#113f46] py-6 text-[#f4f1e7] md:py-7">
        <div className="page-wrap flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-editorial text-[1.35rem] italic md:text-[1.65rem]">No se trata solo de quitar el dolor.</p>
          <span className="hidden h-px flex-1 bg-[#f4f1e7]/20 md:mx-9 md:block" />
          <p className="text-center text-[.73rem] tracking-[.035em] text-[#d6dfd3] md:text-right">Se trata de recuperar lo que el dolor te ha quitado.</p>
        </div>
      </section>

      <section id="perfil" className="relative overflow-hidden bg-[#f4f1e7] pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="page-wrap">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-5 text-[#778b78]">01 — Sobre mí · Perfil profesional</p>
              <h2 className="font-display max-w-[420px] text-[clamp(2.4rem,4.8vw,4.1rem)] font-semibold leading-[1.02] tracking-[-.065em]">La recuperación se hace <span className="font-editorial font-medium italic text-[#8d6c21]">en equipo.</span></h2>
              <p className="mt-6 max-w-[430px] text-[1rem] leading-[1.9] text-[#637268]">Graduado en Fisioterapia por la Universidad de Cádiz (n.º de colegiado 12.814). Mi vocación es acompañar a cada paciente en su proceso de recuperación, desde el alivio del dolor hasta la readaptación completa a su día a día y a su práctica deportiva, con un enfoque riguroso y personalizado.</p>
              <div className="mt-8 inline-flex items-center gap-3 border-t border-[#113f46]/15 pt-5 text-sm text-[#526258]">
                <span className="font-editorial text-2xl italic text-[#8d6c21]">12.814</span>
                <span>N.º de colegiado · Colegio de Fisioterapeutas</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-[#d9dfd0]" aria-hidden="true" />
              <figure className="relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[1.5rem] bg-[#d9dfd0] lg:ml-auto">
                <img src="/perfil-graduacion.jpg" alt="Retrato del fisioterapeuta de Plenitud con la beca académica de graduación" loading="lazy" className="h-full w-full object-cover object-top" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/85 to-transparent px-6 pb-5 pt-16 text-sm font-medium text-white">Graduado en Fisioterapia por la Universidad de Cádiz.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="trayectoria" className="bg-[#f4f1e7] pb-20 md:pb-28">
        <div className="page-wrap border-t border-[#113f46]/15 pt-10 md:pt-14">
          <div className="grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div><p className="eyebrow mb-4 text-[#778b78]">02 — Trayectoria deportiva · Deporte local y trabajo diario</p><h2 className="font-display max-w-[490px] text-[clamp(2rem,4vw,3.45rem)] font-semibold leading-[1.05] tracking-[-.06em]">Siete años al lado del fútbol.</h2></div>
            <p className="max-w-[620px] text-sm leading-[1.85] text-[#637268]">Con siete años de trayectoria en el mundo del fútbol, mi compromiso con el deporte local se fundamenta en el trabajo diario con dos entidades clave de nuestra tierra.</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <figure className="relative aspect-[3/2] overflow-hidden rounded-[1.4rem] bg-[#d9dfd0]">
              <img src="/ad-mosqueo-equipo.jpg" alt="Plantilla y cuerpo técnico de la A.D. Mosqueo reunidos en el campo de fútbol" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/90 via-[#113f46]/45 to-transparent px-6 pb-5 pt-20 text-sm text-white"><strong className="block text-base">A.D. Mosqueo · 7 años</strong>Trabajo en el cuerpo médico, junto al equipo y su cuerpo técnico.</figcaption>
            </figure>
            <figure className="relative aspect-[3/2] overflow-hidden rounded-[1.4rem] bg-[#d9dfd0]">
              <img src="/ad-mosqueo-accion.jpg" alt="Trabajo de readaptación en el campo de la A.D. Mosqueo con un balón de pilates" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/90 via-[#113f46]/40 to-transparent px-6 pb-5 pt-16 text-sm font-medium text-white">Readaptación deportiva en el campo de entrenamiento.</figcaption>
            </figure>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-[.95fr_1.05fr] md:items-stretch">
            <article className="flex flex-col justify-center rounded-[1.4rem] bg-[#e9e8dc] p-6 md:p-8">
              <p className="eyebrow text-[#778b78]">Formación de base</p>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-.04em]">C.D. La Unión <span className="font-editorial font-medium italic text-[#8d6c21]">· 6 años</span></h3>
              <p className="mt-3 text-sm leading-[1.8] text-[#637268]">Cuidado, educación y prevención de lesiones en jóvenes durante su etapa de formación.</p>
            </article>
            <figure className="relative aspect-[13/11] overflow-hidden rounded-[1.4rem] bg-[#d9dfd0]">
              <img src="/cd-la-union-atencion.jpg" alt="El fisioterapeuta atiende a una joven jugadora en el campo durante su etapa en C.D. La Unión" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/85 to-transparent px-6 pb-5 pt-16 text-sm font-medium text-white">Atención y prevención de lesiones en el campo.</figcaption>
            </figure>
          </div>
          <div className="mt-7 flex flex-col gap-4 border-t border-[#113f46]/15 pt-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[760px] font-editorial text-[1.45rem] leading-[1.35] text-[#527061] md:text-[1.7rem]">Una visión práctica y orientada a resultados reales para deportistas y pacientes de cualquier disciplina.</p>
            <a href="#servicios" className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-semibold">Conoce nuestros servicios <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-[#e9e8dc] py-20 md:py-28">
        <div className="page-wrap">
          <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5 text-[#778b78]">03 — En qué podemos ayudarte</p>
              <h2 className="font-display max-w-[650px] text-[clamp(2.3rem,4.6vw,4.1rem)] font-semibold leading-[1.05] tracking-[-.065em]">Un punto de partida para volver a lo que te mueve.</h2>
            </div>
            <p className="max-w-[320px] pb-1 text-sm leading-[1.75] text-[#637268]">Cada proceso comienza donde estás hoy y avanza hacia lo que quieres recuperar.</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:gap-20">
            <div className="divide-y divide-[#113f46]/15">
              <article className="service-card group grid gap-3 py-6 md:grid-cols-[54px_1fr_auto] md:items-center md:gap-7">
                <span className="font-editorial text-xl italic text-[#8d6c21]">01</span>
                <div><h3 className="font-display text-xl font-semibold tracking-[-.04em]">Fisioterapia</h3><p className="mt-2 max-w-[475px] text-sm leading-[1.7] text-[#657368]">Entender lo que te ocurre, aliviar lo que te limita y darte herramientas para cuidarte mejor.</p></div>
                <CircleDot className="hidden text-[#527061] transition-transform group-hover:rotate-45 md:block" size={22} />
              </article>
              <article className="service-card group grid gap-3 py-6 md:grid-cols-[54px_1fr_auto] md:items-center md:gap-7">
                <span className="font-editorial text-xl italic text-[#8d6c21]">02</span>
                <div><h3 className="font-display text-xl font-semibold tracking-[-.04em]">Readaptación al movimiento</h3><p className="mt-2 max-w-[475px] text-sm leading-[1.7] text-[#657368]">Recuperar fuerza, capacidad y seguridad para regresar a tu actividad, con progresiones que tengan sentido para ti.</p></div>
                <Footprints className="hidden text-[#527061] transition-transform group-hover:translate-x-1 md:block" size={22} />
              </article>
              <article className="service-card group grid gap-3 py-6 md:grid-cols-[54px_1fr_auto] md:items-center md:gap-7">
                <span className="font-editorial text-xl italic text-[#8d6c21]">03</span>
                <div><h3 className="font-display text-xl font-semibold tracking-[-.04em]">Prevención y autonomía</h3><p className="mt-2 max-w-[475px] text-sm leading-[1.7] text-[#657368]">Aprender a escuchar tu cuerpo y contar con recursos para seguir haciendo lo que disfrutas.</p></div>
                <Check className="hidden text-[#527061] transition-transform group-hover:scale-110 md:block" size={22} />
              </article>
            </div>
            <aside className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#d9dfd0] p-7 md:min-h-[390px] md:p-9">
              <div aria-hidden="true" className="absolute -right-20 -top-16 h-64 w-64 rounded-full border border-[#113f46]/15"><div className="absolute inset-8 rounded-full border border-[#113f46]/15" /><div className="absolute inset-16 rounded-full border border-[#113f46]/15" /></div>
              <p className="eyebrow relative text-[#637b69]">Un proceso, no una receta</p>
              <div className="relative mt-24 max-w-[320px]">
                <p className="font-editorial text-[2.15rem] leading-[1.06] md:text-[2.65rem]">La meta no es aguantar más.</p>
                <p className="mt-5 max-w-[260px] text-sm leading-[1.75] text-[#53675b]">Es tener opciones, recuperar capacidad y sentirte parte activa de tu recuperación.</p>
              </div>
              <div className="absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#d8ab43] text-[#113f46]"><MoveUpRight size={19} /></div>
            </aside>
          </div>
          <div className="mt-16 grid items-center gap-8 border-t border-[#113f46]/15 pt-12 md:mt-20 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:pt-16">
            <div className="max-w-[430px]">
              <p className="eyebrow mb-5 text-[#778b78]">Tecnología en consulta</p>
              <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-.06em]">Ecógrafo en el tratamiento de lesiones.</h3>
              <p className="mt-5 text-sm leading-[1.8] text-[#637268]">Ecografía en consulta: precisión en tiempo real. Utilizamos la ecografía durante el proceso de recuperación para observar el tejido, seguir la evolución de la lesión y comprobar cómo responde el cuerpo al tratamiento.</p>
            </div>
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[1.5rem] bg-[#d9dfd0] md:justify-self-end">
              <img src="/ecografo-consulta.jpg" alt="Profesional de fisioterapia utilizando el ecógrafo en consulta." loading="lazy" className="h-full w-full object-cover object-center" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/80 via-[#113f46]/20 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">Ecógrafo en consulta</figcaption>
            </figure>
          </div>
          <div className="mt-16 grid gap-8 border-t border-[#113f46]/15 pt-12 md:mt-20 md:grid-cols-[1.2fr_.8fr] md:items-center md:gap-16 md:pt-16">
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-[590px] overflow-hidden rounded-[1.5rem] bg-[#d9dfd0] md:mx-0">
              <img src="/dinamometria.jpg" alt="Evaluación de fuerza isométrica con dinamómetro de tracción y registro en una tableta" loading="lazy" className="h-full w-full object-cover object-center" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/80 via-[#113f46]/20 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">Medir para orientar el siguiente paso.</figcaption>
            </figure>
            <div className="max-w-[450px]">
              <p className="eyebrow mb-4 text-[#778b78]">Evaluación objetiva</p>
              <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-.06em]">Dinamómetro de fuerza.</h3>
              <p className="mt-5 text-sm leading-[1.85] text-[#637268]">Empleamos un dinamómetro de tracción de alta precisión para medir la fuerza isométrica de la musculatura, comparar el rendimiento de ambos miembros, detectar posibles déficits y diseñar un plan de readaptación medible y seguro.</p>
            </div>
          </div>
          <div className="mt-16 grid gap-8 border-t border-[#113f46]/15 pt-12 md:mt-20 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-16 md:pt-16">
            <div className="max-w-[450px] md:order-1">
              <p className="eyebrow mb-4 text-[#778b78]">Recuperar también es descansar</p>
              <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-.06em]">Presoterapia para la recuperación muscular.</h3>
              <p className="mt-5 text-sm leading-[1.85] text-[#637268]">Integramos tecnología de presoterapia en consulta para acompañar la recuperación física, favorecer el retorno venoso y el drenaje linfático y ayudar a aliviar la sensación de fatiga muscular tras el esfuerzo o una lesión.</p>
            </div>
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-[590px] overflow-hidden rounded-[1.5rem] bg-[#d9dfd0] md:mx-0 md:order-2">
              <img src="/presoterapia.jpg" alt="Deportista en sesión de presoterapia con botas de compresión en consulta" loading="lazy" className="h-full w-full object-cover object-center" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/80 via-[#113f46]/20 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">Tecnología como parte de un proceso acompañado.</figcaption>
            </figure>
          </div>
          <div className="home-care-panel mt-16 overflow-hidden rounded-[1.5rem] border border-[#113f46]/10 md:mt-20">
            <div className="grid md:grid-cols-[.88fr_1.12fr]">
              <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-3 overflow-hidden bg-[#d9dfd0] p-5 md:min-h-[450px] md:p-6">
                <div aria-hidden="true" className="care-rings absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#527061]/25"><div className="absolute inset-7 rounded-full border border-[#527061]/25" /><div className="absolute inset-14 rounded-full border border-[#527061]/25" /><div className="absolute inset-21 rounded-full border border-[#527061]/25" /></div>
                <p className="eyebrow relative z-10 w-full max-w-[260px] text-[#527061]">En casa, a tu ritmo</p>
                <figure className="relative z-10 w-full max-w-[260px] overflow-hidden rounded-[1.2rem] bg-[#fbf9f2] shadow-[0_16px_36px_rgba(32,61,50,.12)]">
                  <img src="/domicilio-ejercicio.jpg" alt="Persona mayor realizando un ejercicio de fuerza con una mancuerna, acompañada por una fisioterapeuta" loading="lazy" className="block h-auto w-full" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#113f46]/85 to-transparent px-4 pb-4 pt-12 text-xs font-medium text-white">Ejercicio de fuerza adaptado.</figcaption>
                </figure>
              </div>
              <div className="bg-[#fbf9f2] p-7 md:p-10">
                <p className="eyebrow mb-4 text-[#778b78]">Fisioterapia cercana</p>
                <h3 className="font-display max-w-[480px] text-[clamp(1.8rem,3.2vw,2.7rem)] font-semibold leading-[1.08] tracking-[-.055em]">Fisioterapia a domicilio para personas mayores.</h3>
                <p className="mt-5 max-w-[620px] text-sm leading-[1.9] text-[#637268]">El paso de los años no debe ser un freno para mantener la autonomía. Mediante programas personalizados de ejercicio terapéutico a domicilio, nos centramos en mantener o recuperar la funcionalidad diaria, mejorar la movilidad, prevenir caídas y ganar fuerza y seguridad en las tareas cotidianas.</p>
                <a href="#valoracion" className="text-link mt-6 inline-flex items-center gap-2 text-sm font-semibold">Consultar sobre atención a domicilio <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="enfoque" className="relative bg-[#fbf9f2] py-20 md:py-32">
        <div className="page-wrap grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-24">
          <div className="pt-2">
            <p className="eyebrow mb-5 text-[#778b78]">04 — Una mirada completa</p>
            <p className="max-w-[255px] font-editorial text-[1.75rem] leading-[1.13] text-[#527061]">Tu historia importa tanto como el lugar que te duele.</p>
          </div>
          <div>
            <h2 className="font-display max-w-[800px] text-[clamp(2.25rem,4.8vw,4.15rem)] font-semibold leading-[1.08] tracking-[-.065em]">No eres una lesión. Eres mucho más que eso.</h2>
            <p className="mt-7 max-w-[690px] text-[1.04rem] leading-[1.9] text-[#637268]">
              Escuchamos lo que te pasa, entendemos lo que quieres volver a hacer y construimos contigo un camino realista. Porque recuperarte no debería consistir en perseguir una cifra: debería acercarte a una vida con más movimiento y menos miedo.
            </p>
            <a href="#acompanamiento" className="text-link mt-8 inline-flex items-center gap-2 text-sm font-semibold">Así te acompañamos <ArrowDown size={15} /></a>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-[8%] hidden h-36 w-36 rounded-full border border-[#d7dfce] md:block">
          <div className="absolute inset-5 rounded-full border border-[#d7dfce]" /><div className="absolute inset-10 rounded-full border border-[#d7dfce]" />
        </div>
      </section>

      <section id="acompanamiento" className="bg-[#fbf9f2] py-20 md:py-28">
        <div className="page-wrap">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_.7fr]">
            <div><p className="eyebrow mb-5 text-[#778b78]">05 — El camino se hace contigo</p><h2 className="font-display max-w-[600px] text-[clamp(2.3rem,4.6vw,4rem)] font-semibold leading-[1.05] tracking-[-.065em]">Pequeños pasos. Cambios que se sienten.</h2></div>
            <p className="max-w-[390px] text-sm leading-[1.8] text-[#637268] md:justify-self-end">No hay dos cuerpos iguales ni dos procesos idénticos. El plan se adapta a tu punto de partida y evoluciona contigo.</p>
          </div>
          <div className="mt-14 grid gap-8 border-t border-[#113f46]/15 pt-7 md:grid-cols-3 md:gap-12">
            <article className="relative md:pt-8"><span className="font-editorial text-[3.25rem] italic leading-none text-[#8d6c21]">01</span><h3 className="font-display mt-5 text-lg font-semibold">Te escuchamos</h3><p className="mt-3 max-w-[300px] text-sm leading-[1.8] text-[#637268]">Conocemos tu experiencia, tus dudas y eso a lo que quieres volver.</p></article>
            <article className="relative md:pt-8"><span className="font-editorial text-[3.25rem] italic leading-none text-[#8d6c21]">02</span><h3 className="font-display mt-5 text-lg font-semibold">Lo ponemos en contexto</h3><p className="mt-3 max-w-[300px] text-sm leading-[1.8] text-[#637268]">Exploramos tu movimiento y acordamos contigo prioridades claras.</p></article>
            <article className="relative md:pt-8"><span className="font-editorial text-[3.25rem] italic leading-none text-[#8d6c21]">03</span><h3 className="font-display mt-5 text-lg font-semibold">Avanzamos en equipo</h3><p className="mt-3 max-w-[300px] text-sm leading-[1.8] text-[#637268]">Ajustamos el plan según cómo respondes y lo que vas necesitando.</p></article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#113f46] py-20 text-[#f4f1e7] md:py-28">
        <div aria-hidden="true" className="absolute -right-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-[#f4f1e7]/10 md:right-[7%] md:h-[520px] md:w-[520px]"><div className="absolute inset-8 rounded-full border border-[#f4f1e7]/10" /><div className="absolute inset-16 rounded-full border border-[#f4f1e7]/10" /><div className="absolute inset-24 rounded-full border border-[#f4f1e7]/10" /></div>
        <div className="page-wrap relative">
          <p className="eyebrow mb-7 text-[#c9d4bc]">06 — Tu vida, en movimiento</p>
          <div className="grid gap-10 md:grid-cols-[1.08fr_.72fr] md:items-end">
            <h2 className="font-display max-w-[770px] text-[clamp(2.8rem,7vw,6.1rem)] font-semibold leading-[.98] tracking-[-.075em]">Que tu mundo no se haga más pequeño.</h2>
            <div className="max-w-[390px]">
              <p className="font-editorial text-[1.6rem] leading-[1.16] text-[#d6dfd3]">Caminar sin pensarlo. Entrenar con confianza. Disfrutar de tu día.</p>
              <p className="mt-5 text-sm leading-[1.8] text-[#c9d4bc]">Lo importante no es volver exactamente a antes. Es avanzar hacia una forma de moverte que te dé seguridad hoy.</p>
            </div>
          </div>
          <a href="#valoracion" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#d8ab43] px-6 py-4 text-sm font-semibold text-[#113f46] transition hover:-translate-y-0.5 hover:bg-[#e3ba58]">Hablemos de tu siguiente paso <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
        </div>
      </section>

      <section id="preguntas" className="bg-[#e9e8dc] py-20 md:py-28">
        <div className="page-wrap grid gap-12 md:grid-cols-[.65fr_1.35fr] md:gap-24">
          <div><p className="eyebrow mb-5 text-[#778b78]">07 — Antes de empezar</p><h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-.06em]">Es normal tener preguntas.</h2><p className="mt-5 max-w-[280px] text-sm leading-[1.8] text-[#637268]">Y también está bien empezar por hacerlas.</p></div>
          <div className="divide-y divide-[#113f46]/15">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">¿Tengo que saber qué me pasa antes de venir?<ChevronDown size={19} className="shrink-0 text-[#527061] transition-transform group-open:rotate-180" /></summary>
              <p className="max-w-[630px] pt-4 text-sm leading-[1.8] text-[#637268]">No. Podemos empezar escuchando lo que sientes y lo que te gustaría recuperar. La valoración ayuda a entender mejor tu situación y decidir juntos los siguientes pasos.</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">¿El plan será igual para todo el mundo?<ChevronDown size={19} className="shrink-0 text-[#527061] transition-transform group-open:rotate-180" /></summary>
              <p className="max-w-[630px] pt-4 text-sm leading-[1.8] text-[#637268]">No. El proceso se plantea a partir de tu historia, tus objetivos, tu contexto y cómo vas respondiendo. Lo revisamos contigo a medida que avanzas.</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">¿Y si todavía me da miedo volver a moverme?<ChevronDown size={19} className="shrink-0 text-[#527061] transition-transform group-open:rotate-180" /></summary>
              <p className="max-w-[630px] pt-4 text-sm leading-[1.8] text-[#637268]">No tienes que resolverlo antes de empezar. La confianza también se construye, con comprensión, conversación y pasos que tengan sentido para ti.</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">¿Cómo puedo pedir una valoración?<ChevronDown size={19} className="shrink-0 text-[#527061] transition-transform group-open:rotate-180" /></summary>
              <p className="max-w-[630px] pt-4 text-sm leading-[1.8] text-[#637268]">Puedes llamarnos o escribirnos por Instagram o WhatsApp. El formulario prepara un texto para copiarlo o llevarlo a WhatsApp; no envía ni almacena tus datos.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="valoracion" className="bg-[#f4f1e7] py-20 md:py-28">
        <div className="page-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-5 text-[#778b78]">08 — El primer paso puede ser pequeño</p>
            <h2 className="font-display max-w-[540px] text-[clamp(2.5rem,5.4vw,4.8rem)] font-semibold leading-[1] tracking-[-.07em]">Empecemos por escucharte.</h2>
            <p className="mt-6 max-w-[390px] text-base leading-[1.8] text-[#637268]">Cuéntanos qué te gustaría recuperar. Sin compromiso, sin prisa; una conversación para saber por dónde empezar.</p>
            <p className="mt-5 max-w-[430px] text-sm leading-[1.8] text-[#637268]">¿Prefieres hablar directamente? Si tienes dudas sobre tu lesión o quieres consultar disponibilidad para nuestra nueva clínica, escríbeme directamente por WhatsApp y te responderé con total inmediatez.</p>
            <div className="mt-9 space-y-4">
              <a data-testid="link-contact-phone" href="tel:+34656683183" className="group flex items-center gap-3 text-sm font-semibold transition-colors hover:text-[#0b5961]" aria-label="Llamar a Plenitud al 656 683 183">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e8dc] text-[#113f46]"><Phone size={17} aria-hidden="true" /></span>
                <span data-testid="text-contact-phone">656 683 183</span>
              </a>
              <a data-testid="link-contact-instagram" href="https://www.instagram.com/fisio_plenitud/" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm font-semibold transition-colors hover:text-[#0b5961]" aria-label="Visitar Instagram de Plenitud">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e8dc] text-[#113f46]"><Instagram size={17} aria-hidden="true" /></span>
                <span data-testid="text-contact-instagram">@fisio_plenitud</span>
              </a>
              <a data-testid="link-contact-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm font-semibold transition-colors hover:text-[#0b5961]" aria-label="Escribir a Plenitud por WhatsApp">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e8dc] text-[#113f46]"><MessageCircle size={17} aria-hidden="true" /></span>
                <span>Escribir por WhatsApp · 656 683 183</span>
              </a>
              <a data-testid="link-contact-address" href="https://maps.google.com/?q=Santiaho%20Heras%201%2C%20Los%20Palacios%20y%20Villafranca%2C%20Sevilla" target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-sm leading-[1.7] transition-colors hover:text-[#0b5961]" aria-label="Ver dirección de Plenitud en el mapa">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e8dc] text-[#113f46]"><MapPin size={17} aria-hidden="true" /></span>
                <span data-testid="text-contact-address"><span className="font-semibold">Santiaho Heras, nº 1 · planta 1 · módulo 2</span><br /><span className="text-[#637268]">Los Palacios y Villafranca, Sevilla</span></span>
              </a>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-[#fbf9f2] p-6 shadow-[0_20px_60px_rgba(32,61,50,.06)] md:p-10">
            <form onSubmit={prepareEnquiry} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-[#526258]">Tu nombre
                  <input data-testid="input-contact-name" name="name" required autoComplete="name" className="mt-2.5 block w-full rounded-xl border border-[#d5d9ce] bg-transparent px-4 py-3.5 text-sm text-[#113f46] placeholder:text-[#9aa49a] focus:border-[#527061] focus:outline-none focus:ring-2 focus:ring-[#527061]/20" placeholder="Cómo te llamamos" />
                </label>
                <label className="block text-xs font-semibold text-[#526258]">Tu correo
                  <input data-testid="input-contact-email" name="email" type="email" required autoComplete="email" className="mt-2.5 block w-full rounded-xl border border-[#d5d9ce] bg-transparent px-4 py-3.5 text-sm text-[#113f46] placeholder:text-[#9aa49a] focus:border-[#527061] focus:outline-none focus:ring-2 focus:ring-[#527061]/20" placeholder="nombre@correo.com" />
                </label>
              </div>
              <label className="block text-xs font-semibold text-[#526258]">¿Qué te gustaría consultar?
                <textarea data-testid="input-contact-reason" name="reason" required rows={4} className="mt-2.5 block w-full resize-y rounded-xl border border-[#d5d9ce] bg-transparent px-4 py-3.5 text-sm leading-[1.7] text-[#113f46] placeholder:text-[#9aa49a] focus:border-[#527061] focus:outline-none focus:ring-2 focus:ring-[#527061]/20" placeholder="Por ejemplo, qué actividad quieres retomar o qué te gustaría entender mejor." />
              </label>
              <button data-testid="button-prepare-enquiry" type="submit" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d8ab43] px-6 py-4 text-sm font-semibold text-[#113f46] transition hover:bg-[#e3ba58] sm:w-auto">
                Preparar mi consulta <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-xs leading-[1.7] text-[#7b877e]">Este formulario no envía ni almacena tus datos. Prepara un texto para copiarlo o llevarlo contigo a WhatsApp.</p>
              {formFeedback && <p role="status" aria-live="polite" className="rounded-xl border border-[#c9d4bc] bg-[#e9eee4] p-4 text-sm leading-[1.7] text-[#31523f]">{formFeedback}</p>}
              {preparedMessage && <label className="block text-xs font-semibold text-[#526258]">Tu consulta lista para copiar
                <textarea data-testid="textarea-prepared-message" readOnly rows={3} value={preparedMessage} onFocus={(event) => event.currentTarget.select()} className="mt-2.5 block w-full rounded-xl border border-[#d5d9ce] bg-[#f4f1e7] px-4 py-3.5 text-sm leading-[1.7] text-[#113f46]" />
                <span className="mt-2 flex items-center gap-1.5 font-normal text-[#7b877e]"><Copy size={13} aria-hidden="true" /> Selecciona el texto para copiarlo manualmente.</span>
              </label>}
              <a data-testid="link-form-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#527061]/35 px-6 py-4 text-sm font-semibold text-[#31523f] transition hover:bg-[#e9eee4] sm:w-auto" aria-label="Abrir WhatsApp con tu consulta preparada">
                <MessageCircle size={17} aria-hidden="true" /> Hablar directamente por WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#113f46] py-10 text-[#f4f1e7] md:py-12">
        <div className="page-wrap">
          <div className="flex flex-col justify-between gap-8 border-b border-[#f4f1e7]/15 pb-9 md:flex-row md:items-end">
            <div>
              <a href="#inicio" aria-label="Plenitud, volver al inicio" className="inline-flex items-center">
                <img src="/plenitud-favicon.png" alt="" aria-hidden="true" className="h-10 w-10 rounded-l-sm object-cover sm:h-[46px] sm:w-[46px]" />
                <img data-testid="img-brand-footer" src="/plenitud-wordmark.png" alt="Plenitud — Fisioterapia y Readaptación" className="h-10 w-[198px] rounded-r-sm object-cover sm:h-[46px] sm:w-[228px]" />
              </a>
              <p className="mt-4 text-sm text-[#c9d4bc]">Fisioterapia y readaptación al movimiento.</p>
            </div>
            <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#d6dfd3]">
              <a className="hover:text-white" href="#perfil">Quién soy</a><a className="hover:text-white" href="#trayectoria">Trayectoria</a><a className="hover:text-white" href="#servicios">Servicios</a><a className="hover:text-white" href="#enfoque">Enfoque</a><a className="hover:text-white" href="#preguntas">Preguntas</a><a className="hover:text-white" href="#valoracion">Contacto</a>
            </nav>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-5 text-[.68rem] text-[#b9c8bc] sm:flex-row">
            <p>© {new Date().getFullYear()} Plenitud. Una forma más amable de volver a moverte.</p>
            <p>Los Palacios y Villafranca · Sevilla</p>
          </div>
        </div>
      </footer>
      <a data-testid="link-floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar con Plenitud por WhatsApp" className="whatsapp-float fixed bottom-5 right-5 z-30 inline-flex items-center gap-2.5 rounded-full bg-[#315c49] px-4 py-3.5 text-sm font-semibold text-[#fbf9f2] shadow-[0_10px_30px_rgba(17,63,70,.22)] transition duration-200 hover:-translate-y-1 hover:bg-[#244b3a] sm:bottom-7 sm:right-7 sm:px-5">
        <MessageCircle size={19} aria-hidden="true" /><span className="hidden sm:inline">Hablemos por WhatsApp</span><span className="sm:hidden">WhatsApp</span>
      </a>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
