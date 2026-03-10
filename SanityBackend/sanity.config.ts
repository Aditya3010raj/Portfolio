import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: '6qirslwu',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(), 
    simplerColorInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
