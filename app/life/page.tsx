import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DM_Serif_Display, Newsreader } from "next/font/google"
import { FadeIn, Photo, PhotoPair } from "@/components/life-photo"

const display = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] })
const body = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] })

function U({ children }: { children: React.ReactNode }) {
  return <span className="life-u">{children}</span>
}
function Win({ children }: { children: React.ReactNode }) {
  return <strong className="life-win">{children}</strong>
}
function Chapter({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <FadeIn className="life-chapter">
      <p className="life-eyebrow">{eyebrow}</p>
      <h2 className={display.className}>{title}</h2>
      {children}
    </FadeIn>
  )
}
function Quote({ children }: { children: React.ReactNode }) {
  return <blockquote className={`life-quote ${display.className}`}>{children}</blockquote>
}

export default function LifePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 pointer-events-none">
          <div className="max-w-3xl mx-auto h-full border-x-[1.5px] border-dashed border-foreground/25" />
        </div>

        <main className="flex-1 w-full min-w-0 max-w-3xl mx-auto relative px-4 sm:px-8 pt-8 sm:pt-14 pb-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-14 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <article className={`life-essay ${body.className}`}>
            <FadeIn>
              <header className="life-header">
                <h1 className={display.className}>Life</h1>
                <p className="life-sub">Notes from the road so far — from a Class 10 result sheet to the things I build today.</p>
              </header>
            </FadeIn>

            <Chapter eyebrow="Prologue · Class 10" title="Where it starts">
              <p>
                I like to begin this story in Class 10. I scored <Win>96.4% in my CBSE boards</Win>, and for the first time it felt
                like I had a real say in what came next.
              </p>
              <Photo src="/life/class-10.jpg" caption="Photo: Class 10 results day" size="float" aspect="3 / 4" />
              <p>
                I picked science — <U>PCM with Computer Science</U>. The reason was simple: I wanted to become an engineer, just like my
                mama and mausi. They were the engineers I grew up looking up to.
              </p>
            </Chapter>

            <Chapter eyebrow="Classes 11 & 12" title="Choosing my own path">
              <p>
                My family has a business in gold and medicine. The easy road would have been to step into it. But my father wanted
                something different for me — he wanted me to <U>study and become something on my own</U>.
              </p>
              <Quote>“Study, and become something on your own.”</Quote>
              <p>
                So I prepared for JEE alongside my 12th boards. I <Win>qualified JEE Main</Win> and scored <Win>91.6% in boards</Win>.
                I sat for entrance exams at many universities, and finally got selected for Computer Science at{" "}
                <U>Manipal University Jaipur</U>.
              </p>
            </Chapter>

            <Chapter eyebrow="2024 · Jaipur" title="Manipal, and a beautiful city">
              <Photo src="/life/muj-campus.jpg" caption="First day at college" size="wide" aspect="4 / 3" />
              <p>
                Jaipur is a beautiful city, and it became home. I started engineering with a MacBook and a very basic knowledge of
                HTML, CSS and Python. That was the whole toolkit.
              </p>
            </Chapter>

            <Chapter eyebrow="First year" title="Figuring out hackathons">
              <p>
                Around me, hackathons were happening everywhere. I remember literally searching YouTube for{" "}
                <U>“what is a hackathon, and what do you do in it?”</U> — and still being confused. How do you build a whole project
                on a problem statement in so little time?
              </p>
              <p>
                So I started exploring. I joined <U>Google Cloud AI Study Jams</U>, sat in on tech summits, went to{" "}
                <U>Google DevFest</U>. Slowly, things started making sense. I created my GitHub account and figured out how it all
                works.
              </p>
              <Photo src="/life/devfest.jpg" caption="Photo: Google DevFest" size="float" aspect="4 / 5" />
              <p>
                Then I joined the <U>AI² lab</U>, where a senior gave me direction — learn ML, then deep learning, then GenAI. That
                guidance mattered more than any course. In first year itself, I got an <Win>R&amp;D ML internship at Elumina AI</Win>.
              </p>
            </Chapter>

            <Chapter eyebrow="First year" title="First builds & first wins">
              <p>
                My first college project was <U>Unipool</U>, a cab-sharing platform for our university. My classmates loved it. It
                was also the first time I used Bolt, the AI website builder everyone was talking about in 2024.
              </p>
              <p>
                Then the competitions started. A consultathon — <Win>1st runner-up</Win>. BrandIt — <Win>1st runner-up</Win> again.
                Then came UniWay, where the challenge was to build a navigation platform for the university. And there, I{" "}
                <Win>found my way to 1st place</Win> — through UniWay.
              </p>
              <Quote>I found my way to first place — through UniWay.</Quote>
              <PhotoPair>
                <Photo src="/life/uniway-win.webp" caption="UniWay hackathon" aspect="10 / 7" />
                <Photo src="/life/nike-shoes.jpg" caption="Photo: the shoes" aspect="10 / 7" />
              </PhotoPair>
              <p>
                The cash prizes were small, but they motivated me so much. I also won several <U>Solana bounties</U>, and with my own
                money I bought a very expensive pair of Nike shoes for the first time. It felt like a big achievement — because it
                was mine.
              </p>
            </Chapter>

            <Chapter eyebrow="Second year" title="Going international">
              <p>
                In second year I got the opportunity to work with <U>Southern Federal University, Russia</U>, as part of an{" "}
                <Win>International Interdisciplinary Student Project</Win>.
              </p>
              <Photo src="/life/iit-madras.webp" caption="IIT Madras, National Road Safety Hackathon finals" size="wide" aspect="3 / 2" />
              <p>
                The university recognised me with <Win>awards for student excellence</Win> and a place on the{" "}
                <Win>Dean&apos;s List</Win> for academic performance. And I went to <U>IIT Madras</U> as a{" "}
                <Win>finalist in the National Road Safety Hackathon</Win>.
              </p>
            </Chapter>

            <Chapter eyebrow="End of second year" title="Sylus & leadership">
              <p>
                In second year I started applying for remote internships. I gave so many interviews. And finally, at the end of
                second year, I cracked the role of <Win>Full Stack Developer at Sylus AI</Win>.
              </p>
              <Photo src="/life/sylus.jpg" caption="Photo: building at Sylus AI" size="float" aspect="4 / 3" />
              <p>
                There I worked on an AI platform from scratch, and was promoted to <Win>team lead and AI engineer</Win>. I was also
                shortlisted for the <U>CPP program at HPE</U>, where we&apos;re doing a research project on drive failure.
              </p>
              <p>
                This winter, I&apos;ll be rejoining Sylus AI as <Win>AI Product Lead</Win>.
              </p>
            </Chapter>

            <Chapter eyebrow="Now" title="What I'm building, and what's next">
              <p>
                Alongside all of this, I build my own products.{" "}
                <a className="life-link" href="https://lattice.aryy.in" target="_blank" rel="noopener noreferrer">Lattice</a> makes
                text sound natural, and has reached <Win>400+ users across 52 countries</Win>.{" "}
                <a className="life-link" href="https://petal.aryy.in" target="_blank" rel="noopener noreferrer">Petal</a> is the
                newest one.
              </p>
              <PhotoPair>
                <Photo src="/life/lattice.webp" caption="Lattice" aspect="16 / 10" />
                <Photo src="/life/petal.webp" caption="Petal" aspect="16 / 10" />
              </PhotoPair>
              <p>
                From a Class 10 result sheet to shipping things people use — the story is still being written. More soon.
              </p>
            </Chapter>
          </article>
        </main>
      </div>
    </div>
  )
}
