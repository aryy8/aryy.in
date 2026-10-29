import { LifeAsciiBanner } from "@/components/life-ascii-banner";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DM_Serif_Display, Newsreader } from "next/font/google"
import { FadeIn, Photo, PhotoSlides } from "@/components/life-photo"

const display = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] })
const body = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] })

function U({ children }: { children: React.ReactNode }) {
  return <span className="life-u">{children}</span>
}
function Win({ children }: { children: React.ReactNode }) {
  return <strong className="life-win">{children}</strong>
}

export default function LifePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 pointer-events-none">
          <div className="max-w-3xl mx-auto h-full border-x-[1.5px] border-dashed border-foreground/25" />
        </div>

        <main className="flex-1 w-full min-w-0 max-w-3xl mx-auto relative px-4 sm:px-8 pt-4 sm:pt-6 pb-24">

          <FadeIn>
            <article className={`life-essay ${body.className}`}>
              <header className="life-header life-banner">
                <LifeAsciiBanner />
                <div className="life-banner-fade" />
                <div className="life-banner-text">
                  <h1 className={`${display.className} life-title-px`}><span className="life-px-text">Life</span></h1>
                </div>
              </header>

              <Photo src="/life/hero.jpg" alt="Aryan smiling with a thumbs up at a cafe" caption="" size="right" aspect="4 / 5" />
              <p>
                I like to begin this story in Class 10. I scored <Win>96.4% in my CBSE boards</Win>, and for the first time it felt
                like I had a real say in what came next. I picked science, <U>PCM with Computer Science</U>, because I wanted to
                become an engineer, just like my mama and mausi.
              </p>
              <p>
              <Photo src="/life/muj-campus.jpg" caption="First day at college" size="left" aspect="960 / 575" />
                I come from a business family in gold banking. My father
                wanted me to get a good education. He isn&apos;t with us anymore, but his dream that I <U>build something on my own</U> is
                something I still carry. Engineering was my choice, so I prepared for JEE alongside my 12th boards, <Win>qualified JEE Main</Win>, scored <Win>91.6% in boards</Win>, sat for the entrance
                exams of many universities, and finally got selected for Computer Science at <span className="life-co"><img className="life-ico" src="/life/ico-muj.png" alt="" /><U>Manipal</U></span> <U>University Jaipur</U>.
              </p>

              <p>
              <Photo src="/life/jaipur.jpg?v=3" alt="Aryan in front of Hawa Mahal, Jaipur" caption="Hawa Mahal, Jaipur" size="right" aspect="900 / 675" />
                Jaipur is a beautiful city, and it quickly became home. I started engineering with a MacBook and a very basic
                knowledge of HTML, CSS and Python. Around me, hackathons were happening everywhere, and I remember literally
                searching YouTube for <U>“what is a hackathon, and what do you do in it?”</U>, and still being confused about how
                anyone builds a whole project on a problem statement in so little time.
              </p>
              <Photo src="/life/devfest.jpg" caption="DevFest Jaipur 2024" size="right" aspect="1 / 1" />
              <p>
                So I started exploring. I sat in on tech summits and went to{" "}
                <U>Google DevFest</U>, and slowly things started making sense. I created my GitHub account and figured out how it
                all works. Then I joined the <U>AI² lab</U>, and that is where I met a senior whose part in my story was short, but{" "}
                <Win>it changed its direction</Win>. He showed me the path into machine learning, deep learning and
                generative AI, and gave me the push I needed to start. Because of him, in first year itself I got an <Win>R&amp;D ML internship at Elumina AI</Win>.
              </p>
              <p>
              <PhotoSlides srcs={["/uniway_project.webp", "/uniway_hackathon1.webp", "/uniway_hackathon2.webp", "/uniway_hackthon2.5.webp", "/uniway_hackathon3.webp"]} caption="UniWay hackathon" size="left" aspect="10 / 7" />
                My first college project was <U>Unipool</U>, a cab-sharing platform for our university that my classmates loved,
                and the first time I used Lovable &amp; Bolt, the AI website builders everyone was talking about in 2024. Then came the
                competitions: a consultathon, <Win>1st runner-up</Win>; BrandIt, <Win>1st runner-up</Win> again; and then UniWay,
                where the challenge was to build a navigation platform for the university. There, I found my way to{" "}
                <Win>first place</Win>, quite literally, through UniWay.
              </p>
              <p>
              <Photo src="/life/solana.jpg" alt="Two laptops at the Solana India Tour workshop at MUJ" caption="Solana India Tour, MUJ" size="right" aspect="4 / 3" />
                The cash prizes were small, but they motivated me more than I can explain. I also won several{" "}
                <span className="life-co"><img className="life-ico" src="/life/ico-solana.png" alt="" /><U>Solana</U></span> <U>bounties</U>, and with my own money I bought a quite expensive pair of Nike shoes for the first time. It
                felt like a big achievement, because it was mine.
              </p>
              <PhotoSlides srcs={["/photo1_iitm_roadeye.webp", "/photo2_iitm_roadeye.webp", "/photo4_iitm_roadeye.webp", "/photo3_iitm_roadeye.webp", "/photo5_iitm_roadeye.webp"]} caption="IIT Madras, Road Safety Hackathon" size="left" aspect="4 / 3" />
              <p>
                Second year opened things up. I got to work with <U>Southern Federal University, Russia</U>, as part of an{" "}
                <Win>International Interdisciplinary Student Project</Win>. The university recognised me with{" "}
                <Win>awards for student excellence</Win> and a place on the <Win>Dean&apos;s List</Win>, and I went to{" "}
                <span className="life-co"><img className="life-ico" src="/life/ico-iitm.png" alt="" /><U>IIT</U></span> <U>Madras</U> as a <Win>finalist in the National Road Safety Hackathon</Win>.
              </p>
              <p>
                Alongside all of it, I kept applying for remote internships and gave so many interviews. At the end of second year,
                I finally cracked the role of <Win>Full Stack Developer at <span className="life-co"><img className="life-ico" src="/life/ico-sylus.png?v=2" alt="" />Sylus</span> AI</Win>, where I worked on an AI platform from
                scratch and was promoted to <Win>team lead and AI engineer</Win>. In third year, I was shortlisted for the{" "}
                <U>CPP program</U> at <span className="life-co"><img className="life-ico" src="/life/ico-hpe.png" alt="" /><U>HPE</U></span>, where we&apos;re doing a research project on drive failure. I also got shortlisted for <Win><span className="life-co"><img className="life-ico" src="/life/ico-amazon.png" alt="" />Amazon</span> ML Summer School</Win>, and this winter, I&apos;ll be
                rejoining Sylus AI as <Win>AI Product Lead</Win>.
              </p>
              <div className="life-thumbs">
                <a href="https://lattice.aryy.in" target="_blank" rel="noopener noreferrer"><Photo src="/life/lattice.webp" caption="Lattice" aspect="16 / 10" /></a>
                <a href="https://petal.aryy.in" target="_blank" rel="noopener noreferrer"><Photo src="/life/petal.webp" caption="Petal" aspect="16 / 10" /></a>
              </div>
              <p>
                And I build my own products.{" "}
                <span className="life-co"><img className="life-ico" src="/life/ico-lattice.png" alt="" /><a className="life-link" href="https://lattice.aryy.in" target="_blank" rel="noopener noreferrer">Lattice</a></span> makes
                text sound natural and has reached <Win>400+ users across 52 countries</Win>;{" "}
                <span className="life-co"><img className="life-ico" src="/life/ico-petal.png" alt="" /><a className="life-link" href="https://petal.aryy.in" target="_blank" rel="noopener noreferrer">Petal</a></span> is the
                newest one. From a Class 10 result sheet to shipping things people use, the story is still being written.
              </p>
              <p className="life-end" aria-hidden="true">***</p>
            </article>
          </FadeIn>
        </main>
      </div>
    </div>
  )
}
