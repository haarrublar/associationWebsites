import { useState } from "react";
import { LoremIpsum } from 'react-lorem-ipsum';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Association</span>
                <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
                <span className="sr-only">Open main menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <a href="#" className="text-sm/6 font-semibold text-gray-900">Inicio</a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">Historias</a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">Herramientas</a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">Eventos</a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">Nosotros</a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm/6 font-semibold text-gray-900"></a>
            </div>
          </nav>

          {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
          <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}  role="dialog" aria-modal="true">
            {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                </a>
                <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
                  <span className="sr-only">Close menu</span>
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Inicio</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Historias</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Herramientas</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Eventos</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Nosotros</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="relative isolate px-6 pt-6 lg:px-8 bg-gradient-to-r from-teal-200/40 to-teal-500/5">
          <div className="pt-24 pb-12 sm:pt-48 lg:pt-36">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Association Name</h1>
              <div className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                <LoremIpsum avgSentencesPerParagraph={2} />
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Get started</a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="hidden sm:mb-8 sm:flex sm:justify-center pt-12">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                News! <a href="#" className="font-semibold text-violet-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
