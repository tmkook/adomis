/*
|--------------------------------------------------------------------------
| Package entrypoint
|--------------------------------------------------------------------------
|
| Export values from the package entrypoint as you see fit.
|
*/

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Path to the root directory where the stubs are stored. We use
 * this path within commands and the configure hook
 */
export const kmolaRoot = dirname(fileURLToPath(import.meta.url))

/**
 * Export package
 */
export { configure } from './src/configure.js'
export { queryBuilder, whereType } from './src/query_builder.js'