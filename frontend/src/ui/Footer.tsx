import Image from "next/image";
import { Facebook, Mail, Telescope } from "lucide-react";
import { FaFacebook, FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { LiaLinkedin, LiaLinkedinIn } from "react-icons/lia";
import { BsTwitterX, BsYoutube } from "react-icons/bs";

const footerLinks = [
  {
    title: "Home",
    links: [
      { name: "Hero Section", link: "#" },
      { name: "Features", link: "#" },
      { name: "Properties", link: "#" },
      { name: "Testimonials", link: "#" },
      { name: "FAQ’s", link: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Our Story", link: "#" },
      { name: "Our Works", link: "#" },
      { name: "How It Works", link: "#" },
      { name: "Our Team", link: "#" },
      { name: "Our Clients", link: "#" },
    ],
  },
  {
    title: "Properties",
    links: [
      { name: "Portfolio", link: "#" },
      { name: "Categories", link: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Valuation Mastery", link: "#" },
      { name: "Strategic Marketing", link: "#" },
      { name: "Negotiation Wizardry", link: "#" },
      { name: "Closing Success", link: "#" },
      { name: "Property Management", link: "#" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "Contact Form", link: "#" },
      { name: "Our Offices", link: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="min-h-fit w-full bg-gray-08 text-gray-300">
      <div className="flex items-start gap-5 justify-around py-12 px-10">
        {/* Logo + Email input */}
        <div className="md:col-span-1 space-y-6">
          <Image
            src="/assets/Logo-lg.png"
            alt="Logo"
            width={120}
            height={120}
            priority
          />

          {/* Email input */}
          <div className="flex items-center bg-gray-80 border border-gray-15 rounded-lg px-3 py-3 w-full">
            <Mail className="text-gray-30 w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-transparent flex-1 outline-none text-sm text-gray-60 placeholder-gray-30"
            />
            <button className="ml-2 text-white hover:text-purple-400">
              <FaTelegramPlane size={18} />
            </button>
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex gap-20 flex-wrap">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-gray-60 font-semibold mb-4 text-nowrap">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.link}
                      className="hover:text-purple-400 transition-colors duration-200 text-nowrap "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-10 flex gap-5 items-center justify-around w-full p-6">
        <div className="flex gap-5">
          <p>@2023 Estatein. All Rights Reserved.</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex gap-5">
          <Link
            href=""
            className="p-2 bg-gray-08 rounded-full hover:text-blue-600"
          >
            <FaFacebookF className="text-inherit" />
          </Link>
          <Link
            href=""
            className="p-2 bg-gray-08 rounded-full hover:text-blue-300"
          >
            <LiaLinkedinIn />
          </Link>
          <Link
            href=""
            className="p-2 bg-gray-08 rounded-full hover:text-white"
          >
            <BsTwitterX />
          </Link>
          <Link
            href=""
            className="p-2 bg-gray-08 rounded-full hover:text-red-600"
          >
            <BsYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
}
