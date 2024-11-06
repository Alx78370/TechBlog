import  dotenv  from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker/locale/fr";
import { format } from "path";


dotenv.config();


const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Please provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const AUTHOR_COUNT = 6;
const POST_PER_AUTHOR = 10;

async function cleanTables() {
  try {
    console.log('Nettoyage des tables...')
    const { error: postsDeleteError } = await supabase
      .from('posts')
      .delete()
      .not('id', 'is', null)

    if (postsDeleteError)
      throw new Error(`Erreur suppression posts: ${postsDeleteError.message}`)

    const { error: authorsDeleteError } = await supabase
      .from('authors')
      .delete()
      .not('id', 'is', null)

    if (authorsDeleteError)
      throw new Error(
        `Erreur suppression authors: ${authorsDeleteError.message}`,
      )

    console.log('✓ Tables nettoyées')
  } catch (error) {
    console.error('Erreur pendant le nettoyage:', error)
    throw error
  }
}

function generatePostTitle() {
  const adjectives = ['Ultimate', 'Essential', 'Practical', 'Creative', 'Innovative'];
  const topics = ['Guide', 'Insights', 'Secrets', 'Exploration', 'Journey'];
  const themes = ['Cinema', 'Technology', 'Art', 'Culture', 'Lifestyle', 'Science', 'History'];

  return `${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(themes)} ${faker.helpers.arrayElement(topics)}`;
}

async function seed() {

  await cleanTables();

  const authors = Array.from ({ length: AUTHOR_COUNT}, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.urlLoremFlickr({ category: 'people', width: 500, height: 300 }),
  }));

  const { data: authorsData, error: authorsError } = await supabase
    .from("authors")
    .insert(authors)
    .select()

  if (authorsError) {
    console.error("Erreur pendant l'insertion des auteurs:", authorsError);
    return;
  }

  const posts = authorsData.flatMap(author =>
    Array.from({ length: POST_PER_AUTHOR }, () => ({
      title: generatePostTitle(),
      content: faker.lorem.paragraphs({ min: 5, max: 10 }),
      image: faker.image.urlPicsumPhotos({width: 1600, height:700, grayscale: false, blur: 0 }),
      author_id: author.id,
      created_at: faker.date
        .between({
          from: '2023-01-01T00:00:00.000Z',
          to: new Date(),
        })
        .toISOString(),
    }))
  )

  const { error: postsError } = await supabase.from('posts').insert(posts)

  if (postsError) {
    console.error("Erreur pendant l'insertion des posts:", postsError);
    return;
  }

  console.log(authors, posts);

};

seed();
