"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import {
  setActiveLearningPath,
  setActiveStep,
  setSearchTerm,
  setFilterCategory,
  setFilterDifficulty,
  setFilteredPaths,
  clearFilters,
} from "@/redux/features/learningPathsSlice"
import type { LearningPath, LearningPathStep } from "@/types/learning-path"
import { useCallback } from "react"

export function useLearningPaths() {
  const dispatch = useDispatch()
  const { activeLearningPath, activeStep, filteredPaths, searchTerm, filterCategory, filterDifficulty } = useSelector(
    (state: RootState) => state.learningPaths,
  )

  const selectLearningPath = useCallback(
    (path: LearningPath | null) => {
      dispatch(setActiveLearningPath(path))
      // Reset active step when changing learning path
      dispatch(setActiveStep(null))
    },
    [dispatch],
  )

  const selectStep = useCallback(
    (step: LearningPathStep | null) => {
      dispatch(setActiveStep(step))
    },
    [dispatch],
  )

  const updateSearchTerm = useCallback(
    (term: string) => {
      dispatch(setSearchTerm(term))
    },
    [dispatch],
  )

  const updateFilterCategory = useCallback(
    (category: string | null) => {
      dispatch(setFilterCategory(category))
    },
    [dispatch],
  )

  const updateFilterDifficulty = useCallback(
    (difficulty: string | null) => {
      dispatch(setFilterDifficulty(difficulty))
    },
    [dispatch],
  )

  const updateFilteredPaths = useCallback(
    (paths: LearningPath[]) => {
      dispatch(setFilteredPaths(paths))
    },
    [dispatch],
  )

  const resetFilters = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  return {
    activeLearningPath,
    activeStep,
    filteredPaths,
    searchTerm,
    filterCategory,
    filterDifficulty,
    selectLearningPath,
    selectStep,
    updateSearchTerm,
    updateFilterCategory,
    updateFilterDifficulty,
    updateFilteredPaths,
    resetFilters,
  }
}
