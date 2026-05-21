"use client"

import Image from "next/image"
import Link from "next/link"
import image from "../public/hero-img-2.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="px-4 md:px-12 py-6 md:py-8 border-t border-gray-200 bg-white text-black mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image 
                        src={image} 
                        alt="Logo" 
                        width={50} 
                        height={50}
                        className="object-contain"
                    />
                    <span className="text-xl font-semibold">Dialo</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-8 text-md">
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        About
                    </Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        Contact
                    </Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        Terms of Service
                    </Link>
                </div>

                {/* Social Media Links */}
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        <span><FontAwesomeIcon icon={faInstagram} size="lg" /></span>
                    </Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        <span><FontAwesomeIcon icon={faFacebook} size="lg" /></span>
                    </Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">
                        <span><FontAwesomeIcon icon={faTwitter} size="lg" /></span>
                    </Link>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Nitin Lobhiyal. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
