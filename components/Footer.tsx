import Link from 'next/link'
import Image from 'next/image'
import { nav, site, yearsOfExperience } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo-vatteone.png"
                alt=""
                width={633}
                height={1024}
                className="h-11 w-auto brightness-0 invert"
              />
              <span className="leading-none">
                <span className="block font-display text-[21px] tracking-tight">
                  Estudio Vatteone
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  Fundado en {site.foundedYear}
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-paper/60">
              {yearsOfExperience} años brindando un servicio responsable,
              eficiente y honesto en el ámbito contable.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40">
              Navegación
            </p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[15px] text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40">
              Contacto
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-paper/80">
              <li>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-paper"
                >
                  {site.address}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline break-all transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${site.phoneRaw}`}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-paper"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-8 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Estudio Vatteone. Todos los derechos
            reservados.
          </p>
          <p>{site.city}</p>
        </div>
      </div>
    </footer>
  )
}
