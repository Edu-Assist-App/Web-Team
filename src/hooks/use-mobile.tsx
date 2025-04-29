"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)

      // Clean up
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfTablet = () => {
        // Consider devices with width between 768px and 1024px as tablets
        setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      }

      // Initial check
      checkIfTablet()

      // Add event listener for window resize
      window.addEventListener("resize", checkIfTablet)

      // Clean up
      return () => window.removeEventListener("resize", checkIfTablet)
    }
  }, [])

  return isTablet
}

export function useIsMobileOrTablet() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return isMobile || isTablet
}
