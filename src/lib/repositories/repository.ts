import type { IRepository } from './interfaces'
import { localRepository } from './local-repository'

// For now, always use local storage. When Supabase credentials are configured,
// switch to supabaseRepository based on environment variables.
let activeRepository: IRepository = localRepository

export function getRepository(): IRepository {
  return activeRepository
}

export function setRepository(repo: IRepository) {
  activeRepository = repo
}

// Re-export the repository interface type
export type { IRepository } from './interfaces'
