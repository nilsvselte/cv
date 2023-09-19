"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    console.log(pathname)
    return (
<div className="tw-flex tw-justify-center tw-items-center">
    <Link href="/about" className={`tw-transition tw-ease-in-out tw-mt-6 tw-cursor-default ${pathname === "/about" ? "tw-text-white ":"tw-text-slate-300  hover:tw-text-white"} `}>About</Link>
    <p className="tw-mx-2 tw-mt-6 tw-leading-none tw-text-slate-300 tw-cursor-default">•</p>
    <Link href="/contact" className={`tw-transition tw-ease-in-out tw-mt-6 tw-cursor-default ${pathname === "/contact" ? "tw-text-white ":"tw-text-slate-300  hover:tw-text-white"} `}>Contact</Link>
</div>

    )
}
export default Navbar