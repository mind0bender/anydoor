import HomeHero from "@/components/HomeHero";
import Image from "next/image";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import {
  ArrowRight,
  Flower,
  Scissors,
  Wrench,
  Smile,
  Star,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

interface Category {
  title: string;
  locations: number;
  icon: ReactNode;
  tone: string;
  slug: string;
}

interface FeaturedBusiness {
  name: string;
  description: string;
  rating: number;
  image: string;
  cta: string;
  href: string;
}

interface ProofItem {
  timeAgo: string;
  copy: string;
  icon: ReactNode;
  accent: string;
}

const categories: Category[] = [
  {
    title: "Spa",
    locations: 124,
    icon: <Flower />,
    tone: "bg-emerald-100 text-emerald-900",
    slug: "spa",
  },
  {
    title: "Hair Salon",
    locations: 89,
    icon: <Scissors />,
    tone: "bg-lime-100 text-lime-900",
    slug: "hair-salon",
  },
  {
    title: "Auto Repair",
    locations: 45,
    icon: <Wrench />,
    tone: "bg-orange-100 text-orange-900",
    slug: "auto-repair",
  },
  {
    title: "Dentist",
    locations: 62,
    icon: <Smile />,
    tone: "bg-teal-100 text-teal-900",
    slug: "dentist",
  },
];

const featured: FeaturedBusiness[] = [
  {
    name: "The Nordic Cut",
    description: "Precision styling & sustainable care",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmNLhCAXXV8beY2qoGdd699NNEE2ZJuDPXuOo8jxYYIr-9lzlZTlV6LwA2sN-mmJqabohY4eNrmUrilNy6uvt2zqhQRolZwEndb4UTZ_DSo-5QApILWC0mZqYAyhtxU0rC9C4OdimyneEvp0THSmmbWgjNmMdunaNIF2z_NzCjKU8SqqSefDFDggjt4XPALzY7kGCgUA2f8pf0vCJmC_MJjCgIxiirhFd-wXXHHjoBPGMCGk6O1B8Mp4Sn3qyCA2Yc2y8Er2VZTvqk",
    cta: "Book Consultation",
    href: "/discover/hair-salon/nordic-cut",
  },
  {
    name: "Precision Garage",
    description: "Performance tuning & concierge service",
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDqVEEMHHmMLcpBSmo6oAAxZDEu2-vqoBAZ8hCbs3qt8tCa4RLEwVSrzBZ-3EPORIhwlDIO1J_i7FBhg8_r1gTIFgp03-C9nGBqx1ivuwqWaP6hcQHsejMLPR6p_ZgheVwLq1IfzwOtgWoG2CvDz2YQW8iaQ-C_j6zbmFr37QXkNOYUigC_g3lgVZDxh15tr1Ecz0Cvp5EOz4ZzHjpjR6PKkFwfGghQz9-mgi_DWc3AemOrTJLM9ieKqQmkcyHx8ni1x9Tg6rlZbLA",
    cta: "Schedule Service",
    href: "/discover/auto-repair/precision-garage",
  },
  {
    name: "Bloom Wellness",
    description: "Holistic health & restorative practice",
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCO0_O9c6TdhGRxXzQpeA1mHbG7ckMqlhIfjSa8geDPtjJleWE5QJCSvAtn8ZLYx-i9dPp-ZYh2ErWwn_8ZJJLBTgX0A4dIinOwytbBMbhp21E_ZONRe6W5LM7x3FPhGSjQz_QYur6YwfEQ0GDEfJVgrmEP1PaFecdzzW7m_hVd_zFVlOr0O9bWZ8JJaZCDL2I84FcJ6pAtRqoh6F_7sGUbByElAowrlC2NrEh2649kb0HSODJkTaAOZGSp5MtoVZaUx3JZkGC1R95o",
    cta: "Claim Intro Pass",
    href: "/discover/spa/verdant-oasis",
  },
  {
    name: "Azure Dental Arts",
    description: "Painless care & aesthetic dentistry",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnQxKmzIMZmSMDTCOwtK2jBwej8wYTR8NrEWPGjEX0LWweGvCxDSPA-Blx-7d328mQsomvQohQjvTuwkeGTYFq3DKb16qYrYjJZsl4nOxQQ6QEpi-NeCfDoujz9hj2EfS75g6USdkMKF6mo_YSAXdQFYxbSna3sJAltcqFtN90pZnPqMUu3Mc0Pt-WKeWzvC8qr5t-z3c4wa85NdJP7mTQgIH6H3t05Zr6mcHyAprnSPITTZaVWR206kb8WoVDiu--nDeAmzN2d--B",
    cta: "Book Checkup",
    href: "/discover/dentist/azure-dental",
  },
];

const proof: ProofItem[] = [
  {
    timeAgo: "2 mins ago",
    copy: "Sarah M. booked a Signature Massage at Lumina Wellness.",
    icon: <Clock3 className={`text-emerald-700`} size={16} />,
    accent: "bg-emerald-50",
  },
  {
    timeAgo: "15 mins ago",
    copy: "David R. completed a Full Service at Precision Garage.",
    icon: <CheckCircle2 className={`text-emerald-700`} size={16} />,
    accent: "bg-emerald-50",
  },
  {
    timeAgo: "1 hour ago",
    copy: "James L. left a 5-star review for The Nordic Cut.",
    icon: <BadgeCheck className={`text-emerald-700`} size={16} />,
    accent: "bg-emerald-50",
  },
];

const Home = (): JSX.Element => {
  return (
    <main className={`w-full grow bg-[#d5fff9] text-[#003531]`}>
      <div className={`w-full max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 py-12 flex flex-col gap-16`}>
        <HomeHero />

        <section className={`flex flex-col gap-6`}>
          <div className={`flex items-center justify-between`}>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>Refined Categories</h2>
            <Link href="/discover" className={`flex items-center gap-2 text-[#0b6b5d] font-semibold hover:gap-3 transition`}> 
              View all
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}> 
            {categories.map((item) => (
              <CategoryCard key={item.title} category={item} />
            ))}
          </div>
        </section>

        <section className={`flex flex-col gap-4`}>
          <div>
            <h3 className={`text-3xl sm:text-4xl font-semibold`}>The Selection</h3>
            <p className={`text-[#1e5a52]`}>Verified excellence from our most trusted partners.</p>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6`}> 
            {featured.map((biz) => (
              <FeaturedCard key={biz.name} business={biz} />
            ))}
          </div>
        </section>

        <section className={`bg-[#c9f0e8] rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row gap-10 items-center`}> 
          <div className={`flex-1 flex flex-col gap-4`}>
            <h4 className={`text-3xl sm:text-4xl font-semibold leading-tight`}>Join a community of informed locals.</h4>
            <p className={`text-[#1e5a52]`}>
              Thousands of successful bookings managed this week. Trust the collective wisdom of your neighbors.
            </p>
            <div className={`flex items-center gap-4`}>
              <div className={`flex -space-x-3`}>
                <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO20SuLPV1muVEk1VUK_B03O5uSXAH8uXM3lZSaK-omU_zURXJOzmnjSPfYmcEsx7p1x2ZjElzRZC_aGF1mkNFk5UqEOYZbQhfltgbUtwdaBmbdMMOvo7M78l0LZ5dW_8wYBgPF_i-2wY3zoxCFnXmM2I5H1vOvz-2otgJyfQqEh3DEcSWPrbc4LXV23mW-qudaTXCSz-7g0oYYc7qZOLyyV2JaUYB4G7oSyTh41MvGTeHm_rH00bpDk9SilS4CZiUnHsxKOwXrC1t" />
                <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2UqD48iWMW32tvUnkX9pPCkPOS9w9jW07lS7BeLKs_5qAoLHY-qWIVoh1tZGYUyWOSLhpvxkI63GaTAyzWyTb2NhX9_HwuwDaRoJyKVUYwsx1UWqP3XzUvrAEyCeTOCqV4FDYdR_X52s3gPCvkg8-fp1cq1cFAGLYB0LnH9HJk_b3M7ymCq39mYanFuRo-2B0oZT8flPJl1NcbIqhm1oYE9t0RLgf94DgLp8rlBl9MUKizVBgtg_FEmunn30SX_XqZZctKO9jJN6" />
                <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsjj34w0peDAb28fQhBDWj_6-wE-nmXkxBsBTyA-WeiY9HE-Vi0hZqxgTzzc3VdbLKuIqAweY3p0JkvoNIYts77QfuzLZw2Z0emh_FamlrrmqoOSD8mEUdSHgBpqdlhtZ6N5ZCAvx0I8vdB39jy1e8Ho5-94c4xAfD6o5_0wtL_xT3ZC5Myy52DOH_9z0UBnQ1mMMyXr5r6aW72qg3CKcotT5kJnBoditmF5viI0gxBMCv1E7mC2YJddnepbS9E7DzIwyU7WsrhJt6" />
              </div>
              <div className={`text-sm font-semibold text-[#0f372f]`}>
                12k+ Active Users this month
              </div>
            </div>
          </div>
          <div className={`flex-1 w-full flex flex-col gap-4`}>
            {proof.map((item, idx) => (
              <ProofCard key={`${item.timeAgo}-${idx}`} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps): JSX.Element => {
  const { title, locations, icon, tone, slug } = category;
  return (
    <Link
      href={`/discover/${slug}`}
      className={`group relative rounded-2xl px-4 py-5 sm:px-5 sm:py-6 bg-white/80 transition shadow-sm border border-white/60 block overflow-hidden hover:-translate-y-1 hover:shadow-lg`}
    >
      <span className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition`} />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tone}`}>
        {icon}
      </div>
      <div className={`font-semibold text-lg`}>{title}</div>
      <div className={`text-sm text-[#1e5a52] group-hover:text-[#0b6b5d] transition`}>{locations} locations</div>
    </Link>
  );
};

interface FeaturedCardProps {
  business: FeaturedBusiness;
}

const FeaturedCard = ({ business }: FeaturedCardProps): JSX.Element => {
  const { name, description, rating, image, cta, href } = business;
  return (
    <div className={`bg-white/90 rounded-3xl shadow-sm border border-white/60 overflow-hidden flex flex-col`}> 
      <div className={`relative aspect-square overflow-hidden`}>
        <Image src={image} alt={name} fill className={`object-cover hover:scale-105 transition`} sizes="(max-width: 768px) 100vw, 25vw" />
        <div className={`absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 shadow-sm`}>
          <Star className={`text-[#f59e0b] fill-[#f59e0b]`} size={14} />
          {rating.toFixed(1)}
        </div>
      </div>
      <div className={`p-4 flex flex-col gap-2 flex-1`}>
        <div className={`font-semibold text-lg`}>{name}</div>
        <div className={`text-sm text-[#1e5a52]`}>{description}</div>
        <Link href={href} className={`mt-auto w-full rounded-full border border-[#0b6b5d] text-[#0b6b5d] font-semibold py-3 hover:bg-[#0b6b5d] hover:text-white transition inline-flex items-center justify-center`}>{cta}</Link>
      </div>
    </div>
  );
};

interface ProofCardProps {
  item: ProofItem;
}

const ProofCard = ({ item }: ProofCardProps): JSX.Element => {
  const { timeAgo, copy, icon, accent } = item;
  return (
    <div className={`flex items-center gap-4 rounded-2xl ${accent} p-4 shadow-sm border border-white/60`}> 
      <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}>{icon}</div>
      <div className={`flex flex-col gap-1`}> 
        <span className={`text-xs text-[#1e5a52]`}>{timeAgo}</span>
        <span className={`text-sm font-medium text-[#0f372f]`}>{copy}</span>
      </div>
    </div>
  );
};

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps): JSX.Element => {
  return (
    <div className={`w-11 h-11 rounded-full overflow-hidden border-4 border-[#c9f0e8]`}> 
      <Image
        src={src}
        alt="User avatar"
        width={44}
        height={44}
        className={`w-full h-full object-cover`}
      />
    </div>
  );
};

export default Home;
