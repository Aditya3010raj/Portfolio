import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 py-3 bg-primary shadow-md">
      <div className="container flex items-center justify-between mx-auto px-4">
        <div>
          <Link href="/">
            <img src="/assets/img/logo.svg" className="w-24 lg:w-48" alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center">
            <li className="group pl-6">
              <Link href="/#about" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                About
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#services" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Services
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#portfolio" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Portfolio
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#clients" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Clients
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#work" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Work
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#statistics" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Statistics
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/blog" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Blog
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
            <li className="group pl-6">
              <Link href="/#contact" className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Contact
              </Link>
              <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
            </li>
          </ul>
        </div>

        
        <div className="block lg:hidden">
          <button>
            <i className="bx bx-menu text-4xl text-white"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}