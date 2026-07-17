import Image from 'next/image'
import { urlFor } from '@/lib/sanity/imageUrl'

interface InvestorItem {
  _id: string
  name: string
  logo: any // Sanity image
  website?: string
}

interface InvestorsSectionProps {
  title: string
  investors: InvestorItem[]
}

export function InvestorsSection({ title, investors }: InvestorsSectionProps) {
  if (!investors.length) return null

  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-main">
        <h2 className="text-center text-lg text-white/40 mb-10">{title}</h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {investors.map((inv) => {
            const content = (
              <div className="group flex items-center justify-center h-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={urlFor(inv.logo).width(160).height(48).url()}
                  alt={inv.name}
                  width={160}
                  height={48}
                  className="h-8 w-auto object-contain"
                />
              </div>
            )

            if (inv.website) {
              return (
                <a
                  key={inv._id}
                  href={inv.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={inv.name}
                >
                  {content}
                </a>
              )
            }

            return <div key={inv._id}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}
