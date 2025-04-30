// Learning Path Types
export interface LearningPath {
    id: string
    title: string
    description: string
    is_public: boolean
    created_at: string
    updated_at: string
    creator_id: string
    category?: string
    tags?: string[]
    estimated_hours?: number
    difficulty_level?: string
  }
  
  export interface LearningPathCreate {
    title: string
    description: string
    is_public: boolean
    category?: string
    tags?: string[]
    estimated_hours?: number
    difficulty_level?: string
  }
  
  export interface LearningPathUpdate {
    title?: string
    description?: string
    is_public?: boolean
    category?: string
    tags?: string[]
    estimated_hours?: number
    difficulty_level?: string
  }
  
  // Learning Path Step Types
  export interface LearningPathStep {
    id: string
    path_id: string
    title: string
    description: string
    order: number
    created_at: string
    updated_at: string
    content_items?: ContentItem[]
  }
  
  export interface LearningPathStepCreate {
    title: string
    description: string
    order: number
  }
  
  // Content Item Types
  export interface ContentItem {
    id: string
    step_id: string
    title: string
    content_type: string
    content_url: string
    description?: string
    created_at: string
    updated_at: string
  }
  
  export interface ContentItemCreate {
    step_id: string
    title: string
    content_type: string
    content_url: string
    description?: string
  }
  
  // User Progress Types
  export interface UserProgress {
    id: string
    user_id: string
    step_id: string
    path_id: string
    status: string
    completed_at?: string
    created_at: string
    updated_at: string
  }
  
  export interface UserProgressCreate {
    step_id: string
    path_id: string
    status: string
    completed_at?: string
  }
  