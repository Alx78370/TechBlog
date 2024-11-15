import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker/locale/fr'
import { format } from 'path'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    'Please provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env file',
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const POST_NB = 60

async function cleanTables() {
  try {
    console.log('Nettoyage des tables...')
    const { error: postsDeleteError } = await supabase
      .from('posts')
      .delete()
      .not('id', 'is', null)

    if (postsDeleteError)
      throw new Error(`Erreur suppression posts: ${postsDeleteError.message}`)

    console.log('✓ Tables nettoyées')
  } catch (error) {
    console.error('Erreur pendant le nettoyage:', error)
    throw error
  }
}

function generatePostTitle() {
  const adjectives = [
    'Ultimate',
    'Essential',
    'Practical',
    'Creative',
    'Innovative',
  ]
  const topics = ['Guide', 'Insights', 'Secrets', 'Exploration', 'Journey']
  const themes = [
    'Cinema',
    'Technology',
    'Art',
    'Culture',
    'Lifestyle',
    'Science',
    'History',
  ]

  return `${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(themes)} ${faker.helpers.arrayElement(topics)}`
}

async function seed() {
  await cleanTables()

  const posts = Array.from({ length: POST_NB }, () => {
    const rawContent = faker.lorem.paragraphs(20, '\n')
    const content = rawContent.replace(/\n/g, '<br><br>')
    return {
      title: generatePostTitle(),
      content,
      image: faker.image.urlPicsumPhotos({
        width: 1792,
        height: 1024,
        grayscale: false,
        blur: 0,
      }),
      created_at: faker.date
        .between({
          from: '2023-01-01T00:00:00.000Z',
          to: new Date(),
        })
        .toISOString(),
    }
  })

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .insert(posts)
    .select()

  if (postsError) {
    console.error("Erreur pendant l'insertion des posts:", postsError)
    return
  }

  console.log(posts)
}

seed()
