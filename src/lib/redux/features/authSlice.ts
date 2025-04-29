import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../api/authApi"

interface User {
  id: string
  email: string
  username: string
  full_name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      }
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.access_token // Changed from payload.token to payload.access_token
      state.user = payload.user
      state.isAuthenticated = true

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload.access_token) // Changed from payload.token to payload.access_token
        localStorage.setItem("user", JSON.stringify(payload.user))
      }
    })
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.token = payload.access_token // Changed from payload.token to payload.access_token
      state.user = payload.user
      state.isAuthenticated = true

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload.access_token) // Changed from payload.token to payload.access_token
        localStorage.setItem("user", JSON.stringify(payload.user))
      }
    })
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
