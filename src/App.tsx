import { Demo } from "./components/Demo"
import { Footer } from "./components/Footer"
import { BottomGradient, TopGradient } from "./components/Gradients"
import { Navigation } from "./components/Navigation"
import { Tavoite } from "./components/Tavoite"
import { Team } from "./components/Team"

export default function Example() {
  return (
    <div className="isolate bg-white">
      <Navigation />
      <TopGradient />
      <main>
        <div className="relative px-6 lg:px-8" id="etusivu">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Suomalaista tekoälyä Suomalaisille
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#demo"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Testaa demoa
                </a>
                <a href="#tavoite" className="text-sm font-semibold leading-6 text-gray-900">
                  Lue lisää <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <BottomGradient />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-40" id="demo">
          <div className="mx-auto max-w-3xl">
            <Demo />
          </div>
        </div>
        <Tavoite />
        <Team />
      </main>
      <Footer />
    </div>
  )
}
