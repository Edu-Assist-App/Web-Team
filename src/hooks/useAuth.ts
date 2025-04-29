"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function useAuth(requireAuth = true) {
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }

    // If user is authenticated but on auth pages
    if (isAuthenticated && (pathname === "/auth/login" || pathname === "/auth/register")) {
      router.push("/")
    }
  }, [isAuthenticated, pathname, requireAuth, router])

  return { isAuthenticated, user, token }
}
