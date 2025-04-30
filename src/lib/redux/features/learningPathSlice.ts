import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { LearningPath, LearningPathStep } from "@/types/learning-path"
import { learningPathsApi } from "../api/learningPathsApi"

interface LearningPathsState {
  activeLearningPath: LearningPath | null
  activeStep: LearningPathStep | null
  filteredPaths: LearningPath[]
  searchTerm: string
  filterCategory: string | null
  filterDifficulty: string | null
}

const initialState: LearningPathsState = {
  activeLearningPath: null,
  activeStep: null,
  filteredPaths: [],
  searchTerm: "",
  filterCategory: null,
  filterDifficulty: null,
}

const learningPathsSlice = createSlice({
  name: "learningPaths",
  initialState,
  reducers: {
    setActiveLearningPath: (state, action: PayloadAction<LearningPath | null>) => {
      state.activeLearningPath = action.payload
    },
    setActiveStep: (state, action: PayloadAction<LearningPathStep | null>) => {
      state.activeStep = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<string | null>) => {
      state.filterCategory = action.payload
    },
    setFilterDifficulty: (state, action: PayloadAction<string | null>) => {
      state.filterDifficulty = action.payload
    },
    setFilteredPaths: (state, action: PayloadAction<LearningPath[]>) => {
      state.filteredPaths = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ""
      state.filterCategory = null
      state.filterDifficulty = null
    },
  },
  extraReducers: (builder) => {
    // When a learning path is fetched by ID, set it as active
    builder.addMatcher(learningPathsApi.endpoints.getLearningPathById.matchFulfilled, (state, { payload }) => {
      state.activeLearningPath = payload
    })

    // When steps are fetched and there's an active learning path, set the first step as active if none is selected
    builder.addMatcher(learningPathsApi.endpoints.getLearningPathSteps.matchFulfilled, (state, { payload }) => {
      if (payload.length > 0 && !state.activeStep) {
        // Sort steps by order and set the first one as active
        const sortedSteps = [...payload].sort((a, b) => a.order - b.order)
        state.activeStep = sortedSteps[0]
      }
    })
  },
})

export const {
  setActiveLearningPath,
  setActiveStep,
  setSearchTerm,
  setFilterCategory,
  setFilterDifficulty,
  setFilteredPaths,
  clearFilters,
} = learningPathsSlice.actions

export default learningPathsSlice.reducer
